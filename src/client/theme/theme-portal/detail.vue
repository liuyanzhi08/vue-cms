<template>
  <div class="theme-portal">
    <vms-header />
    <div class="uk-container">
      <article v-if="articles[id]">
        <h1>{{ articles[id].title }}</h1>
        <div
          class="content"
          v-html="md.parse(articles[id].content)"
        />
      </article>
      <div v-if="!articles[id]">
        <vms404 />
      </div>
      <h3 class="uk-margin-large">Recent Posts …</h3>
      <div
        class="uk-flex uk-flex-left"
        uk-grid
      >
        <div
          v-for="article in recentArticles"
          :key="article.id"
          class="uk-width-1-1@s uk-width-1-3@m"
        >
          <router-link :to="article.url">
            <img
              src="@image/beauty.jpg"
              alt="light"
            >
          </router-link>
          <h2>
            <router-link :to="article.url">
              {{ article.title }}
            </router-link>
          </h2>
        </div>
      </div>
    </div>
    <vms-footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import md from '../../helper/md';
import VmsHeader from './header';
import VmsFooter from './footer';
import Vms404 from './404';
import { ARTICLE_RECENT } from '../../store';

export default {
  components: {
    VmsHeader,
    VmsFooter,
    Vms404,
  },
  data() {
    return {
      md,
    };
  },
  async asyncData({ store }) {
    const promises = [];
    promises.push(store.dispatch(ARTICLE_RECENT));
    await Promise.all(promises);
  },
  computed: {
    ...mapGetters(['articles', 'recentArticles']),
    id() {
      return this.$router.currentRoute.params.id;
    },
  },
};
</script>
<style lang="scss" src="@style/theme-portal/index.scss"></style>
