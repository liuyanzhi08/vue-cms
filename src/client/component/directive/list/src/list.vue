<template>
    <div>
        <ul>
            <slot
                name="item"
                v-for="item in items"
                :text="item"
            >
                <!-- 这里写入备用内容 -->
            </slot>
        </ul>
    </div>
</template>
<script>
    import Article from '../../../../api/article'
    export default {
        name: 's-list',
        props: {
            cid: [Number, String],
            limit: {
                type: String,
                default: '0, 10'
            }
        },
        data: function () {
            return {
                items: [1,2,3,4]
            }
        },
        created: function () {
            Article.get().then((res) => {
                console.log(res)
            })
        }
    }
</script>
<style lang="scss">
</style>