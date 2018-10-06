<template>
  <div>
    <theme-detail />
  </div>
</template>
<script>
import ThemeDetail from '../../../theme/default/detail';
import { ARTICLE_FETCH } from '../../../store';

export default {
  components: {
    ThemeDetail,
  },
  asyncData({ store, route: { params: { id } } }) {
    return store.dispatch(ARTICLE_FETCH, { id });
  },
};
</script>
<style lang="scss">
</style>
