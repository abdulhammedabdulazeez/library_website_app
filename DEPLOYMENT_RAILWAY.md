# Railway Deployment Guide

This repository includes everything needed to build and run `library_website_app` on Railway. The Docker image that ships from the `Dockerfile` does the following:

1. Builds the Vite frontend (`library/`) and copies the generated bundle into the Frappe app.
2. Spins up a clean Frappe bench (v15) inside the container.
3. Installs `library_website_app` and prepares bench assets at image build time.

At runtime the entrypoint script provisions the site (using your Railway-provided MariaDB and Redis services) and starts the appropriate Frappe process.

---

## 1. Prepare the repository

1. Commit the following files:
   - `Dockerfile`
   - `docker-entrypoint.sh`
   - `.dockerignore`
   - `DEPLOYMENT_RAILWAY.md` (this file)
2. Push the repo to GitHub/GitLab so Railway can reach it.

## 2. Provision Railway resources

1. **Project** – create a Railway project, choose “Deploy from GitHub repo”, and point it to this repository.
2. **Service** – Railway detects the Dockerfile automatically. No buildpacks are needed.
3. **MariaDB** – add the MariaDB plugin and note the generated environment variables (`MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`).
4. **Redis** – add a Redis plugin; copy `REDIS_URL` (or `REDIS_TLS_URL`).
5. **Volume (recommended)** – create a volume (≥1 GB) and mount it to `/home/frappe/library-bench/sites` so uploaded files and backups survive restarts.

## 3. Configure environment variables

Set these variables on the Railway service (values in parentheses show convenient defaults/fallbacks):

| Variable | Purpose |
| --- | --- |
| `SITE_NAME` | Hostname for the Frappe site (e.g. `library.example.com`). |
| `ADMIN_PASSWORD` | Initial Administrator password. |
| `DB_HOST` | MariaDB host (`MYSQLHOST`). |
| `DB_PORT` | MariaDB port (`MYSQLPORT`, defaults to 3306). |
| `DB_ROOT_USER` | MariaDB superuser (`MYSQLUSER`). |
| `DB_ROOT_PASSWORD` | MariaDB password (`MYSQLPASSWORD`). |
| `DB_NAME` | Database name for the site (`MYSQLDATABASE`). |
| `DB_PASSWORD` | Password for the site’s DB user (`MYSQLPASSWORD`). |
| `REDIS_CACHE` | Redis URL for cache (`REDIS_URL`). |
| `REDIS_QUEUE` | Redis URL for workers (`REDIS_URL`). |
| `REDIS_SOCKETIO` | Redis URL for realtime (`REDIS_URL`). |
| `FRAPPE_BENCH_IMAGE` *(optional)* | Docker tag for the base bench image (defaults to `v5.19.0`). |

> Tip: you can omit `DB_*` and `REDIS_*` if you accept the defaults that reuse Railway’s own variables.

Railway injects `PORT` automatically; do not override it.

If you need a specific upstream bench release, set `FRAPPE_BENCH_IMAGE` to one of the tags listed on Docker Hub (e.g. `v5.19.0`, `v5.20.1`). The `FRAPPE_BRANCH` build arg remains `version-15`, so Frappe itself stays on v15 even when you change the base image tag.

## 4. First deployment flow

1. Trigger a deploy. Railway builds the image, runs the frontend build, initializes bench, and pre-builds assets.
2. On first boot the entrypoint:
   - rewrites `sites/common_site_config.json` with the DB/Redis endpoints,
   - creates `/sites/<SITE_NAME>` if it does not exist,
   - installs `library_website_app`,
   - runs migrations,
   - starts `bench serve --site <SITE_NAME>`.

The initial boot takes a few minutes (site creation + migrations). Subsequent restarts skip the heavy steps.

## 5. Add worker processes (optional)

For background jobs, clone the Railway service and change the start command:

- `["worker-default"]`
- `["worker-short"]`
- `["worker-long"]`
- `["schedule"]`
- `["socketio"]`

Each worker must use the same environment variables and volume mount as the web process.

## 6. DNS & TLS

1. Add a custom domain under Railway → Networking.
2. Point your DNS (CNAME/ANAME) to the Railway hostname.
3. Wait for Railway to provision TLS automatically, then browse to your domain.

## 7. Operational tips

- Redeploys automatically run `bench migrate`.
- Use Railway’s shell to execute `bench` commands (e.g. `bench backup`, `bench clear-cache`).
- Schedule backups to an external storage target if you need longer retention than the mounted volume provides.
- Monitor logs for messages that start with `➡️` / `✅` / `ℹ️`; these come from the entrypoint to show progress.

Happy shipping! If you need a staging environment, repeat the setup in a separate Railway environment with its own DB/Redis pair.

