<template>
    <div>
        <form @submit.prevent="submit(blog)">
            <input type="text" v-model="blog.title" placeholder="title"/>
            <textarea v-model="blog.content"  placeholder="content"></textarea>
            <input type="submit"/>
        </form>
    </div>
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
                this.Blog = this.$resource('/api/article{/id}', {}, {}, {
                    emulateJSON: true
                });
            },
            submit: function (data) {
                console.log(data);
                this.Blog.save(data).then(data => console.log(data))
            }
        }
    }
</script>