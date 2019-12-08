FROM openresty/openresty:alpine
RUN apk update \
 && apk upgrade \
 && apk add bash \

# 系统设置(设置时区)
RUN rm -rf /etc/localtime \
 && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN set -ex && \
    rm /etc/nginx/conf.d/default.conf

ADD ./nginx.conf /usr/local/openresty/nginx/conf/


RUN cd /
RUN mkdir data_nginx
RUN mkdir /data_nginx/frontend_admin
COPY ./ /data_nginx/frontend_admin
EXPOSE 8088
