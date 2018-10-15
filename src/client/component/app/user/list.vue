<template>
  <div class="theme-df">
    <vms-header />
    <div class="uk-container">
      test
    </div>
    <vms-footer />
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
