# VUE-CMS. Proudly Using ES7, Vue 2, Koa 2, Webpack 4, Babel 7 And Mocha

## Feature

1. **[HMR](https://webpack.js.org/concepts/hot-module-replacement/)**
    Both back-end(Koa) and front-end support HRM in dev mod
2. **[SSR](https://vuejs.org/v2/guide/ssr.html)**
    Both SPA and SSR mode are supported, and so is static HTML page generating
3. **[UIKit](https://getuikit.com/)** UIKit is used to support responsive web design

4. Built-in network optimization. No need to configure nginx hand by hand, the app'
   server has already done everything:
   1. assets(IMG, JS, and CSS) are automatically cached in browser
   2. when visiting the generated static pages, the app will check if the pages
      are updated since last visit on client: if not return 304, if yes return 200

## Dependency

Mysql: >= 5.6.0

Node: >=v10.0.0


## Starting

```
$ git clone https://github.com/liuyanzhi08/vue-cms.git
$ cd vue-cms
$ npm install
$ vim src/config.js    # modify the db config to yours
$ npm run dev:db:init  # generate the development db
$ npm start            # build back-end and front-end files and watching
```
**username: admin** & **password: admin**

Enjoy.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, liuyanzhi08

