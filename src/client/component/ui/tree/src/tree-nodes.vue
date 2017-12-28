<template>
    <div>
        <template v-for="node in data">
            <div class="parent" v-if="node.children">
                <div class="name" @click="toggle(node)">
                    <i
                        class="fa"
                        aria-hidden="true"
                        :class="{
                            'fa-caret-down': node.expanded,
                            'fa-caret-right': !node.expanded
                        }"
                    ></i>
                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                    <span>{{node.label}}</span>
                </div>
                <ui-tree-nodes v-if="node.children !== -1" :data="node.children" :load="load"></ui-tree-nodes>
            </div>
            <div class="leaf" v-if="!node.children">{{node.label}}</div>
        </template>
        <div v-if="!data.length" class="leaf">(空)</div>
    </div>
</template>
<script>
    export default {
        name: 'ui-tree-nodes',
        props: {
            data: {
                type: Array,
                default: []
            },
            load: Function
        },
        data: function () {
            return {
            }
        },
        methods: {
            toggle: function (node) {
                if (!node.expanded) {
                    this.load(node).then(subNodes => {
                        node.children = subNodes
                        node.expanded = !node.expanded
                    })
                } else {
                    node.children = -1;
                    node.expanded = !node.expanded
                }
            }
        },
        created: function () {
        }
    }
</script>
<style lang="scss">

</style>