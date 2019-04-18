# heroes-web
FROM heroes/httpd-centos7:latest

COPY heroes /var/www/html/heroes

CMD $HOME/bin/run
