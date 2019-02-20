<template>
  <div class="theme-blog">
    <vms-header :categories="categories" />
    <div class="uk-container">
      <div>
        <article
          v-if="article"
          :class="{ collapsed }"
        >
          <h1>{{ article.title }}</h1>
          <div
            class="content"
            v-html="md.parse(article.content)"
          />
          <div
            v-if="collapsed"
            class="hide-article-box uk-flex uk-flex-center"
          >
            <div
              class="uk-flex uk-flex-column uk-flex-middle  animation-slide-top uk-width-1-1"
              @click="collapsed = !collapsed"
            >
              <span uk-icon="icon: chevron-down" />
              <span uk-icon="icon: chevron-down" />
            </div>
          </div>
        </article>
      </div>
      <h3 class="uk-margin-large">Recent Posts …</h3>
      <div
        class="uk-flex uk-flex-left"
        uk-grid
      >
        <div
          v-for="arc in articles"
          :key="arc.id"
          class="uk-width-1-1@s uk-width-1-3@m"
        >
          <router-link :to="arc.url">
            <img
              :src="arc.image_url"
              alt="light"
            >
          </router-link>
          <h2>
            <a :href="arc.url">
              {{ arc.title }}
            </a>
          </h2>
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
    article() {
      return this.recentArticles && this.recentArticles[0];
    },
    articles() {
      return this.recentArticles && this.recentArticles.slice(1);
    },
    ...mapGetters(['recentArticles']),
  },
  methods: {
  },
};
</script>
<style lang="scss">
  // front-end default theme
  @import "../../asset/style/mixins/index.scss";

  .theme-blog {
    .uk-navbar-toggle-icon {
      //color: #1e87f0;
    }

    article {
      position: relative;

      h1 {
        font-size: 36px;
        line-height: 1.1em;
        margin: 50px 0;
        @media(max-width: 640px) {
          margin: 20px 0;
        }
      }

      .content {
        font: 400 16px "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Helvetica, Arial, sans-serif;
        line-height: 1.5em;
        color: #454545;
        background: #fff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .hide-article-box {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-top: 160px;
        cursor: pointer;
        background-image: linear-gradient(-180deg, rgba(255,255,255,0) 0%, #fff 70%);

        $slide-top-offset: -5px;
        @keyframes animation-slide-top {
          0% {
            transform: translateY($slide-top-offset);
          }
          50% {
            transform: translateY(0);
          }
          100% {
            transform: translateY($slide-top-offset);
          }
        }

        .animation-slide-top {
          animation-name: animation-slide-top;
          animation-duration: 2s;
          animation-iteration-count: infinite;
        }

        .uk-icon:first-child {
          transform: scale(2);
        }

        .uk-icon:last-child {
          transform: scale(2.1) translateY(-3px);
        }
      }

      &.collapsed {
        height: 300px;
        overflow: hidden;
      }
    }
  }
</style>
