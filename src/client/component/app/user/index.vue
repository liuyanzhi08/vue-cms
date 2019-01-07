<template>
  <component :is="detailThemeComponent" />
</template>
<script>
import Vue from 'vue';
import { THEME_SET } from '../../../store';

export default {
  components: {
  },
  data() {
    return {
      detailThemeComponent: 'vms-detail-index',
    };
  },
  async asyncData({ store }) {
    let theme = store.getters.indexTheme;
    if (!theme) {
      const res = await store.getters.Common.get({ id: 1 });
      const data = res.data[0];
      theme = data.theme || 'default';
      store.dispatch(THEME_SET, { index: theme });
    }
    let themeComponent;
    try {
      themeComponent = (await import(`../../../theme/${theme}/index.vue`)).default;
    } catch (e) {
      themeComponent = (await import('../../../theme/default/index.vue')).default;
    }
    Vue.component('vms-detail-index', themeComponent);
  },
};
</script>
<style lang="scss" src="@style/theme-default/index.scss"></style>
