import pagination from './pagination/index.js'
import collapse from './collapse/index.js'
import tree from './tree/index.js'
import sidebar from './sidebar/index.js'

const ui = {}
ui.install = function (Vue) {
    Vue.use(pagination)
    Vue.use(collapse)
    Vue.use(tree)
    Vue.use(sidebar)
}

export default ui