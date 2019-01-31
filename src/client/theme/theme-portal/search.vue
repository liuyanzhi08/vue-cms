<template>
  <div class="theme-portal">
    <vms-header :categories="categories" />
    <div class="uk-container">
      <ul>
        <li
          v-for="article in searchArticles"
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

export default {
  components: {
    VmsHeader,
    VmsFooter,
  },
  async asyncData({ store }) {
    const promises = [
      store.dispatch(CATEGORY_FETCH, { id: 2, article: '0,1' }),
      store.dispatch(CATEGORY_FETCH, { id: 3, article: '0,1', depth: 1 }),
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
    ...mapGetters(['searchArticles']),
  },
};
</script>

<style lang="scss" scoped>
  ul {
    li {
      list-style: square;
      a {
        color: #454545;
        &:hover {
          color: #666;
        }
      }
    }
  }
</style>
