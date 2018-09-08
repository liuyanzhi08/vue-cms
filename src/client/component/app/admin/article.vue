<template>
    <form @submit.prevent="submit(article)">
        <div class="form-group">
            <input type="text" v-model="article.title" placeholder="title" class="form-control"/>
        </div>
        <div class="form-group">
            <app-category-tree v-model="article.category_id"></app-category-tree>
        </div>
        <div class="form-group">
            <textarea v-model="article.content"  placeholder="content" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary"/>
        </div>

    </form>
</template>
<script>
    import Article from '../../../api/article'
    import Category from '../../../api/category'
    import SimpleMDE from 'simplemde'
    import 'simplemde/dist/simplemde.min.css';
    import AppCategoryTree from './category-tree.vue'

    let isNew = true
    let simplemde

    export default {
        props: {
            id: {
                type: Number,
                default: 0
            },
            categoryId: {
                type: Number,
                default: 0
            }
        },
        data: function () {
            return {
                article: {}
            }
        },
        methods: {
            submit: function (data) {
                var method = isNew ? 'save' : 'update'
                data.content = simplemde.value()
                Article[method](data.id, data).then(res => console.log(res))
            },
            setForm: function () {
                var id = this.id || this.$route.params.id;
                if (id) {
                    Article
                        .get(id)
                        .then(
                            res => {
                                this.article = res.data;
                                this.article.create_time = new Date(this.article.create_time);
                                isNew = false;
                                simplemde.value(res.data.content);
                            }
                        )
                } else {
                    isNew = true
                    simplemde && simplemde.value('')
                    this.article = {
                        category_id: this.categoryId
                    }
                }
            }
        },
        watch: {
            id: {
                handler: function () {
                    this.setForm()
                },
                immediate:true
            },
            categoryId: {
                handler: function () {
                    this.setForm()
                }
            }
        },
        created: function () {
            // get article info if not new
        },
        mounted: function () {
            simplemde = new SimpleMDE();
        },
        components: {
            AppCategoryTree
        }
    }
</script>
<style lang="scss">
</style>