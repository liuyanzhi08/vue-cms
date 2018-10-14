<template>
  <div>
    {{ category }}
    <div
      v-for="article in articles"
      :key="article.id"
    >
      {{ article }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { CATEGORY_FETCH } from '../../../store';

export default {
  asyncData({ store, route: { params: { id } } }) {
    return store.dispatch(CATEGORY_FETCH, { id });
  },
  computed: {
    ...mapGetters([
      'category',
      'articles',
    ]),
  },
};
</script>
<style lang="scss">
</style>
