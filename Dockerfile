# heroes-web-centos7
FROM centos/httpd:latest

RUN yum -y update && \
    curl -sL https://rpm.nodesource.com/setup_10.x | bash - && yum -y install nodejs && \
    yum clean all && npm install -g @angular/cli@latest

# Set the labels that are used for OpenShift to describe the builder image.
LABEL maintainer="Sun Jingchuan <jason@163.com>" \
      io.k8s.description="Heroes Web" \
      io.k8s.display-name="Heroes Web" \
      io.openshift.expose-services="8080:http" \
      io.openshift.tags="angular,heroes-web" \
      # this label tells s2i where to find its mandatory scripts(run, assemble, save-artifacts)
      # io.openshift.s2i.scripts-url="image:///usr/libexec/s2i" \
      io.openshift.s2i.scripts-url="image:///tmp/scripts" \
      io.openshift.s2i.destination="/tmp"

ENV APP_ROOT=/opt/heroes
ENV PATH=${APP_ROOT}/bin:${PATH} HOME=${APP_ROOT} HTTPD_MAIN_CONF_PATH=/etc/httpd/conf

COPY bin ${APP_ROOT}/bin
# Copy the S2I scripts to /usr/libexec/s2i
# COPY .s2i/bin /usr/libexec/s2i

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

# Inform the user how to run this image.
# CMD ["/usr/libexec/s2i/usage"]
