<template>
  <div class="theme-portal">
    <vms-header :categories="categories" />
    <div class="uk-container">
      <div v-if="!searchArticles.total">nothing match "{{ keyword }}"</div>
      <ul v-if="searchArticles.total">
        <li
          v-for="article in searchArticles.items"
          :key="article.id"
        >
          <router-link :to="article.url">{{ article.title }}</router-link>
        </li>
        <el-pagination
          class="uk-margin"
          layout="prev, pager, next"
          :total="searchArticles.total"
          :page-size="pagination.num"
          @current-change="pagination.currentChange"
        />
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
import config from '../../config';

const { pagination, rnames } = config;

export default {
  components: {
    VmsHeader,
    VmsFooter,
  },
  data() {
    const me = this;
    return {
      pagination: {
        num: pagination.num,
        currentChange: (currentPage) => {
          me.$router.push({
            name: rnames.search,
            query: {
              keyword: me.keyword,
              _page: currentPage,
              _num: pagination.num,
            },
          });
        },
      },
    };
  },
  async asyncData({ store }) {
    const promises = [
      store.dispatch(CATEGORY_FETCH, { id: 2, article: '0,1' }),
      store.dispatch(CATEGORY_FETCH, { id: 3, article: '0,1', depth: 1 }),
    ];
    await Promise.all(promises);
  },
  computed: {
    keyword() {
      return this.$store.state.route.query.keyword;
    },
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
