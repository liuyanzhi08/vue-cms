<template>
    <div>
        <slot
            name="article"
            :id="article.id"
            :title="article.title"
            :content="article.content"
            :category_id="article.category_id"
            :create_time="article.create_time"
            :url="article.url"
        >
        </slot>
    </div>
</template>
<script>
    import Article from '../../../../api/article'
    export default {
        name: 's-detail',
        props: {
            aid: {
                type: String,
                default: '0'
            }
        },
        data: function () {
            return {
                article: {}
            }
        },
        created: function () {
            Article.get(this.aid).then((res) => {
                this.article = res.data
            })
        }
    }
</script>
<style lang="scss">
</style>