# httpd-centos7
FROM centos/httpd:latest

RUN yum -y update && yum clean all

LABEL maintainer="Sun Jingchuan <jason@163.com>" \
      io.k8s.description="Apache Httpd 2.4" \
      io.k8s.display-name="Apache Httpd 2.4" \
      io.openshift.expose-services="8080:http" \
      io.openshift.tags="httpd"

ENV APP_ROOT=/opt/app-root
ENV PATH=${APP_ROOT}/bin:${PATH} HOME=${APP_ROOT} HTTPD_MAIN_CONF_PATH=/etc/httpd/conf

COPY bin ${APP_ROOT}/bin
COPY .s2i/bin/run ${APP_ROOT}/bin/run

RUN chmod -R u+x ${APP_ROOT}/bin && \
    chgrp -R 0 ${APP_ROOT} && \
    chmod -R g=u ${APP_ROOT} /etc/passwd /var/www/html /run/httpd && \
    chown -R root:root /run/httpd /etc/httpd && \
    sed -i -e "s/^User apache/User default/" ${HTTPD_MAIN_CONF_PATH}/httpd.conf && \
    sed -i -e "s/^Group apache/Group root/" ${HTTPD_MAIN_CONF_PATH}/httpd.conf && \
    sed -i -e "s/^Listen 80/Listen 8080/" ${HTTPD_MAIN_CONF_PATH}/httpd.conf && \
    sed -ri " s!^(\s*CustomLog)\s+\S+!\1 |/usr/bin/cat!g; s!^(\s*ErrorLog)\s+\S+!\1 |/usr/bin/cat!g;" ${HTTPD_MAIN_CONF_PATH}/httpd.conf

USER 10001
WORKDIR ${APP_ROOT}

ENTRYPOINT [ "uid_entrypoint" ]

EXPOSE 8080
