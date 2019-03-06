# 部署生产环境

## 安装依赖

1. 安装mysql(version >= v5.6.0)
2. 安装node(version >= v10.0.0)

## 安装VUE-CMS

```bash
$ git clone https://github.com/liuyanzhi08/vue-cms.git
$ cd vue-cms
$ npm install
$ vim src/config.js  # modify the db config to yours
$ npm run db:init    # generate the demo db
$ npm run pub;       # build back-end and front-end files
                     # and start a node server on local host(default port: 8081)
```

运行上面代码，你就能在服务器上访问

用户端：[http://localhost:8081/](http://localhost:8081/)

管理端：[http://localhost:8081/admin](http://localhost:8081/admin) (默认用户名admin，密码admin)


## Nginx配置：

```
upstream cms {
  server 127.0.0.1:8081;
}

server {
  listen 80;
  server_name your-host-name.com;
  access_log /var/log/nginx/vue-cms.log;

  location / {
      proxy_pass http://cms;
      proxy_set_header Host $http_host;
      proxy_set_header X-Forwarded-For $remote_addr;
   }
}
```
