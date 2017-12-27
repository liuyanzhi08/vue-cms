import tree from './src/tree.vue'

tree.install = function(Vue) {
    Vue.component(tree.name, tree)
};

export default tree;