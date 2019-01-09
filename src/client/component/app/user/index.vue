<template>
  <component :is="detailThemeComponent" />
</template>
<script>
import Vue from 'vue';
import { THEME_SET } from '../../../store';
import { err } from '../../../helper/logger';
import config from '../../../config';

export default {
  components: {
  },
  data() {
    return {
      detailThemeComponent: 'vms-detail-index',
    };
  },
  async asyncData({ store, route }) {
    let theme = store.getters.indexTheme;
    if (!theme) {
      const res = await store.getters.Common.get({ id: 1 });
      const data = res.data[0];
      ({ theme } = data);
      store.dispatch(THEME_SET, { index: theme });
    }
    let themeComponent;
    try {
      themeComponent = (await import(`../../../theme/${theme}/index.vue`)).default;
    } catch (e) {
      const configTheme = config.theme;
      themeComponent = (await import(`../../../theme/${configTheme}/index.vue`)).default;
    }
    if (themeComponent.asyncData) {
      try {
        await themeComponent.asyncData({ store, route });
      } catch (e) {
        err(e);
      }
    }
    Vue.component('vms-detail-index', themeComponent);
  },
};
</script>
