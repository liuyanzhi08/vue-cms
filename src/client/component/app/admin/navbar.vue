<template>
  <nav
    v-if="isAuthenticated"
    class="uk-navbar-container"
    uk-navbar
  >
    <div class="uk-navbar-left">
      <a
        class="uk-navbar-item uk-logo"
        href="#"
      >vue-cms</a>
      <ul class="uk-navbar-nav">
        <li class="uk-active">
          <router-link
            to="/admin/category"
          >文章管理
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/staticize"
          >发布
          </router-link>
        </li>
      </ul>
    </div>
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li>
          <a href="#">{{ user.username }}</a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li
                class="uk-active"
                @click="logout"
              ><a href="#">退出</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';
import { AUTH_LOGOUT, AUTH_USER } from '../../../store';

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    };
  },
  computed: {
    ...mapGetters([
      'user',
      'isAuthenticated',
    ]),
  },
  created() {
    if (this.isAuthenticated) {
      this.$store.dispatch(AUTH_USER);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push({ name: 'login' });
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss" scoped>
  .logo {
    font-size: 16px;
  }
</style>
