
FROM nginx:1.17-alpine

ENV NGINX_HOST=localhost \
    NGINX_PORT=80

ARG VERSION
ARG BUILD_DATE
ARG GIT_REV
LABEL org.label-schema.name="adminportal" \
    org.label-schema.vendor="Noumena Digital" \
    org.label-schema.build-date="${BUILD_DATE}" \
    org.label-schema.vcs-ref="${GIT_REV}" \
    org.label-schema.version="${VERSION}"

COPY docker/default.conf /tmp
COPY docker/docker-entrypoint.sh /
COPY dist-prod /srv/www/

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
