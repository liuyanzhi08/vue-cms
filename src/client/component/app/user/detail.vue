<template>
  <component :is="detailThemeComponent" />
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { ARTICLE_FETCH, THEME_SET } from '../../../store';
import md from '../../../helper/md';

export default {
  components: {
  },
  data() {
    return {
      md,
    };
  },
  async asyncData({ store, route: { params: { id } } }) {
    await store.dispatch(ARTICLE_FETCH, { id });

    let theme = store.getters.detailTheme[id];
    if (!theme) {
      theme = store.getters.article.theme || 'default';
      store.dispatch(THEME_SET, { detail: { [id]: theme } });
    }
    let themeComponent;
    try {
      themeComponent = (await import(`../../../theme/${theme}/detail.vue`)).default;
    } catch (e) {
      themeComponent = (await import('../../../theme/default/detail.vue')).default;
    }
    Vue.component(`vms-detail-${id}`, themeComponent);
  },
  computed: {
    ...mapGetters(['article', 'detailTheme']),
    detailThemeComponent() {
      return `vms-detail-${this.$router.currentRoute.params.id}`;
    },
  },
};
</script>
<style lang="scss" src="@style/theme-default/index.scss"></style>
