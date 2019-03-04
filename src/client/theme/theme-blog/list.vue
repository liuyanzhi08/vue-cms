<template>
  <div class="theme-blog">
    <vms-header :categories="categories" />
    <div class="uk-container">
      --{{ listKey }}
      <div v-if="!category.articles[listKey] || !category.articles[listKey].total">nothing</div>
      <ul v-if="category.articles[listKey] && category.articles[listKey].total">
        <li
          v-for="article in category.articles[listKey].items"
          :key="article.id"
        >
          <router-link :to="article.url">{{ article.title }}</router-link>
        </li>
      </ul>
      <el-pagination
        v-if="category.articles[listKey]"
        class="uk-margin"
        layout="prev, pager, next"
        :total="category.articles[listKey].total"
        :page-size="pagination.num"
        @current-change="pagination.currentChange"
      />
    </div>
    <vms-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { CATEGORY_FETCH, APP_GOTO } from '../../store';
import VmsHeader from './header';
import VmsFooter from './footer';
import config from '../../config';

const { pagination } = config;

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
          me.store.dispatch(APP_GOTO, me.$router, 'list', {
            keyword: me.keyword,
            _page: currentPage,
            _num: pagination.num,
          });
        },
      },
      listKey: null,
    };
  },
  async asyncData({ store }) {
    const promises = [
      store.dispatch(CATEGORY_FETCH, { id: 2 }),
      store.dispatch(CATEGORY_FETCH, { id: 3, depth: 1 }),
    ];
    await Promise.all(promises);
  },
  watch: {
    'state.route.query._page': {
      immedia: true,
      handler() {
        const page = this.$store.state.route.query._page || config.pagination.page;
        const num = this.$store.state.route.query._num || config.pagination.num;
        const from = (page - 1) * num;
        const size = num;
        this.listKey = `${from},${size}`
      },
    },
  },
  computed: {
    ...mapGetters([
      'isPublish',
    ]),
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
