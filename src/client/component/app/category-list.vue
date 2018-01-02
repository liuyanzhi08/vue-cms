<template>
    <div class="category-list">
        <ui-sidebar>
            <aside>
                <ui-tree :data="rootCategories" :load="load" :click="click" :render-content="renderContent"></ui-tree>
            </aside>
            <div>
                <app-article :id="selectedId"></app-article>
            </div>
        </ui-sidebar>
    </div>
</template>
<script>
    import Article from '../../api/article'
    import Category from '../../api/category'
    import AppArticle from './article.vue'
    import _ from 'lodash'
    export default {
        data: function () {
            return {
                rootCategories : [],
                page: null,
                total: null,
                selectedId: null
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
                this.selectedId = node.data.id;
            },
            test (node) { console.log(node) },
            renderContent(h, { node}) {
                return (
                    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                    <span>
                    <span>{node.label}</span>
                </span>
                <span>
                <div style="font-size: 12px;" type="text" on-click={ () => this.test(node) }>Append</div>
                </span>
                </span>);
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
            AppArticle
        }
    }
</script>
<style lang="scss">
    .category-list {
        .main {
            padding: 10px;
        }
    }
</style>