<template>
    <div>
        我可以写好多内容
        <s-list cid="4" limit="0,5">
            <li
                slot="item"
                slot-scope="item"
            >
                {{ item.text }}
            </li>
        </s-list>
    </div>
</template>
<script>
    // import Article from '../../api/article.js'
    import marked from 'marked'
    export default {
        data: function () {
            return {
                articles: [],
                fstArticle: {}
            }
        },
        created: function () {
            // Article.get(this.$route.query).then(res => {
            //     this.articles = res.data.items.map(article => {
            //         article.html = marked(article.content)
            //         return article
            //     })
            //     this.fstArticle = this.articles[0] || {}
            //     this.total = res.data.total
            //     this.page = +this.$route.query._page || 1
            // })
        }
    }
</script>
<style lang="scss">
</style>