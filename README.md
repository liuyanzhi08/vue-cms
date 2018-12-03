# VUE-CMS. Proudly Using ES7, Vue 2, Koa 2, Webpack 4, Babel 7 And Mocha

## Feature

1. **[HRM](https://webpack.js.org/concepts/hot-module-replacement/)**
    Both back-end(Koa) and front-end HRM support in dev mod
2. **[SSR](https://vuejs.org/v2/guide/ssr.html)**
    Both SPA and SSR mode are support, and support static HTML page generating
3. **[UIKit](https://getuikit.com/)** UIKit is used to support responsive web design

## Dependency

Mysql: >= 5.6.0

Node: >=v10.0.0


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

