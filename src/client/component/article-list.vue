<template>
    <div>
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
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="/#/article?_page=2&_num=10">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
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
            Article.get(this.$route.query).then(res => this.articles = res.data)
        }
    }
</script>