import Vue from 'vue'

const Category = Vue.resource('/api/category{/id}', {}, {}, {
    emulateJSON: true
})

export default Category;