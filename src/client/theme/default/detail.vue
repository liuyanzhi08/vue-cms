<template>
  <div class="theme-df">
    <vms-header />
    <div class="uk-container">
      <article v-if="article">
        <h1>{{ article.title }}</h1>
        <div
          class="content"
          v-html="md.parse(article.content)"
        />
      </article>
      <div v-if="!article">
        <vms404 />
      </div>
      <h3 class="uk-margin-large">Recent Posts …</h3>
      <div
        class="uk-flex uk-flex-left"
        uk-grid
      >
        <!--<div-->
          <!--v-for="aritcle in articles"-->
          <!--:key="aritcle.id"-->
          <!--class="uk-width-1-1@s uk-width-1-3@m"-->
        <!--&gt;-->
          <!--<a :href="aritcle.url">-->
            <!--<img-->
              <!--src="@image/beauty.jpg"-->
              <!--alt="light"-->
            <!--&gt;-->
          <!--</a>-->
          <!--<h2>-->
            <!--<a :href="aritcle.url">-->
              <!--{{ aritcle.title }}-->
            <!--</a>-->
          <!--</h2>-->
        <!--</div>-->
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
  computed: {
    ...mapGetters(['article']),
  },
};
</script>
<style lang="scss" src="@style/theme-default/index.scss"></style>
