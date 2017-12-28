<template>
    <div class="ui-tree">
        <div class="parent">
            <div class="name">
                <i class="fa fa-caret-down" aria-hidden="true"></i>
                <i class="fa fa-folder-o" aria-hidden="true"></i>
                <span>src</span>
            </div>
            <div class="parent">
                <div class="name">
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                    <span>client</span>
                </div>
                <div class="parent">
                    <div class="name">
                        <i class="fa fa-caret-down" aria-hidden="true"></i>
                        <i class="fa fa-folder-o" aria-hidden="true"></i>
                        <span>api</span>
                    </div>
                    <div class="leaf">a.js</div>
                    <div class="parent">
                        <div class="name">
                            <i class="fa fa-caret-down" aria-hidden="true"></i>
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            <span>sub</span>
                        </div>
                        <div class="leaf">api-sub-a.js</div>
                    </div>
                </div>
                <div class="leaf">
                    <span>index.js</span>
                </div>
            </div>
            <div class="parent">
                <div class="name">
                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                    <span>server</span>
                </div>
            </div>
        </div>
        <div class="leaf">README.md</div>
    </div>
</template>
<script>
    class Pagigation {
        constructor (page, num, total, router) {
        }

        go (page) {
            this.page = page
        }
    }
    export default {
        name: 'ui-tree',
        props: {
            page: {
                type: Number,
                default: null
            },
            total: Number
        },
        data: function () {
            return {
                pagination: null
            }
        },
        methods: {
        },
        created: function () {
            let me = this
            this.$watch('page', (newVal, oldVal) => {
                this.pagination = new Pagigation(newVal, 10, this.total, this.$router)
            })
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