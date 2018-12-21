<template>
  <div class="theme-df">
    <component :is="theme" />
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { ARTICLE_FETCH, CATEGORY_FETCH, THEME_SET } from '../../../store';
import md from '../../../helper/md';

export default {
  components: {
  },
  data() {
    return {
      md,
      test: null,
    };
  },
  async asyncData({ store, route: { params: { id } } }) {
    await store.dispatch(ARTICLE_FETCH, { id });
    await store.dispatch(CATEGORY_FETCH, { id: 4 });
    const { theme } = store.getters.article;
    let themeTpl;
    try {
      themeTpl = (await import(`../../../theme/${theme}/detail.vue`)).default;
    } catch (e) {
      themeTpl = (await import('../../../theme/default/detail.vue')).default;
    }
    Vue.component(theme, themeTpl);
    store.dispatch(THEME_SET, theme);
  },
  computed: {
    ...mapGetters(['article', 'articles', 'theme']),
  },
};
</script>
<style lang="scss" src="@style/theme-default/index.scss"></style>
