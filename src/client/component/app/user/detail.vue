<template>
  <component :is="detailThemeComponent" />
</template>
<script>
import Vue from 'vue';
import { ARTICLE_FETCH, THEME_SET } from '../../../store';
import { err } from '../../../helper/logger';
import md from '../../../helper/md';
import config from '../../../config';

export default {
  components: {
  },
  data() {
    return {
      md,
    };
  },
  async asyncData({ store, route }) {
    const { id } = route.params;
    await store.dispatch(ARTICLE_FETCH, { id });

    let theme = store.getters.detailTheme[id];
    if (!theme) {
      theme = store.getters.articles[id].theme || 'default';
      store.dispatch(THEME_SET, { detail: { [id]: theme } });
    }
    let themeComponent;
    try {
      themeComponent = (await import(`../../../theme/${theme}/detail.vue`)).default;
    } catch (e) {
      const configTheme = config.theme;
      themeComponent = (await import(`../../../theme/${configTheme}/detail.vue`)).default;
    }
    if (themeComponent.asyncData) {
      try {
        await themeComponent.asyncData({ store, route });
      } catch (e) {
        err(e);
      }
    }
    Vue.component(`vms-detail-${id}`, themeComponent);
  },
  computed: {
    detailThemeComponent() {
      return `vms-detail-${this.$store.state.route.params.id}`;
    },
  },
};
</script>
