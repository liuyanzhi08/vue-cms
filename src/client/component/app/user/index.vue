<template>
  <div class="theme-df">
    <vms-header />
    <div class="uk-container">
      <div>
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
      </div>
      <h3 class="uk-margin-large">Recent Posts …</h3>
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
import { CATEGORY_FETCH } from '../../../store';
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
      collapsed: true,
      md,
    };
  },
  async asyncData({ store }) {
    await store.dispatch(CATEGORY_FETCH, { id: 4 });
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
<style lang="scss" src="@style/theme-default/index.scss"></style>
