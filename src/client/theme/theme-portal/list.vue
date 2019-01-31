<template>
  <div class="theme-portal">
    <vms-header :categories="categories" />
    <div class="uk-container">
      <div v-if="!category.articles.total">nothing</div>
      <ul v-if="category.articles.total">
        <li
          v-for="article in category.articles.items"
          :key="article.id"
        >
          <router-link :to="article.url">{{ article.title }}</router-link>
        </li>
      </ul>
      <el-pagination
        class="uk-margin"
        layout="prev, pager, next"
        :total="category.articles.total"
        :page-size="pagination.num"
        @current-change="pagination.currentChange"
      />
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
import config from '../../config';

const { rnames, pagination } = config;

export default {
  components: {
    VmsHeader,
    VmsFooter,
    Vms404,
  },
  data() {
    const me = this;
    return {
      pagination: {
        num: pagination.num,
        currentChange: (currentPage) => {
          me.$router.push({
            name: rnames.list,
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
