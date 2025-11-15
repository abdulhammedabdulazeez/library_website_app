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

SITE_NAME="${SITE_NAME:-${FRAPPE_SITE_NAME_HEADER:-}}"
if [[ -z "${SITE_NAME}" ]]; then
  echo "❌ SITE_NAME environment variable is required." >&2
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
  echo "❌ DB_HOST (or MYSQLHOST) must be provided." >&2
  exit 1
fi

if [[ -z "${DB_ROOT_PASSWORD}" ]]; then
  echo "❌ DB_ROOT_PASSWORD (or MYSQLPASSWORD) must be provided with create-database privileges." >&2
  exit 1
fi

if [[ -z "${DB_PASSWORD}" ]]; then
  DB_PASSWORD="${DB_ROOT_PASSWORD}"
fi

REDIS_CACHE="${REDIS_CACHE:-${REDIS_URL:-}}"
REDIS_QUEUE="${REDIS_QUEUE:-${REDIS_URL:-}}"
REDIS_SOCKETIO="${REDIS_SOCKETIO:-${REDIS_URL:-}}"

if [[ -z "${REDIS_CACHE}" || -z "${REDIS_QUEUE}" || -z "${REDIS_SOCKETIO}" ]]; then
  echo "❌ Redis URLs are required. Provide REDIS_CACHE/QUEUE/SOCKETIO or REDIS_URL." >&2
  exit 1
fi

mkdir -p sites

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

echo "ℹ️ Using site: ${SITE_NAME}"
echo "ℹ️ Database host: ${DB_HOST}:${DB_PORT}"
echo "ℹ️ Redis cache: ${REDIS_CACHE}"

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
  echo "➡️ Creating new site ${SITE_NAME}"
  "${BENCH_BIN}" new-site "${SITE_NAME}" \
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
    --set-default
else
  echo "✅ Site ${SITE_NAME} already exists."
fi

if ! "${BENCH_BIN}" --site "${SITE_NAME}" list-apps | grep -q "^library_website_app$"; then
  echo "➡️ Installing library_website_app on ${SITE_NAME}"
  "${BENCH_BIN}" --site "${SITE_NAME}" install-app library_website_app
fi

echo "➡️ Running migrations for ${SITE_NAME}"
"${BENCH_BIN}" --site "${SITE_NAME}" migrate

"${BENCH_BIN}" use "${SITE_NAME}"

COMMAND="${1:-web}"
shift || true

case "${COMMAND}" in
  web)
    exec "${BENCH_BIN}" --site "${SITE_NAME}" serve \
      --port "${PORT}" \
      --noreload
    ;;
  socketio)
    exec node apps/frappe/socketio.js
    ;;
  schedule)
    exec "${BENCH_BIN}" --site "${SITE_NAME}" schedule
    ;;
  worker-short)
    exec "${BENCH_BIN}" --site "${SITE_NAME}" worker --queue short
    ;;
  worker-default)
    exec "${BENCH_BIN}" --site "${SITE_NAME}" worker --queue default
    ;;
  worker-long)
    exec "${BENCH_BIN}" --site "${SITE_NAME}" worker --queue long
    ;;
  *)
    exec "${BENCH_BIN}" --site "${SITE_NAME}" "$COMMAND" "$@"
    ;;
esac

