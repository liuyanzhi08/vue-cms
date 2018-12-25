<template>
  <div class="theme-df">
    <component :is="detailTheme" />
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
    };
  },
  async asyncData({ store, route: { params: { id } } }) {
    await store.dispatch(ARTICLE_FETCH, { id });
    await store.dispatch(CATEGORY_FETCH, { id: 4 });

    const { theme } = store.getters.article || { theme: 'default' };
    let themeComponent;
    try {
      themeComponent = (await import(`../../../theme/${theme}/detail.vue`)).default;
    } catch (e) {
      themeComponent = (await import('../../../theme/default/detail.vue')).default;
    }
    Vue.component(theme, themeComponent);
    store.dispatch(THEME_SET, { detail: theme });
  },
  computed: {
    ...mapGetters(['article', 'articles', 'detailTheme']),
  },
};
</script>
<style lang="scss" src="@style/theme-default/index.scss"></style>
