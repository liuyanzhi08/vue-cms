import list from './src/list.vue'

list.install = function (Vue) {
    Vue.component(list.name, list)
}

export default list