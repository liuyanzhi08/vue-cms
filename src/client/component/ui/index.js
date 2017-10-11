import pagination from './pagination/index.js'

const ui = {}
ui.install = function (Vue) {
    Vue.use(pagination)
}

export default ui