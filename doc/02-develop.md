# 搭建开发环境

## 安装依赖

1. 安装mysql(version >= v5.6.0)
2. 安装node(version >= v10.0.0)

## 安装VUE-CMS

```bash
$ git clone https://github.com/liuyanzhi08/vue-cms.git
$ cd vue-cms
$ npm install
$ vim src/config.js    # modify the db config to yours
$ npm run dev:db:init  # generate the development db
$ npm start            # build back-end and front-end files and watching
```
