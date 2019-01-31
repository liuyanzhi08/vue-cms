<template>
  <component :is="searchThemeComponent" />
</template>
<script>
import Vue from 'vue';
import { ARTICLE_SEARCH, THEME_SET } from '../../../store';
import { err } from '../../../helper/logger';
import config from '../../../config';

export default {
  data() {
    return {
      searchThemeComponent: 'vms-search',
    };
  },
  async asyncData({ store, route }) {
    await store.dispatch(ARTICLE_SEARCH, route.query);

    let theme = store.getters.searchTheme;
    if (!theme) {
      const res = await store.getters.Common.get({ id: 1 });
      const data = res.data[0];
      theme = data.search_theme;
      store.dispatch(THEME_SET, { search: theme });
    }
    let themeComponent;
    try {
      themeComponent = (await import(`../../../theme/${theme}/search.vue`)).default;
    } catch (e) {
      const configTheme = config.theme;
      themeComponent = (await import(`../../../theme/${configTheme}/search.vue`)).default;
    }
    if (themeComponent.asyncData) {
      try {
        await themeComponent.asyncData({ store, route });
      } catch (e) {
        err(e);
      }
    }
    Vue.component('vms-search', themeComponent);
  },
};
</script>
