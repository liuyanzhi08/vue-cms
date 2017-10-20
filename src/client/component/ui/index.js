import pagination from './pagination/index.js'
import collapse from './collapse/index.js'

const ui = {}
ui.install = function (Vue) {
    Vue.use(pagination)
    Vue.use(collapse)
}

export default ui