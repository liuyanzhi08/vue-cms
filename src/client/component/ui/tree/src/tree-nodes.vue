<template>
    <div class="ui-tree-nodes">
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
                <ui-tree-nodes v-if="node.children !== -1" :data="node.children" :load="load" :click="click" :render-content="renderContent"></ui-tree-nodes>
            </div>
            <div class="leaf" v-if="!node.children" @click="click(node)">
                <node-content :node="node"></node-content>
            </div>
        </template>
        <div v-if="!data.length" class="leaf">(空)</div>
    </div>
</template>
<script>
    import _ from 'lodash'
    export default {
        name: 'ui-tree-nodes',
        props: {
            data: {
                type: Array,
                default: []
            },
            load: {
                type: Function,
                default: _.noop
            },
            click: {
                type: Function,
                default: _.noop
            },
            renderContent: Function
        },
        data: function () {
            return {
                test: '<span style="color:red">red</span>'
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
        },
        components: {
            NodeContent: {
                props: {
                    node: {
                        required: true
                    }
                },
                render(h) {
                    const parent = this.$parent;
                    const node = this.node;
                    const data = node.data;
                    const store = node.store;
                    return (
                        parent.renderContent
                            ? parent.renderContent.call(parent._renderProxy, h, { node })
                            : <span>{ this.node.label }</span>
                    );
                }
            }
        }
    }
</script>
<style lang="scss">

</style>