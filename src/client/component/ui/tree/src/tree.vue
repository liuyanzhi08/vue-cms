<template>
    <div class="ui-tree">
        <ui-tree-nodes :data="data" :load="load"></ui-tree-nodes>
        <!--<template v-for="node in data">-->
            <!--<div class="parent" v-if="node.children">-->
                <!--<div class="name" @click="expand(node)">-->
                    <!--<i class="fa fa-caret-right" aria-hidden="true"></i>-->
                    <!--<i class="fa fa-folder-o" aria-hidden="true"></i>-->
                    <!--<span>{{node.label}}</span>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="leaf" v-if="!node.children">{{node.label}}</div>-->
        <!--</template>-->
        <!--<div class="parent">-->
            <!--<div class="name">-->
                <!--<i class="fa fa-caret-down" aria-hidden="true"></i>-->
                <!--<i class="fa fa-folder-o" aria-hidden="true"></i>-->
                <!--<span>src</span>-->
            <!--</div>-->
            <!--<div class="parent">-->
                <!--<div class="name">-->
                    <!--<i class="fa fa-caret-down" aria-hidden="true"></i>-->
                    <!--<i class="fa fa-folder-o" aria-hidden="true"></i>-->
                    <!--<span>client</span>-->
                <!--</div>-->
                <!--<div class="parent">-->
                    <!--<div class="name">-->
                        <!--<i class="fa fa-caret-down" aria-hidden="true"></i>-->
                        <!--<i class="fa fa-folder-o" aria-hidden="true"></i>-->
                        <!--<span>api</span>-->
                    <!--</div>-->
                    <!--<div class="leaf">a.jss</div>-->
                    <!--<div class="parent">-->
                        <!--<div class="name">-->
                            <!--<i class="fa fa-caret-down" aria-hidden="true"></i>-->
                            <!--<i class="fa fa-folder-o" aria-hidden="true"></i>-->
                            <!--<span>sub</span>-->
                        <!--</div>-->
                        <!--<div class="leaf">api-sub-a.js</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="leaf">-->
                    <!--<span>index.js</span>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="parent">-->
                <!--<div class="name">-->
                    <!--<i class="fa fa-caret-right" aria-hidden="true"></i>-->
                    <!--<i class="fa fa-folder-o" aria-hidden="true"></i>-->
                    <!--<span>server</span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="leaf">READM.md</div>-->
    </div>
</template>
<script>
    import treeNodes from './tree-nodes.vue'
    export default {
        name: 'ui-tree',
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
        },
        created: function () {
        },
        components: {
            UiTreeNodes: treeNodes
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
        > .parent > *, > .leaf {
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