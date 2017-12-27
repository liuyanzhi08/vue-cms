<template>

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

</style>