<template>
  <div class="theme-blog">
    <vms-header />
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
          v-for="arc in categories[4].articles"
          :key="arc.id"
          class="uk-width-1-1@s uk-width-1-3@m"
        >
          <router-link :to="arc.url">
            <img
              src="@image/beauty.jpg"
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
import { CATEGORY_FETCH } from '../../store';
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
    await store.dispatch(CATEGORY_FETCH, { id: 4 });
  },
  computed: {
    ...mapGetters(['categories']),
    article() {
      return this.categories[4].articles[0];
    },
  },
  methods: {
  },
};
</script>
<!--<style lang="scss" src="@style/theme-blog/index.scss"></style>-->
<style lang="scss">
  // front-end default theme
  @import "../../asset/style/mixins/index.scss";

  .theme-blog {
    h1, h2, h3, h4, h5, h6 {
      font-family: "Oswald",sans-serif;
      font-weight: 400;
      font-style: normal;
      margin: 13.5px 0;
      color: #454545;

      > a {
        color: #454545;
        text-decoration: none;
        &:hover {
          color: #2196F3;
        }
      }
    }

    h2 {
      font-size: 20px;
    }

    nav {
      padding: 18px 0;
    }

    a {
      @include transition();
      img {
        //filter: grayscale(100%);
        @include transition();
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
        color: #454545;
        font-family: "Crimson Text",serif;
        &:hover {
          color: #2196F3;
        }
      }

      > li {
        padding: 0 12px;

        > a {
          min-height: auto;
          height: 28px;
          padding: 0;
          border-bottom: 1px solid transparent;
          &:hover {
            border-bottom: 1px solid #2196F3;
          }
        }

        > .uk-navbar-dropdown {
          margin-top: 0;
          padding: 0;
          box-shadow: 0 0 4px rgba(0,0,0,0.09);
          > ul {
            padding: 0;
            > li {
              margin: 0;
              padding: 0;
              > a {
                line-height: 20px;
                min-width: 170px;
                margin: 0;
                padding: 10px;
                border-top: 1px solid #f4f4f4;
              }
            }
          }
        }

        &.uk-active {
          > a {
            color: #2196F3;
            border-bottom: 1px solid #2196F3;
          }
        }

        &.has-children {
          position: relative;
          padding-right: 20px;
          &:after {
            font: normal normal normal 14px/1 FontAwesome;
            font-size: inherit;
            font-size: 14px;
            position: absolute;
            top: 7px;
            right: 5px;
            display: inline-block;
            content: "\f107";
            transform: translate(0, 0);
            text-rendering: auto;
          }
          &:hover {
            > a {
              border-bottom: 1px solid transparent;
            }
            > .uk-navbar-dropdown {
              display: block;
            }
          }
          &:hover:after {
            content: "\f106";
          }
        }
      }

      .social-links {
        padding: 0;
        margin-left: -4px;
        a {
          font-size: 16px;
          line-height: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35px;
          height: 35px;
          margin: 0 5px;
          text-align: center;
          color: #fff;
          border-radius: 50%;
          //background-image: radial-gradient( rgba(0,0,0, 1), rgba(255,255,255, 0));
          background: #555;
          text-decoration: none;
          //box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, .2);
          &:hover {
            color: #fff;
            background-color: #2196F3;
          }
        }
      }
    }

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
    footer {
      font-size: 16px;
      font-family: "Crimson Text", serif;
      background-color: #f5f5f5;

      .slogan {
        font-family: "Oswald",sans-serif;
      }
    }
  }
</style>
