<template>
    <form @submit.prevent="submit(category)">
        <div class="form-group">
            <input type="text" v-model="category.title" placeholder="title" class="form-control"/>
        </div>
        <div class="form-group">
            <textarea v-model="category.description" placeholder="栏目简介" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <select v-model="category.parent_id" class="form-control">
                <option v-for="cate in categories" v-bind:value="cate.id">{{cate.title}}</option>
            </select>
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary"/>
        </div>

    </form>
</template>
<script>
    import category from '../../api/category'
    import SimpleMDE from 'simplemde'

    let isNew = true

    export default {
        data: function () {
            return {
                category: {parent_id: 0},
                categories: []
            }
        },
        methods: {
            submit: function (data) {
                var method = isNew ? 'save' : 'update'
                category[method](data).then(res => console.log(res))
            }
        },
        created: function () {
            // get category info if not new
            var id = this.$route.params.id;
            if (id != 0) {
                category
                    .get({ id: id})
                    .then(
                        res => {
                            this.category = res.body
                            isNew = false
                        }
                    )
            }
            category.get().then(res => {
                this.categories = res.data.items
                this.categories.unshift({
                    id: 0,
                    title: '顶级栏目'
                })
            })
        },
        mounted: function () {
        }
    }
</script>
<style lang="scss">
    @import "~simplemde.style";
</style>