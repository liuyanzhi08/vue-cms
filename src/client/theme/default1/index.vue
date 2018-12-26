<template>
  <div class="theme-portal">
    <vms-header />
    <div class="uk-container">
      <div
        class="uk-flex uk-flex-left"
        uk-grid
      >
        <div
          v-for="aritcle in articles"
          :key="aritcle.id"
          class="uk-width-1-1@s uk-width-1-3@m"
        >
          <router-link :to="aritcle.url">
            <img
              src="@image/beauty.jpg"
              alt="light"
            >
          </router-link>
        </div>
        <div class="uk-width-1-1@s uk-width-1-3@m">
          <div class="category-name">Fashion</div>
          <h2>
            <a>
              long title...
            </a>
          </h2>
          <div class="info">Allen · October 39.2018 · 11 Comment</div>
          <div class="overview">This is an example of a WordPress post,
          you could edit this to put information about yourself or your
          site so readers know where you are coming from. You can…</div>
        </div>
      </div>
    </div>
    <vms-footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { CATEGORY_FETCH } from '../../store';
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
    const promises = [];
    promises.push(store.dispatch(CATEGORY_FETCH, { id: 4 }));
    promises.push(store.dispatch(CATEGORY_FETCH, { id: 1 }));
    await Promise.all(promises);
  },
  computed: {
    ...mapGetters(['articles']),
    article() {
      return this.articles[0];
    },
  },
  methods: {
  },
};
</script>
<style lang="scss" src="@style/theme-portal/index.scss"></style>
