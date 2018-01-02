<template>
    <div class="ui-tree">
        <ui-tree-nodes :data="data" :load="load" :click="click" :render-content="renderContent"></ui-tree-nodes>
    </div>
</template>
<script>
    import UiTreeNodes from './tree-nodes.vue'
    export default {
        name: 'ui-tree',
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
            }
        },
        methods: {
        },
        created: function () {
        },
        components: {
            UiTreeNodes
        }
    }
</script>
<style lang="scss">
    .ui-tree {
        .parent > * {
            margin-left: 30px;
        }
        .leaf {
            margin-left: 60px;
        }
        > .ui-tree-nodes > .parent > *, > .ui-tree-nodes > .leaf {
            margin-left: 0;
        }
        .name {
            .fa-caret-right, .fa-caret-down {
                margin-right: 10px;
            }
        }
        .name, .leaf {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 3px 10px;
            border-radius: 3px;
            &:hover {
                 background: #eee;
             }
            .fa-folder-o, .fa-file-o {
                margin-right: 5px;
            }
        }
    }
</style>