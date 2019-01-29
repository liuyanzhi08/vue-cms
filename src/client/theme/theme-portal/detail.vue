<template>
  <div class="theme-portal">
    <vms-header :categories="categories" />
    <div class="uk-container" >
      <div uk-grid>
        <article v-if="articles[id]" class="uk-width-2-3@m">
          <h1>{{ articles[id].title }}</h1>
          <div
            class="content"
            v-html="md.parse(articles[id].content)"
          />
        </article>
        <div v-if="!articles[id]">
          <vms404 />
        </div>
        <div class="uk-width-1-3@m sidebar">
          <h2>recent posts</h2>
          <ul>
            <li
              v-for="article in recentArticles"
              :key="article.id"
            >
              <router-link :to="article.url">
                {{ article.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <vms-footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import md from '../../helper/md';
import VmsHeader from './header';
import VmsFooter from './footer';
import Vms404 from './404';
import { ARTICLE_RECENT, CATEGORY_FETCH } from '../../store';

export default {
  components: {
    VmsHeader,
    VmsFooter,
    Vms404,
  },
  data() {
    return {
      md,
    };
  },
  async asyncData({ store }) {
    const promises = [
      store.dispatch(CATEGORY_FETCH, { id: 2 }),
      store.dispatch(CATEGORY_FETCH, { id: 3, depth: 1 }),
      store.dispatch(ARTICLE_RECENT, { limit: '0,4' }),
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
    ...mapGetters(['articles', 'recentArticles']),
    id() {
      return this.$store.state.route.params.id;
    },
  },
};
</script>

<style lang="scss">
  .theme-portal {
    font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;

    [class*='uk-navbar-dropdown-bottom'] {
      margin-top: 0;
      padding-top: 15px;
    }

    h1, h2, h3, h4, h5, h6 {
      color: #222;
      font-weight: bold;
      margin: 0;

      > a {
        color: #454545;
        text-decoration: none;
        &:hover {
          color: #666;
          text-decoration: none;
        }
      }
    }

    h2 {
      color: #000;
      font-size: 16px;
      margin-bottom: 15px;
      padding-bottom: 10px;
      text-transform: uppercase;
    }

    nav {
    }

    a {
      img {
        //filter: grayscale(100%);
      }
      &:hover {
        img {
          //filter: grayscale(0);
        }
      }
    }

    .fa-search {
      margin-right: 50px;
    }

    .uk-navbar-nav {
      a {
        font-size: 14px;
        color: black;
        font-weight: bold;
        padding: 0 25px;
        text-transform: uppercase;
        font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
        transition: none;
        &:hover {
          //color: #2196F3;
        }
      }

      > li {
        > a {
          border-top: 3px solid transparent;
          border-bottom: 3px solid transparent;
          &:hover {
            color: black;
          }
        }
        padding: 0 12px;
        &.has-children:hover {
          > a {
            background: black;
            color: white;
          }
        }
        &.has-no-children:hover {
          > a {
            border-bottom-color: black;
          }
        }
      }
    }

    .sidebar {
      padding-left: 30px;
      ul {
        padding: 0;
        li {
          border-bottom: 1px solid #eee;
          list-style: none;
          margin-bottom: 15px;
          padding-bottom: 15px;
          position: relative;
          a {
            color: black;
            &:hover {
              color: #0091cd;
              text-decoration: none;
            }
          }
        }
      }
      h2 {
        border-bottom: 1px solid #eee;
      }
    }

    article {
      h1 {
        font-size: 30px;
        line-height: 1.25;
        margin-bottom: 30px;
      }
    }
  }
</style>
