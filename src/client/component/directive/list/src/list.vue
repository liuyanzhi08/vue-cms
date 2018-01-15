<template>
    <div>
        <ul>
            <slot name="item"
                  v-for="item in items"
                  :text="item">
                <!-- 这里写入备用内容 -->
            </slot>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 's-list',
        props: {},
        data: function () {
            return {
                items: [1,2,3,4]
            }
        },
        created: function () {
        }
    }
</script>
<style lang="scss">
</style>