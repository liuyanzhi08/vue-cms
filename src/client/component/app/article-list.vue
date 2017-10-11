<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Create_Time</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="article in articles">
                    <td>{{article.id}}</td>
                    <td><router-link :to="{name: 'article', params: { id: article.id }}" >{{article.title}}</router-link></td>
                    <td>{{article.create_time}}</td>
                </tr>
            </tbody>
        </table>
        <ui-pagination :page="page" :total="total"></ui-pagination>
    </div>
</template>
<script>
    import Article from '../../api/article.js'
    export default {
        data: function () {
            return {
                articles : [],
                page: null,
                total: null
            }
        },
        computed: {
            doneTodosCount: function () {
                return this.$store.getters.doneTodos
            }
        },
        created: function () {
            Article.get(this.$route.query).then(res => {
                this.articles = res.data.items
                this.total = res.data.total
                this.page = +this.$route.query._page || 1
            })
        }
    }
</script>