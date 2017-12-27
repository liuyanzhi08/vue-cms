import pagination from './src/pagination.vue'

pagination.install = function(Vue) {
    Vue.component(pagination.name, pagination)
};

export default pagination;