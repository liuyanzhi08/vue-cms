<template>
  <div class="theme-portal">
    <vms-header />
    <div class="uk-container">
      <ul>
        <li
          v-for="article in categories[id].articles"
          :key="article.id"
        >
          <router-link :to="article.url">{{ article.title }}</router-link>
        </li>
      </ul>
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
  computed: {
    ...mapGetters([
      'categories',
    ]),
    id() {
      return this.$router.currentRoute.params.id;
    },
  },
};
</script>
<style lang="scss" src="@style/theme-portal/index.scss"></style>
