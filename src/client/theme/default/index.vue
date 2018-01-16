<template>
    <div>
        <s-list cid="6" limit="0,5" slot="item">
            <h1
                slot="category"
                slot-scope="category"
            >{{category.title}}</h1>
            <div
                slot="article"
                slot-scope="article"
            >
                <div style="color:red">
                    标题: {{ article.title }}
                </div>
                <div style="color:red">
                    时间: {{ article.create_time }}
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