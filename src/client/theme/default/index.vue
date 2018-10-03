<template>
  <div class="theme-df">
    <div class="uk-container">
      <nav>
        <div class="uk-navbar-left">
          <i class="fa fa-search" />

          <ul class="uk-navbar-nav">
            <li><a href="#">home</a></li>
            <li class="uk-active"><a href="#">about</a></li>
            <li class="has-children">
              <a href="#">Parent</a>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li><a href="#">Active</a></li>
                  <li><a href="#">Item</a></li>
                  <li><a href="#">Item</a></li>
                </ul>
              </div>
            </li>
            <li><a href="#">Item</a></li>
          </ul>

        </div>
      </nav>
      <div>
        <vms-list
          cid="2"
          limit="0, 1"
        >
          <template
            slot-scope="{ article }"
          >
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
                  class="uk-flex uk-flex-column slide-top"
                  @click="collapsed = !collapsed"
                >
                  <span uk-icon="icon: chevron-down" />
                  <span uk-icon="icon: chevron-down" />
                </div>
              </div>
            </article>
          </template>
        </vms-list>
      </div>
    </div>
  </div>
</template>
<script>
import md from '../../helper/md';
// eslint-disable-next-line
import '@style/theme-default/index.scss';

export default {
  data() {
    return {
      md,
      collapsed: true,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
