<template>
    <table class="table">
        <thead>
            <th>
                <td>ID</td>
                <td>Title</td>
                <td>Create_Time</td>
            </th>
        </thead>
    </table>
</template>
<script>
    export default {
        data: function () {
            return {
                blog: {}
            }
        },
        mounted: function () {
            this.defineResource()
        },
        methods: {
            defineResource: function () {
                this.Article = this.$resource('/api/articles{/id}', {}, {}, {
                    emulateJSON: true
                });
            },
            submit: function (data) {
                console.log(data);
                this.Article.save(data).then(data => console.log(data))
            }
        }
    }
</script>