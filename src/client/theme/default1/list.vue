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
import { CATEGORY_FETCH } from '../../store';
import VmsHeader from './header';
import VmsFooter from './footer';
import Vms404 from './404';

export default {
  components: {
    VmsHeader,
    VmsFooter,
    Vms404,
  },
  asyncData({ store, route: { params: { id } } }) {
    return store.dispatch(CATEGORY_FETCH, { id });
  },
  computed: {
    ...mapGetters([
      'categories',
    ]),
  },
};
</script>
<style lang="scss">
</style>
