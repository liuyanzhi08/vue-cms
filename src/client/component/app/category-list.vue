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
                <tr v-for="category in categories">
                    <td>{{category.id}}</td>
                    <td><router-link :to="{name: 'category', params: { id: category.id }}" >{{category.title}}</router-link></td>
                    <td>{{category.create_time}}</td>
                </tr>
            </tbody>
        </table>
        <ui-pagination :page="page" :total="total"></ui-pagination>
    </div>
</template>
<script>
    import Category from '../../api/category.js'
    export default {
        data: function () {
            return {
                categories : [],
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
            Category.get(this.$route.query).then(res => {
                this.categories = res.data.items
                this.total = res.data.total
                this.page = +this.$route.query._page || 1
            })
        }
    }
</script>