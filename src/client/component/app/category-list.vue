<template>
    <div class="category-list">
        <ui-sidebar>
            <aside>
                <ui-tree :data="rootCategories" :load="load" :click="click" :render-content="renderContent"></ui-tree>
            </aside>
            <div>
                <app-article :id="selected.id" :category-id="selected.categoryId" v-if="selected.type === 'article'"></app-article>
                <app-category :id="selected.id" v-if="selected.type === 'category'"></app-category>
            </div>
        </ui-sidebar>
    </div>
</template>
<script>
    import Article from '../../api/article'
    import Category from '../../api/category'
    import AppArticle from './article.vue'
    import AppCategory from './category.vue'
    import _ from 'lodash'
    export default {
        data: function () {
            return {
                rootCategories : [],
                page: null,
                total: null,
                selected: {
                    id: null,
                    type: 'article'
                }
            }
        },
        computed: {
            doneTodosCount: function () {
                return this.$store.getters.doneTodos
            }
        },
        methods: {
            load: function (node) {
                return Category.get({
                    parent_id: node.data.id
                }).then(res => {
                    let subCategories = []
                    _.each(res.data.items, category => {
                        subCategories.push({
                            label: `${category.title} [ id: ${category.id} ]`,
                            children: -1,
                            data: category
                        })
                    })
                    return subCategories
                }).then(subCategories => {
                    return Article.get({
                        category_id: node.data.id
                    }).then(res => {
                        let subArticles = []
                        _.each(res.data.items, article => {
                            subArticles.push({
                                label: `${article.title} [ id: ${article.id} ]`,
                                data: article
                            })
                        })
                        return subCategories.concat(subArticles)
                    })
                })
            },
            click: function (node) {
                if (node.children) {
                    this.selected = {
                        id: node.data.id,
                        type: 'category'
                    }
                } else {
                    this.selected = {
                        id: node.data.id,
                        type: 'article'
                    }
                }
            },
            addArticle (node) { this.selected = { id: 0, type: 'article', categoryId: node.data.id}},
            renderContent(h, {node}) {
                if (!node.children) {
                   return (<span>{node.label}</span>)
                } else {
                    return (
                        <span class="node-edit">
                            {node.label}
                            <i class="fa fa-plus" on-click={ (e) => {this.addArticle(node);e.stopPropagation()} }></i>
                        </span>
                    )
                }
            }
        },
        created: function () {
            Category.get({
                parent_id: 0
            }).then(res => {
                let _this = this
                _.each(res.data.items, category => {
                    _this.rootCategories.push({
                        label: `${category.title} [ id: ${category.id} ]`,
                        children: -1,
                        data: category
                    })
                })
                this.total = res.data.total
                this.page = +this.$route.query._page || 1
            })
        },
        components: {
            AppArticle,
            AppCategory
        }
    }
</script>
<style lang="scss">
    .category-list {
        .main {
            padding: 10px;
        }
        .node-edit {
            i {
                margin-left: 5px;
            }
        }
    }
</style>