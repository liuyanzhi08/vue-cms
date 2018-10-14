<template>
  <div class="theme-df">
    <div class="uk-container">
      <nav
        class="uk-visible@m"
        uk-navbar
      >
        <div class="uk-navbar-left">
          <i class="fa fa-search" />
          <ul
            v-for="item in menu"
            class="uk-navbar-nav"
          >
            <li v-if="!item.children"><a href="#">{{ item.label }}</a></li>
            <li
              v-if="item.children"
              class="has-children"
            >
              <a href="#">archive</a>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li v-for="child in item.children"><a href="#">{{ child.label }}</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="uk-navbar-right">
          <ul class="uk-navbar-nav">
            <li>
              <div class="social-links uk-flex uk-flex-center">
                <a href="#"><i class="fa fa-github" /></a>
                <a href="#"><i class="fa fa-weibo" /></a>
                <a href="#"><i class="fa fa-twitter" /></a>
                <a href="#"><i class="fa fa-facebook" /></a>
                <a href="#"><i class="fa fa-weixin" /></a>
              </div>
            </li>
          </ul>
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
      <div>
        <vms-list
          cid="2"
          limit="0, 1"
        >
          <template
            slot-scope="{ article }"
          >
            <article
              v-if="article"
              :class="{ collapsed }"
            >
              <h1>{{ article.title }}</h1>
              <div
                class="content"
                v-html="md.parse(article.content)"
              />
              <div
                v-if="collapsed"
                class="hide-article-box uk-flex uk-flex-center"
              >
                <div
                  class="uk-flex uk-flex-column uk-flex-middle  animation-slide-top uk-width-1-1"
                  @click="collapsed = !collapsed"
                >
                  <span uk-icon="icon: chevron-down" />
                  <span uk-icon="icon: chevron-down" />
                </div>
              </div>
            </article>
          </template>
        </vms-list>
      </div>
      <h3 class="uk-margin-large">Recent Posts …</h3>
      <vms-list
        cid="4"
        limit="0, 3"
      >
        <template slot-scope="{ articles }">
          <div
            class="uk-flex uk-flex-left"
            uk-grid
          >
            <div
              v-for="aritcle in articles"
              :key="aritcle.id"
              class="uk-width-1-1@s uk-width-1-3@m"
            >
              <a :href="aritcle.url">
                <img
                  src="@image/beauty.jpg"
                  alt="light"
                >
              </a>
              <h2>
                <a :href="aritcle.url">
                  {{ aritcle.title }}
                </a>
              </h2>
            </div>
          </div>
        </template>
      </vms-list>
    </div>
    <footer>
      <div class="uk-container uk-flex uk-flex-between uk-flex-middle uk-padding-small">
        <div class="copyright">
          © Copyright 2018-present
          <a href="#">vue-cms</a>
        </div>
        <div class="slogan">
          Hello, vue-cms
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import md from '../../helper/md';
import { MENU_SET, MENU_TOGGLE } from '../../store';
// eslint-disable-next-line
import '@style/theme-default/index.scss';

export default {
  data() {
    return {
      md,
      collapsed: true,
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
<style lang="scss" scoped>
</style>
