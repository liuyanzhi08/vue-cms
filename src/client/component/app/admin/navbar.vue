<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <img src="@image/logo.png" alt="logo">
            vue-cms
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" :class="{active: $route.path === '/admin/category'}">
                    <router-link  class="nav-link"  to="/admin/category">文章管理</router-link>
                </li>
                <li class="nav-item" :class="{active: $route.path === '/admin/staticize'}">
                    <router-link  class="nav-link"  to="/admin/staticize">发布</router-link>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right" v-if="isAuthenticated">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">
                        {{user.username}}
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <!--<li><a href="#">Action</a></li>-->
                        <!--<li><a href="#">Another action</a></li>-->
                        <!--<li><a href="#">Something else here</a></li>-->
                        <!--<li role="separator" class="divider"></li>-->
                        <li @click="logout"><a href="#">退出</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { AUTH_LOGOUT, AUTH_USER } from "../../../store";

  export default {
    data: function () {
      return {}
    },
    computed: {
      ...mapGetters([
        'user',
        'isAuthenticated'
      ])
    },
    methods: {
      logout() {
        this.$store.dispatch(AUTH_LOGOUT).then(() => {
          this.$router.push({ name: 'login' });
        })
      }
    },
    created() {
      if (this.isAuthenticated) {
        this.$store.dispatch(AUTH_USER);
      }
    }
  }
</script>
<style lang="scss">
</style>

