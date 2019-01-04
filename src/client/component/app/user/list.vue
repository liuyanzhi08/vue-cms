<template>
  <component :is="listThemeComponent" />
</template>
<script>
import Vue from 'vue';
import { CATEGORY_FETCH, THEME_SET } from '../../../store';

export default {
  async asyncData({ store, route: { params: { id } } }) {
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
    Vue.component(`vms-list-${id}`, themeComponent);
  },
  computed: {
    listThemeComponent() {
      return `vms-list-${this.$router.currentRoute.params.id}`;
    },
  },
};
</script>
<style lang="scss">
</style>
