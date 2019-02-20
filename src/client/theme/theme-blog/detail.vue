<template>
  <div class="theme-blog">
    <vms-header :categories="categories" />
    <div class="uk-container">
      <article v-if="articles[id]">
        <h1>{{ articles[id].title }} {{  id }}</h1>
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
          v-for="aritcle in recentArticles"
          :key="aritcle.id"
          class="uk-width-1-1@s uk-width-1-3@m"
        >
          <a :href="aritcle.url">
            <img
              :src="aritcle.image_url"
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
import { ARTICLE_RECENT, CATEGORY_FETCH } from '../../store';

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
    const promises = [
      store.dispatch(CATEGORY_FETCH, { id: 2 }),
      store.dispatch(CATEGORY_FETCH, { id: 3, depth: 1 }),
      store.dispatch(ARTICLE_RECENT, { limit: '0,3' }),
    ];
    await Promise.all(promises);
  },
  computed: {
    categories() {
      return [
        this.$store.getters.categories[2],
        this.$store.getters.categories[3],
      ];
    },
    id() {
      return this.$router.currentRoute.params.id;
    },
    ...mapGetters(['articles', 'recentArticles']),
  },
};
</script>
<style lang="scss">
  .theme-blog {
    article {
      position: relative;

      h1 {
        font-size: 36px;
        line-height: 1.1em;
        margin: 50px 0;
        @media(max-width: 640px) {
          margin: 20px 0;
        }
      }

      .content {
        font: 400 16px "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Helvetica, Arial, sans-serif;
        line-height: 1.5em;
        color: #454545;
        background: #fff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
  }
</style>
