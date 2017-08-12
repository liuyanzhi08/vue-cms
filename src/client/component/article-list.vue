<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Create_Time</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="article in articles">
                <td>{{article.id}}</td>
                <td>{{article.title}}</td>
                <td>{{article.content}}</td>
                <td>{{article.create_time}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import Article from '../api/article'
    export default {
        data: function () {
            return {
                articles : []
            }
        },
        created: function () {
            Article.get().then(res => this.articles = res.data)
        }
    }
</script>