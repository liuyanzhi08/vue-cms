<template>
  <component :is="listThemeComponent" />
</template>
<script>
import Vue from 'vue';
import { CATEGORY_FETCH, THEME_SET } from '../../../store';
import { err } from '../../../helper/logger';

export default {
  async asyncData({ store, route }) {
    const { id } = route.params;
    await store.dispatch(CATEGORY_FETCH, { id, article: '0,-1' });

    let theme = store.getters.listTheme[id];
    if (!theme) {
      theme = store.getters.categories[id].theme || 'default';
      store.dispatch(THEME_SET, { list: { [id]: theme } });
    }
    let themeComponent;
    try {
      themeComponent = (await import(`../../../theme/${theme}/list.vue`)).default;
    } catch (e) {
      themeComponent = (await import('../../../theme/default/list.vue')).default;
    }
    if (themeComponent.asyncData) {
      try {
        await themeComponent.asyncData({ store, route });
      } catch (e) {
        err(e);
      }
    }
    Vue.component(`vms-list-${id}`, themeComponent);
  },
  computed: {
    listThemeComponent() {
      return `vms-list-${this.$store.state.route.params.id}`;
    },
  },
};
</script>
<style lang="scss">
</style>
