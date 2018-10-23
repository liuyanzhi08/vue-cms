<template>
  <div class="theme-df">
    <vms-header />
    <div class="uk-container">
      <article>
        <h1>{{ article.title }}</h1>
        <div
          class="content"
          v-html="md.parse(article.content)"
        />
      </article>
      <h3 class="uk-margin-large">Related Posts …</h3>
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
    </div>
    <vms-footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { ARTICLE_FETCH, CATEGORY_FETCH } from '../../../store';
import md from '../../../helper/md';
import VmsHeader from './header';
import VmsFooter from './footer';

export default {
  components: {
    VmsHeader,
    VmsFooter,
  },
  data() {
    return {
      md,
    };
  },
  async asyncData({ store, route: { params: { id } } }) {
    await store.dispatch(ARTICLE_FETCH, { id });
    await store.dispatch(CATEGORY_FETCH, { id: 4 });
  },
  computed: {
    ...mapGetters(['article', 'articles']),
  },
};
</script>
<style lang="scss" src="@style/theme-default/index.scss"></style>
