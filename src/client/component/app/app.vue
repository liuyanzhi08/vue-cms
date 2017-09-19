<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link :to="{name: 'root'}" class="navbar-brand">{{brand}}</router-link>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul v-for="nav in navs" class="nav navbar-nav">
                        <li :class="{'active': $route.name === nav.id}">
                            <router-link :to="{name: nav.id}">{{nav.label}}</router-link>
                        </li>
                    </ul>
                    <form class="navbar-form navbar-left">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="搜索关键字...">
                        </div>
                    </form>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import 'bootstrap.script'
    export default {
        data: function () {
            return {
                brand: 'NoBody',
                navs: [
                    {
                        id: 'label',
                        label: '标签'
                    },
                    {
                        id: 'about',
                        label: '关于'
                    }
                ]
            }
        }
    }
</script>
<style lang="scss">
    @import "~bootstrap.style"
</style>