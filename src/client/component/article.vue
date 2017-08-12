<template>
    <form @submit.prevent="submit(article)">
        <div class="form-group">
            <input type="text" v-model="article.title" placeholder="title" class="form-control"/>
        </div>
        <div class="form-group">
            <textarea v-model="article.content"  placeholder="content" class="form-control"></textarea>
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
                article: {}
            }
        },
        methods: {
            submit: function (data) {
                Article.save(data).then(data => console.log(data))
            }
        },
        created: function () {
            var id = this.$route.params.id;
            if (id != 0) {
                Article
                    .get({ id: id})
                    .then(
                        data => console.log(data)
                    )
            }
        },
    }
</script>