<template>
  <div class="theme-portal">
    <vms-header />
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
            <div class="category">Fashion</div>
            <h2 class="uk-margin-small">
              <router-link :to="category.articles[0].url">
                {{ category.articles[0].title }}
              </router-link>
            </h2>
            <div class="info uk-margin-small">Allen · October 39.2018 · 11 Comment</div>
            <div class="overview uk-margin">{{ category.articles[0].content }}</div>
          </div>
        </article>
      </div>
      <div class="uk-width-1-3@m uk-width-1-1@s">test</div>
    </div>
    <vms-footer />
  </div>
</template>
<script>
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
    promises.push(store.dispatch(CATEGORY_FETCH, { id: 2 }));
    promises.push(store.dispatch(CATEGORY_FETCH, { id: 3 }));
    promises.push(store.dispatch(CATEGORY_FETCH, { id: 4 }));
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
  },
  methods: {
  },
};
</script>
<style lang="scss" src="@style/theme-portal/index.scss"></style>
