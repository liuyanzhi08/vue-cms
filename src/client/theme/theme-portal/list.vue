<template>
  <div class="theme-portal">
    <vms-header :categories="categories" />
    <div class="uk-container">
      <ul>
        <li
          v-for="article in category.articles"
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
  async asyncData({ store }) {
    const promises = [
      store.dispatch(CATEGORY_FETCH, { id: 2 }),
      store.dispatch(CATEGORY_FETCH, { id: 3, depth: 1 }),
    ];
    await Promise.all(promises);
  },
  computed: {
    categories() {
      return [
        this.$store.getters.categories[2],
        this.$store.getters.categories[3],
      ];
    },
    category() {
      return this.$store.getters.categories[this.id];
    },
    id() {
      return this.$store.state.route.params.id;
    },
  },
};
</script>
