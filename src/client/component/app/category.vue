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
    import Article from '../../api/article'
    import SimpleMDE from 'simplemde'

    let isNew = true
    let simplemde

    export default {
        data: function () {
            return {
                article: {}
            }
        },
        methods: {
            submit: function (data) {
                var method = isNew ? 'save' : 'update'
                data.content = simplemde.value()
                Article[method](data).then(res => console.log(res))
            }
        },
        created: function () {
            // get article info if not new
            var id = this.$route.params.id;
            if (id != 0) {
                Article
                    .get({ id: id})
                    .then(
                        res => {
                            this.article = res.body
                            isNew = false
                            simplemde.value(res.body.content)
                        }
                    )
            }
        },
        mounted: function () {
            simplemde = new SimpleMDE();
        }
    }
</script>
<style lang="scss">
    @import "~simplemde.style";
</style>