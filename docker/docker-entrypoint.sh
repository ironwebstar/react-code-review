#!/bin/sh
envsubst '${NGINX_PORT} ${NGINX_HOST}' < /tmp/default.conf > /etc/nginx/conf.d/default.conf
exec "$@"
