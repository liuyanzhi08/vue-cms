<template>
  <div class="theme-portal">
    <vms-header :categories="categories" />
    <div class="uk-container uk-flex uk-flex-left">
      <div class="uk-width-2-3@m uk-width-1-1@s">
        <article
          v-for="category in categories"
          :key="category.id"
          class="uk-padding uk-padding-remove-left uk-padding-remove-right uk-margin-remove-top"
          uk-grid
        >
          <router-link
            v-if="category.articles[0]"
            class="uk-width-1-1@s uk-width-1-2@m uk-padding-remove-left"
            :to="category.articles[0].url"
          >
            <img
              src="@image/beauty.jpg"
              alt="light"
            >
          </router-link>
          <div
            v-if="category.articles[0]"
            class="uk-width-1-1@s uk-width-1-2@m"
          >
            <div class="category">
              <router-link :to="category.url">
                {{ category.title }}
              </router-link>
            </div>
            <h2 class="uk-margin-small">
              <router-link :to="category.articles[0].url">
                {{ category.articles[0].title }}
              </router-link>
            </h2>
            <div class="info uk-margin-small">Allen · October 39.2018 · 11 Comment</div>
            <div
              class="overview uk-margin"
              v-html="category.articles[0].summary || 'no summary'"
            />
          </div>
        </article>
      </div>
      <div class="uk-width-1-3@m uk-width-1-1@s sidebar">
        <h2>recent posts</h2>
        <ul>
          <li
            v-for="article in recentArticles"
            :key="article.id"
          >
            <router-link :to="article.url">
              {{ article.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <vms-footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { CATEGORY_FETCH, ARTICLE_RECENT } from '../../store';
import md from '../../helper/md';
import VmsHeader from './header';
import VmsFooter from './footer';

export default {
  components: {
    VmsHeader,
    VmsFooter,
  },
  data() {
    return {
      collapsed: true,
      md,
    };
  },
  async asyncData({ store }) {
    const promises = [
      store.dispatch(CATEGORY_FETCH, { id: 2, article: '0,1' }),
      store.dispatch(CATEGORY_FETCH, { id: 3, article: '0,1', depth: 2 }),
      store.dispatch(CATEGORY_FETCH, { id: 4, article: '0,1' }),
      store.dispatch(ARTICLE_RECENT, { limit: '0,4' }),
    ];
    await Promise.all(promises);
  },
  computed: {
    categories() {
      return [
        this.$store.getters.categories[2],
        this.$store.getters.categories[3],
        this.$store.getters.categories[4],
      ];
    },
    ...mapGetters(['recentArticles']),
  },
  methods: {
  },
};
</script>
<style lang="scss" src="@style/theme-portal/index.scss"></style>
