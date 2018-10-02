# CMS. Proudly using ES7, Vue 2, Koa 2, Webpack 4, Babel 7 and Mocha

## Dependency

Mysql: >= 5.6.0 

Node: >=v10.0.0

VPN(for China): [puppeteer](https://github.com/GoogleChrome/puppeteer) is used by the project, so Chinese developer should be
access to the real internet. An alternative approach is using [cnpm](https://npm.taobao.org/).


## Starting

```
$ git clone https://github.com/liuyanzhi08/vue-cms.git
$ cd vue-cms
$ npm install          # maybe run `cnpm install`
$ vim src/config.js    # modify the db config to yours
$ npm run dev:db:init  # generate the development db
$ npm start            # build Vue files and start a Koa server
```
**username: admin** & **password: admin**

Enjoy.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, liuyanzhi08

