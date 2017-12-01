<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navs" aria-expanded="false">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link :to="{name: 'root'}" class="navbar-brand">{{brand}}</router-link>
                </div>

                <div class="collapse navbar-collapse" id="navs">
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
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import 'bootstrap.script'
    export default {
        data: function () {
            return {
                brand: 'Coffee\'s Blog',
                navs: [
                    {
                        id: 'articleList',
                        label: '汇总'
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
    @import "~bootstrap.style";
    @import "~fontawesome";
    body {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    }
</style>