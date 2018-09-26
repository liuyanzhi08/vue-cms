<template>
  <div>
    <nav
      v-if="isAuthenticated"
      class="uk-navbar-container uk-light"
      uk-navbar
      uk-sticky
    >
      <div class="uk-navbar-left">
        <a
          class="uk-navbar-item uk-logo"
          href="#"
        >vue-cms</a>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-visible@m uk-navbar-nav">
          <li class="uk-active">
            <router-link
              to="/admin/category"
            >Catalog
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/staticize"
            >Publish
            </router-link>
          </li>
          <li>
            <a href="#">{{ user.username }}</a>
            <div class="uk-navbar-dropdown">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li
                  class="uk-active"
                  @click="logout"
                ><a href="#">Logout</a></li>
              </ul>
            </div>
          </li>
        </ul>
        <a
          class="uk-hidden@m uk-navbar-toggle"
          uk-navbar-toggle-icon
          @click="toggleMenu"
        />
      </div>
    </nav>
    <div
      id="offcanvas-nav"
      uk-offcanvas="mode: slide; overlay: true"
    >
      <div class="uk-offcanvas-bar">
        <ul class="uk-nav uk-nav-default">
          <li class="uk-active">
            <router-link
              to="/admin/category"
            >
              <span
                class="uk-margin-small-right"
                uk-icon="icon: table"
              />
              Catalog
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/staticize"
            >
              <span
                class="uk-margin-small-right"
                uk-icon="icon: cloud-upload"
              />
              Publish
            </router-link>
          </li>
          <li class="uk-nav-divider" />
          <li>
            <a @click="logout">
              <span
                class="uk-margin-small-right"
                uk-icon="icon: sign-out"
              />Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import UIkit from 'uikit';
import { mapGetters } from 'vuex';
import {
  AUTH_LOGOUT, AUTH_USER, MENU_SET, MENU_TOGGLE,
} from '../../../store';

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
  mounted() {
    const menu = UIkit.offcanvas('#offcanvas-nav');
    this.$store.dispatch(MENU_SET, menu);
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push({ name: 'login' });
      });
    },
    toggleMenu() {
      this.$store.dispatch(MENU_TOGGLE);
    },
  },
};
</script>
<style lang="scss" scoped>
  .logo {
    font-size: 16px;
  }
</style>
