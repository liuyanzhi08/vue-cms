<template>
  <div>
    <nav
      v-if="isAuthenticated"
      class="uk-navbar-container uk-light uk-navbar"
      uk-navbar
      uk-sticky
    >
      <div class="uk-navbar-left">
        <router-link :to="brand.router" class="uk-navbar-item uk-logo">
          {{ brand.name }}
        </router-link>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-visible@m uk-navbar-nav">
          <li
            v-for="item in menu"
            :key="item.router.name"
          >
            <router-link
              :to="item.router"
            >
              <span
                class="uk-margin-small-right"
                :uk-icon="`icon: ${item.icon}`"
              />
              {{ item.label || item.router.name }}
            </router-link>
          </li>
          <li>
            <a href="#">{{ user.username }}</a>
            <div class="uk-navbar-dropdown">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li
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
          <li
            v-for="item in menu"
            :key="item.router.name"
          >
            <router-link
              :to="item.router"
            >
              <span
                class="uk-margin-small-right"
                :uk-icon="`icon: ${item.icon}`"
              />
              {{ item.label || item.router.name }}
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
import { mapGetters } from 'vuex';
import {
  AUTH_LOGOUT, AUTH_USER, MENU_SET, MENU_TOGGLE,
} from '../../../store';
import config from '../../../config';

const { brand, menu } = config;

export default {
  data() {
    return {
      brand,
      menu,
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
  async mounted() {
    const uk = await import('uikit');
    this.$store.dispatch(MENU_SET, uk.offcanvas('#offcanvas-nav'));
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
