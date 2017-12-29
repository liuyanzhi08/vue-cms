<template>
    <div>
        <select
            v-model="value"
            @change="($event) => { this.$emit('input', value) }"
            class="form-control"
        >
            <option v-for="option in options" :value="option.value">{{option.text}}</option>
        </select>
    </div>
</template>
<script>
    import Category from '../../api/category'
    import _ from 'lodash'

    export default {
        name: 'app-categoryTree',
        props: {
            value: {
                type: Number,
                default: 0
            }
        },
        data: function () {
            return {
                options: []
            }
        },
        methods: {
        },
        created: function () {
            Category.get().then(res => {
                let categories = res.data.items;
                let idMap = {}
                let roots = []
                _.each(categories, category => {
                    idMap[category.id] = category
                    category.children = []
                })
                _.each(categories, category => {
                    let id = category.id
                    let pid = category.parent_id
                    if (!pid) {
                        roots.push(category)
                    } else {
                        idMap[pid].children.push(category)
                    }
                })

                let options = []
                let split = ''
                let root = {title: 'root', id: 0, children: roots}
                let grnOptions = (node, options) => {
                    options.push({
                        text: split + node.title,
                        value: node.id
                    })
                    split += '|--'
                    _.each(node.children, child => {
                        let _split = split
                        grnOptions(child, options)
                        split = _split
                    })
                }
                grnOptions(root, options)
                this.options = options
            })
        },
        mounted: function () {
        }
    }
</script>
<style lang="scss">
</style>