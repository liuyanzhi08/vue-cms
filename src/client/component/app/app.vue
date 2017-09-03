<template>
    <div>
        <!-- 路由匹配到的组件将渲染在这里 -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="scss">
    @import "~bootstrap";
</style>