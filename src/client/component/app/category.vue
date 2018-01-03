<template>
    <form @submit.prevent="submit(category)">
        <div class="form-group">
            <input type="text" v-model="category.title" placeholder="title" class="form-control"/>
        </div>
        <div class="form-group">
            <textarea v-model="category.description" placeholder="description" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <app-category-tree v-model="category.parent_id"></app-category-tree>
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary"/>
        </div>

    </form>
</template>
<script>
    import category from '../../api/category'
    import AppCategoryTree from './category-tree.vue'
    import SimpleMDE from 'simplemde'

    let isNew = true

    export default {
        props: {
            id: {
                type: Number,
                default: 0
            }
        },
        data: function () {
            return {
                category: {parent_id: 0},
            }
        },
        methods: {
            submit: function (data) {
                var method = isNew ? 'save' : 'update'
                category[method](data).then(res => console.log(res))
            },
            setForm: function () {
                // get category info if not new
                var id = this.id || this.$route.params.id;
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
            }
        },
        created: function () {
        },
        mounted: function () {
        },
        watch: {
            id: {
                handler: function () {
                    this.setForm()
                },
                immediate:true
            }
        },
        components: {
            AppCategoryTree
        }
    }
</script>
<style lang="scss">
    @import "~simplemde.style";
</style>