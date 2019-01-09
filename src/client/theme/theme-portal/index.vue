<template>
  <div class="theme-portal">
    <vms-header :categories="categories" />
    <div class="uk-container">
      <div
        uk-grid
        class="uk-flex uk-flex-left"
      >
        <div class="uk-width-2-3@m uk-width-1-1@s">
          <article
            v-for="category in categories"
            :key="category.id"
            uk-grid
          >
            <router-link
              v-if="category.articles[0]"
              class="uk-width-1-1@s uk-width-1-2@m"
              :to="category.articles[0].url"
            >
              <img
                src="@image/beauty.jpg"
                alt="light"
              >
            </router-link>
            <div
              v-if="category.articles[0]"
              class="uk-width-1-1@s uk-width-1-2@m"
            >
              <div class="category">
                <router-link :to="category.url">
                  {{ category.title }}
                </router-link>
              </div>
              <h2 class="uk-margin-small">
                <router-link :to="category.articles[0].url">
                  {{ category.articles[0].title }}
                </router-link>
              </h2>
              <div class="info uk-margin-small">Allen · October 39.2018 · 11 Comment</div>
              <div
                class="overview uk-margin-bottom-large"
                v-html="category.articles[0].summary || 'no summary'"
              />
            </div>
          </article>
        </div>
        <div class="uk-width-1-3@m uk-width-1-1@s sidebar">
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
import { CATEGORY_FETCH, ARTICLE_RECENT } from '../../store';
import md from '../../helper/md';
import VmsHeader from './header';
import VmsFooter from './footer';

export default {
  components: {
    VmsHeader,
    VmsFooter,
  },
  data() {
    return {
      collapsed: true,
      md,
    };
  },
  async asyncData({ store }) {
    const promises = [
      store.dispatch(CATEGORY_FETCH, { id: 2, article: '0,1' }),
      store.dispatch(CATEGORY_FETCH, { id: 3, article: '0,1', depth: 2 }),
      store.dispatch(CATEGORY_FETCH, { id: 4, article: '0,1' }),
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
    ...mapGetters(['recentArticles']),
  },
  methods: {
  },
};
</script>
<style lang="scss">
  @import "../../asset/style/mixins/index.scss";

  .theme-portal {
    $color-blue: #0091cd;

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

    .uk-container {
      article {
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 30px;

        @media (min-width: 1200px) {
          padding-bottom: 40px;
          > a {
            padding-left: 0;
          }
        }

        h2 {
          @include set-max-line(2);
        }
        .category {
          color: $color-blue;
        }
        .info {
          color: #999;
          font-size: 14px;
        }
        .overview {
          @include set-max-line(5);
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
    }
  }
</style>
