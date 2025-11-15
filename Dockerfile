# syntax=docker/dockerfile:1.6

ARG FRAPPE_BRANCH=version-15
ARG FRAPPE_BENCH_IMAGE=v5.19.0

FROM node:20-bullseye-slim AS frontend-builder

WORKDIR /workspace

COPY . .

WORKDIR /workspace/library

RUN npm ci \
    && npm run build

# -----------------------------------------------------------------------------

FROM frappe/bench:${FRAPPE_BENCH_IMAGE} AS backend
ARG FRAPPE_BRANCH

ENV BENCH_PATH=/home/frappe/library-bench

USER root
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        redis-server \
        mariadb-client \
        redis-tools \
        gosu \
        curl \
        tini \
    && rm -rf /var/lib/apt/lists/*

USER frappe

RUN bench init \
      --frappe-branch ${FRAPPE_BRANCH} \
      --skip-redis-config-generation \
      --python python3 \
      library-bench

RUN cp ${BENCH_PATH}/sites/apps.txt /home/frappe/apps.txt.template \
    && cp ${BENCH_PATH}/sites/apps.json /home/frappe/apps.json.template

WORKDIR ${BENCH_PATH}

RUN rm -rf sites/site1.local \
    && rm -f sites/currentsite.txt \
    && rm -f sites/common_site_config.json

COPY --from=frontend-builder --chown=frappe:frappe /workspace/library_website_app ./apps/library_website_app

RUN bench setup requirements --python \
    && bench setup requirements --node

USER root

COPY docker-entrypoint.sh /home/frappe/docker-entrypoint.sh
RUN chmod +x /home/frappe/docker-entrypoint.sh

ENV PATH="${BENCH_PATH}/env/bin:${PATH}"

WORKDIR ${BENCH_PATH}

ENTRYPOINT ["tini", "--", "/home/frappe/docker-entrypoint.sh"]
CMD ["web"]

