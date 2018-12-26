<template>
  <div class="theme-df">
    <component :is="indexTheme" />
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { THEME_SET } from '../../../store';

export default {
  components: {
  },
  data() {
    return {
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
    Vue.component(theme, themeComponent);
  },
  computed: {
    ...mapGetters(['indexTheme']),
  },
};
</script>
<style lang="scss" src="@style/theme-default/index.scss"></style>
