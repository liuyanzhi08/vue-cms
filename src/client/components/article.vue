<template>
    <form @submit.prevent="submit(blog)">
        <div class="form-group">
            <input type="text" v-model="blog.title" placeholder="title" class="form-control"/>
        </div>
        <div class="form-group">
            <textarea v-model="blog.content"  placeholder="content" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary"/>
        </div>

    </form>
</template>
<script>
    import Article from '../api/article'
    export default {
        data: function () {
            return {
                blog: {}
            }
        },
        methods: {
            submit: function (data) {
                console.log(data)
                Article.save(data).then(data => console.log(data))
            }
        }
    }
</script>