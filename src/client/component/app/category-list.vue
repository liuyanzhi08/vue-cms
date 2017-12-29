<template>
    <div>
        <ui-tree :data="rootCategories" :load="load"></ui-tree>
    </div>
</template>
<script>
    import Category from '../../api/category'
    import _ from 'lodash'
    export default {
        data: function () {
            return {
                rootCategories : [],
                page: null,
                total: null
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
                            label: category.title,
                            children: -1,
                            data: category
                        })
                    })
                    return subCategories
                })
            }
        },
        created: function () {
            Category.get({
                parent_id: 0
            }).then(res => {
                let _this = this
                _.each(res.data.items, category => {
                    _this.rootCategories.push({
                        label: category.title,
                        children: -1,
                        data: category
                    })
                })
                this.total = res.data.total
                this.page = +this.$route.query._page || 1
            })
        }
    }
</script>