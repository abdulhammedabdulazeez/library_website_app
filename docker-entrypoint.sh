#!/usr/bin/env bash
set -euo pipefail

: "${BENCH_PATH:=/home/frappe/library-bench}"
if [[ -x "${BENCH_PATH}/env/bin/bench" ]]; then
  BENCH_BIN="${BENCH_PATH}/env/bin/bench"
else
  BENCH_BIN="$(command -v bench)"
fi

if [[ "$(id -u)" -eq 0 ]]; then
  cd "${BENCH_PATH}"
  mkdir -p sites
  chmod -R 777 sites || true
  exec gosu frappe "$0" "$@"
fi

cd "${BENCH_PATH}"
export PYTHONPATH="${BENCH_PATH}/apps:${PYTHONPATH:-}"

# Function to log with timestamp
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*"
}

# Function to wait for database to be ready
wait_for_db() {
  local max_attempts=30
  local attempt=1
  log "ℹ️ Waiting for database to be ready..."
  
  while [[ $attempt -le $max_attempts ]]; do
    if mariadb --host "${DB_HOST}" --port "${DB_PORT}" --user "${DB_ROOT_USER}" --password="${DB_ROOT_PASSWORD}" -e "SELECT 1" &>/dev/null; then
      log "✅ Database is ready!"
      return 0
    fi
    log "⏳ Attempt $attempt/$max_attempts: Database not ready, waiting 2 seconds..."
    sleep 2
    ((attempt++))
  done
  
  log "❌ Database failed to become ready after $max_attempts attempts"
  return 1
}

# Function to wait for Redis to be ready
wait_for_redis() {
  local max_attempts=30
  local attempt=1
  log "ℹ️ Waiting for Redis to be ready..."
  
  # Use REDIS_CACHE URL for the check
  local redis_url="${REDIS_CACHE:-${REDIS_URL:-}}"
  if [[ -z "${redis_url}" ]]; then
    log "⚠️ No Redis URL provided, skipping Redis check"
    return 0
  fi
  
  # Parse Redis URL (format: redis://[password@]host:port or redis://host:port)
  local redis_host
  local redis_port
  
  if [[ "${redis_url}" =~ redis://.*@([^:]+):([0-9]+) ]]; then
    # Format: redis://password@host:port
    redis_host="${BASH_REMATCH[1]}"
    redis_port="${BASH_REMATCH[2]}"
  elif [[ "${redis_url}" =~ redis://([^:]+):([0-9]+) ]]; then
    # Format: redis://host:port
    redis_host="${BASH_REMATCH[1]}"
    redis_port="${BASH_REMATCH[2]}"
  else
    log "⚠️ Could not parse Redis URL: ${redis_url}, skipping check"
    return 0
  fi
  
  log "ℹ️ Checking Redis at ${redis_host}:${redis_port}"
  
  while [[ $attempt -le $max_attempts ]]; do
    # Try multiple methods to check Redis connectivity
    local redis_ready=false
    
    # Method 1: Try using Python socket (most reliable)
    if python3 -c "
import socket
import sys
try:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(2)
    result = sock.connect_ex(('${redis_host}', ${redis_port}))
    sock.close()
    sys.exit(0 if result == 0 else 1)
except Exception:
    sys.exit(1)
" 2>/dev/null; then
      redis_ready=true
    # Method 2: Fallback to bash TCP check
    elif timeout 2 bash -c "echo > /dev/tcp/${redis_host}/${redis_port}" 2>/dev/null; then
      redis_ready=true
    fi
    
    if [[ "${redis_ready}" == "true" ]]; then
      log "✅ Redis is ready!"
      return 0
    fi
    
    log "⏳ Attempt $attempt/$max_attempts: Redis not ready, waiting 2 seconds..."
    sleep 2
    ((attempt++))
  done
  
  log "⚠️ Redis check failed after $max_attempts attempts, but continuing (may work during migration)"
  return 0  # Don't fail, just warn - migration might still work
}

SITE_NAME="${SITE_NAME:-${FRAPPE_SITE_NAME_HEADER:-}}"
if [[ -z "${SITE_NAME}" ]]; then
  log "❌ SITE_NAME environment variable is required." >&2
  exit 1
fi

PORT="${PORT:-8000}"

DB_HOST="${DB_HOST:-${MYSQLHOST:-}}"
DB_PORT="${DB_PORT:-${MYSQLPORT:-3306}}"
DB_ROOT_USER="${DB_ROOT_USER:-${MYSQLUSER:-root}}"
DB_ROOT_PASSWORD="${DB_ROOT_PASSWORD:-${MYSQLPASSWORD:-}}"
DB_NAME="${DB_NAME:-${MYSQLDATABASE:-$(tr '.' '_' <<<"${SITE_NAME}")}}"
DB_PASSWORD="${DB_PASSWORD:-${MYSQLPASSWORD:-}}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-admin}"

if [[ -z "${DB_HOST}" ]]; then
  log "❌ DB_HOST (or MYSQLHOST) must be provided." >&2
  exit 1
fi

if [[ -z "${DB_ROOT_PASSWORD}" ]]; then
  log "❌ DB_ROOT_PASSWORD (or MYSQLPASSWORD) must be provided with create-database privileges." >&2
  exit 1
fi

if [[ -z "${DB_PASSWORD}" ]]; then
  DB_PASSWORD="${DB_ROOT_PASSWORD}"
fi

REDIS_CACHE="${REDIS_CACHE:-${REDIS_URL:-}}"
REDIS_QUEUE="${REDIS_QUEUE:-${REDIS_URL:-}}"
REDIS_SOCKETIO="${REDIS_SOCKETIO:-${REDIS_URL:-}}"

if [[ -z "${REDIS_CACHE}" || -z "${REDIS_QUEUE}" || -z "${REDIS_SOCKETIO}" ]]; then
  log "❌ Redis URLs are required. Provide REDIS_CACHE/QUEUE/SOCKETIO or REDIS_URL." >&2
  exit 1
fi

mkdir -p sites

# Wait for database to be ready before proceeding
wait_for_db || {
  log "❌ Failed to connect to database. Exiting."
  exit 1
}

# Restore prebuilt asset bundles if the mounted volume is empty
if [[ ! -f sites/assets/bundles.json && -d /home/frappe/prebuilt-assets ]]; then
  log "ℹ️ Restoring prebuilt assets into sites/assets"
  rm -rf sites/assets
  mkdir -p sites/assets
  cp -a /home/frappe/prebuilt-assets/. sites/assets/
fi

# Ensure Vite-built assets are exposed under /assets/library_website_app without needing bench build
if [[ ! -e sites/assets/library_website_app ]]; then
  log "ℹ️ Linking app public assets into sites/assets/library_website_app"
  mkdir -p sites/assets
  ln -s ../../apps/library_website_app/public sites/assets/library_website_app || true
fi

# If assets are still missing (no manifest), do a targeted build as a fallback
if [[ ! -f sites/assets/bundles.json ]]; then
  log "ℹ️ Asset manifest missing; running a targeted build for frappe"
  "${BENCH_BIN}" build --apps frappe || true
fi

# Always ensure apps metadata lists the apps bundled in this image
cat > sites/apps.txt <<'EOF'
frappe
library_website_app
EOF

cat > sites/apps.json <<'EOF'
[
  "frappe",
  "library_website_app"
]
EOF

log "ℹ️ Using site: ${SITE_NAME}"
log "ℹ️ Database host: ${DB_HOST}:${DB_PORT}"
log "ℹ️ Redis cache: ${REDIS_CACHE}"

python - <<PY
import json
import os
from pathlib import Path

config_dir = Path("sites")
config_dir.mkdir(parents=True, exist_ok=True)
config_path = config_dir / "common_site_config.json"
config = {
    "db_host": os.environ["DB_HOST"],
    "db_port": int(os.environ["DB_PORT"]),
    "db_type": "mariadb",
    "default_site": os.environ["SITE_NAME"],
    "frappe_user": "frappe",
    "maintenance_mode": 0,
    "developer_mode": 0,
    "pause_scheduler": 0,
    "redis_cache": os.environ["REDIS_CACHE"],
    "redis_queue": os.environ["REDIS_QUEUE"],
    "redis_socketio": os.environ["REDIS_SOCKETIO"],
    "socketio_port": 9000,
    "webserver_port": int(os.environ["PORT"]),
}
config_path.write_text(json.dumps(config, indent=2))
PY

if [[ ! -d "sites/${SITE_NAME}" ]]; then
  log "➡️ Creating new site ${SITE_NAME}"
  if ! "${BENCH_BIN}" new-site "${SITE_NAME}" \
    --db-type mariadb \
    --db-host "${DB_HOST}" \
    --db-port "${DB_PORT}" \
    --db-name "${DB_NAME}" \
    --db-password "${DB_PASSWORD}" \
    --mariadb-root-username "${DB_ROOT_USER}" \
    --mariadb-root-password "${DB_ROOT_PASSWORD}" \
    --admin-password "${ADMIN_PASSWORD}" \
    --no-mariadb-socket \
    --install-app library_website_app \
    --set-default; then
    log "❌ Failed to create site ${SITE_NAME}"
    exit 1
  fi
  log "✅ Site ${SITE_NAME} created successfully"
else
  log "✅ Site ${SITE_NAME} already exists."
fi

if ! "${BENCH_BIN}" --site "${SITE_NAME}" list-apps 2>/dev/null | grep -q "^library_website_app$"; then
  log "➡️ Installing library_website_app on ${SITE_NAME}"
  if ! "${BENCH_BIN}" --site "${SITE_NAME}" install-app library_website_app; then
    log "❌ Failed to install library_website_app"
    exit 1
  fi
  log "✅ library_website_app installed successfully"
fi

# Wait for Redis before migration (helps with service check)
wait_for_redis

log "➡️ Running migrations for ${SITE_NAME}"
if ! "${BENCH_BIN}" --site "${SITE_NAME}" migrate; then
  log "❌ Failed to run migrations"
  exit 1
fi
log "✅ Migrations completed"

"${BENCH_BIN}" use "${SITE_NAME}"

COMMAND="${1:-web}"
shift || true

case "${COMMAND}" in
  web)
    log "🚀 Starting Frappe web server on port ${PORT}..."
    log "ℹ️ Server will bind to 0.0.0.0:${PORT} to accept external connections"
    # bench serve already binds to 0.0.0.0 by default
    exec "${BENCH_BIN}" --site "${SITE_NAME}" serve \
      --port "${PORT}" \
      --noreload
    ;;
  socketio)
    log "🚀 Starting Socket.IO server..."
    exec node apps/frappe/socketio.js
    ;;
  schedule)
    log "🚀 Starting scheduler..."
    exec "${BENCH_BIN}" --site "${SITE_NAME}" schedule
    ;;
  worker-short)
    log "🚀 Starting short queue worker..."
    exec "${BENCH_BIN}" --site "${SITE_NAME}" worker --queue short
    ;;
  worker-default)
    log "🚀 Starting default queue worker..."
    exec "${BENCH_BIN}" --site "${SITE_NAME}" worker --queue default
    ;;
  worker-long)
    log "🚀 Starting long queue worker..."
    exec "${BENCH_BIN}" --site "${SITE_NAME}" worker --queue long
    ;;
  *)
    log "🚀 Running custom command: ${COMMAND}"
    exec "${BENCH_BIN}" --site "${SITE_NAME}" "$COMMAND" "$@"
    ;;
esac

