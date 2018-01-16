import detail from './src/detail.vue'

detail.install = function (Vue) {
    Vue.component(detail.name, detail)
}

export default detail