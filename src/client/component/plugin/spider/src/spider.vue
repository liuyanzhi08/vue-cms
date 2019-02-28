<template>
  <div>
    <form @submit.prevent="submit">
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">Target Category</legend>
        <div class="uk-margin">
          <app-category-option v-model="spider.category.id" />
        </div>
      </fieldset>
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">List</legend>
        <div class="uk-margin">
          <input
            v-model="spider.list.url"
            type="text"
            placeholder="url"
            class="uk-input"
          >
        </div>
        <div class="uk-margin">
          <input
            v-model="spider.list.selector"
            type="text"
            placeholder="css selector"
            class="uk-input"
          >
        </div>
      </fieldset>
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">Detail</legend>
        <div class="uk-margin">
          <input
            v-model="spider.detail.selector"
            type="text"
            placeholder="ccs selector"
            class="uk-input"
          >
        </div>
        <div class="uk-margin">
          <app-theme-option v-model="spider.detail.theme" />
        </div>
      </fieldset>
      <div class="uk-margin">
        <div class="uk-button-group">
          <button
            class="uk-button uk-button-primary"
            type="submit"
          >
            <span
              v-if="loading"
              uk-spinner="ratio: 1"
            />
            submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { NOTICE_SEND } from '../../../../store';
import AppCategoryOption from '../../../app/admin/category-option';
import AppThemeOption from '../../../app/admin/theme-option';

export default {
  name: 'VmsPluginSpider',
  components: {
    AppCategoryOption,
    AppThemeOption,
  },
  data() {
    return {
      loading: false,
      spider: {
        category: {},
        list: {},
        detail: {},
      },
    };
  },
  computed: {
    ...mapGetters(['Spider']),
  },
  methods: {
    submit() {
      this.loading = true;
      this.Spider.post(this.spider)
        .then(() => {
          this.$store.dispatch(NOTICE_SEND, 'all articles fetched');
        }, (err) => {
          this.$store.dispatch(NOTICE_SEND, err.response.data.msg);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
