import Vue from 'vue'

const Article = Vue.resource('/api/article{/id}', {}, {}, {
    emulateJSON: true
})

export default Article;