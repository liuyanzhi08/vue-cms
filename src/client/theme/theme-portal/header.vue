<template>
  <div class="header-wrapper">
    <header class="uk-container">
      <nav
        class="uk-visible@m"
        uk-navbar
      >
        <div class="uk-navbar-left">
          <ul
            class="uk-navbar-nav"
          >
            <li class="has-no-children">
              <router-link :to="index">Home</router-link>
            </li>
            <li
              v-for="item in categories"
              :key="item.id"
              :class="{'has-children': item.children, 'has-no-children': !item.children}"
            >
              <router-link
                v-if="!item.children"
                :to="item.url"
              >{{ item.title }}</router-link>
              <a v-if="item.children">{{ item.title }}</a>
              <div
                v-if="item.children"
                class="uk-navbar-dropdown"
              >
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li
                    v-for="child in item.children"
                    :key="child.id"
                  >
                    <router-link :to="child.url">{{ child.title }}</router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="uk-navbar-right">
          <form @submit.prevent="search">
            <div class="search-input-wrapper">
              <input
                v-model="keyword"
                type="text"
                class="uk-input uk-form-small"
              >
              <i class="fa fa-search" />
            </div>
          </form>
        </div>
      </nav>
      <nav
        class="uk-hidden@m uk-padding-small"
        uk-navbar
      >
        <div class="uk-navbar-left">
          <router-link
            :to="index"
            uk-icon="icon: home"
            class="icon-home"
          />
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
              :key="item.id"
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
              v-if="item.children"
            >
              <router-link :to="child.url">
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import config from '../../config';
import { MENU_SET, MENU_TOGGLE } from '../../store';

const { rnames } = config;

export default {
  props: {
    categories: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      keyword: '',
    };
  },
  computed: {
    ...mapGetters(['index']),
  },
  async mounted() {
    const uk = await import('uikit');
    this.$store.dispatch(MENU_SET, uk.offcanvas('#offcanvas-nav'));
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch(MENU_TOGGLE);
    },
    search() {
      this.$router.push({
        name: rnames.search,
        query: {
          keyword: this.keyword,
        },
      });
    },
  },
};
</script>
<style lang="scss">
  html, body, #app {
    height: 100%;
  }

  .theme-portal {
    min-height: 100%;
    padding-bottom: 54px;
    position: relative;
  }

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

    .search-input-wrapper {
      position: relative;
      input {
        border-radius: 20px;
        padding-right: 30px !important;
      }
      .fa-search {
        position: absolute;
        top: 6px;
        right: -37px;
        color: #ccc;
      }
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
        &.icon-home {
          color: black;
          font-weight: bold;
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

    .header-wrapper {
      border-bottom: 1px solid #eee;
      margin-bottom: 30px;
    }
  }
</style>
