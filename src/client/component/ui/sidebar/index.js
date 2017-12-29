import sidebar from './src/sidebar.vue'

sidebar.install = function (Vue) {
    Vue.component(sidebar.name, sidebar)
}

export default sidebar