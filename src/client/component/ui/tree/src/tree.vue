<template>
    <div class="ui-tree">
        <div class="parent">
            <div class="name">src</div>
            <div class="parent">
                <div class="name">client</div>
                <div class="parent">
                    <div class="name">api</div>
                    <div class="leaf">a.js</div>
                    <div class="parent">
                        <div class="name">api-sub</div>
                        <div class="leaf">api-sub-a.js</div>
                    </div>
                </div>
                <div class="leaf">index.js</div>
            </div>
            <div class="parent">server</div>
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
    }
</style>