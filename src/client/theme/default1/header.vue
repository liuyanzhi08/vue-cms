<template>
  <header class="uk-container">
    <nav
      class="uk-visible@m"
      uk-navbar
    >
      <div class="uk-navbar-left">
        <ul
          class="uk-navbar-nav"
        >
          <li>
            <router-link :to="index">Home</router-link>
          </li>
          <li
            v-for="item in categories"
            :key="item.id"
            :class="{'has-children': item.children}"
          >
            <router-link
              v-if="!item.children"
              :to="item.url"
            >{{ item.title }}</router-link>
            <template v-if="item.children">
              <a href="#">{{ item.title }}</a>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li
                    v-for="child in item.children"
                    :key="child.id"
                  >
                    <router-link :to="child.url">{{ child.title }}</router-link>
                  </li>
                </ul>
              </div>
            </template>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <i class="fa fa-search" />
      </div>
    </nav>
    <nav
      class="uk-hidden@m"
      uk-navbar
    >
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="social-links">
            <div class="uk-flex uk-flex-center">
              <a href="#"><i class="fa fa-github" /></a>
              <a href="#"><i class="fa fa-weibo" /></a>
              <a href="#"><i class="fa fa-twitter" /></a>
              <a href="#"><i class="fa fa-facebook" /></a>
              <a href="#"><i class="fa fa-weixin" /></a>
            </div>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <a
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
        <ul
          v-for="item in menu"
          class="uk-nav uk-nav-default"
          :class="{'uk-margin-top': item.children }"
        >
          <li
            v-if="!item.children"
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
          <li
            v-if="item.children"
            class="uk-nav-header"
          >{{ item.label || item.router.name }}</li>
          <li
            v-for="child in item.children"
            v-if="item.children"
          >
            <a href="#">
              <span
                class="uk-margin-small-right"
                :uk-icon="`icon: ${child.icon}`"
              />

              {{ child.label || child.router.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import { MENU_SET, MENU_TOGGLE } from '../../store';

export default {
  props: {
    categories: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      menu: [
        {
          label: 'Home',
          icon: 'home',
          router: {
            name: '',
            params: {},
          },
        },
        {
          label: 'About',
          icon: 'user',
          router: {
            name: '',
            params: {},
          },
        },
        {
          label: 'Archive',
          icon: 'user',
          router: {
            name: '',
            params: {},
          },
          children: [
            {
              label: 'Catalog',
              icon: 'list',
              router: {
                name: '',
                params: {},
              },
            },
            {
              label: 'Tag',
              icon: 'tag',
              router: {
                name: '',
                params: {},
              },
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['index']),
  },
  async mounted() {
    const uk = await import('uikit');
    this.$store.dispatch(MENU_SET, uk.offcanvas('#offcanvas-nav'));
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch(MENU_TOGGLE);
    },
  },
};
</script>
