<template>
  <header class="uk-container">
    <nav
      class="uk-visible@m"
      uk-navbar
    >
      <div class="uk-navbar-left">
        <i class="fa fa-search" />
        <ul
          v-for="item in categories"
          :key="item.url"
          class="uk-navbar-nav"
        >
          <li v-if="!item.children">
            <router-link :to="item.url">{{ item.title }}</router-link>
          </li>
          <li
            v-if="item.children"
            class="has-children"
          >
            <a href="#">{{ item.title }}</a>
            <div class="uk-navbar-dropdown">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li
                  v-for="child in item.children"
                  :key="child.url"
                >
                  <router-link :to="child.url">{{ child.title }}</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li>
            <div class="social-links uk-flex uk-flex-center">
              <a href="#"><i class="fa fa-github" /></a>
              <a href="#"><i class="fa fa-weibo" /></a>
              <a href="#"><i class="fa fa-twitter" /></a>
              <a href="#"><i class="fa fa-facebook" /></a>
              <a href="#"><i class="fa fa-weixin" /></a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <nav
      class="uk-hidden@m"
      uk-navbar
    >
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="social-links">
            <div class="uk-flex uk-flex-center">
              <a href="#"><i class="fa fa-github" /></a>
              <a href="#"><i class="fa fa-weibo" /></a>
              <a href="#"><i class="fa fa-twitter" /></a>
              <a href="#"><i class="fa fa-facebook" /></a>
              <a href="#"><i class="fa fa-weixin" /></a>
            </div>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <a
          uk-navbar-toggle-icon
          @click="toggleMenu"
        />
      </div>
    </nav>
    <div
      id="offcanvas-nav"
      uk-offcanvas="mode: slide; overlay: true"
    >
      <div class="uk-offcanvas-bar">
        <ul
          v-for="item in categories"
          class="uk-nav uk-nav-default"
          :class="{'uk-margin-top': item.children }"
        >
          <li
            v-if="!item.children"
            :key="item.url"
          >
            <router-link
              :to="item.url"
            >
              <span
                class="uk-margin-small-right"
                :uk-icon="`icon: ${item.icon}`"
              />
              {{ item.title }}
            </router-link>
          </li>
          <li
            v-if="item.children"
            class="uk-nav-header"
          >{{ item.title }}</li>
          <li
            v-for="child in item.children"
            :key="child.url"
            v-if="item.children"
          >
            <router-link :to="item.url">
              <span
                class="uk-margin-small-right"
                :uk-icon="`icon: ${child.icon}`"
              />
              {{ child.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import { MENU_SET, MENU_TOGGLE } from '../../store';

export default {
  props: {
    categories: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
    };
  },
  async mounted() {
    const uk = await import('uikit');
    this.$store.dispatch(MENU_SET, uk.offcanvas('#offcanvas-nav'));
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch(MENU_TOGGLE);
    },
  },
};
</script>
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

  }
</style>
