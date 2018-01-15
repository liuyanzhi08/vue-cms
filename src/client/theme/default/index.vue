<template>
    <div>
        我可以写好多内容
        <s-list cid="6" limit="0,5">
            <div
                slot="item"
                slot-scope="item"
            >
                <div style="color:red">
                    标题: {{ item.title }}
                </div>
                <div>
                    标题: <div v-html="item.content"></div>
                </div>
                <div style="color:red">
                    标题: {{ item.create_time }}
                </div>
            </div>
        </s-list>
    </div>
</template>
<script>
    export default {
    }
</script>
<style lang="scss">
</style>