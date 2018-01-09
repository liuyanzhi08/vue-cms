import list from './list/index'

const directive = {}
directive.install = function (Vue) {
    Vue.use(list)
}

export default directive