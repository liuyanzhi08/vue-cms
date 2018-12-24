<template>
  <div class="uk-padding-small">
    <form
      class="uk-form-stacked"
      @submit.prevent="submit"
    >
      <div class="uk-margin">
        <label class="uk-form-label">theme</label>
        <div class="uk-form-controls">
          <app-theme-option v-model="data.theme" />
        </div>
      </div>
      <div class="uk-margin">
        <div class="uk-button-group">
          <button
            class="uk-button uk-button-primary"
            type="submit"
          >submit</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AppThemeOption from './theme-option';
import { NOTICE_SEND } from '../../../store';
import { db } from '../../../config';

let isNew = true;

export default {
  components: {
    AppThemeOption,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    parentId: {
      type: Number,
      default: db.rootId,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.$store.getters.Common.get({
      id: 1,
    }).then((res) => {
      this.data = res.data && res.data.length && res.data[0];
    });
  },
  mounted() {
  },
  methods: {
    submit() {
      this.$store.getters.Common.update(this.data).then(() => {
        this.$store.dispatch(NOTICE_SEND, 'updated');
      });
    },
    del() {
      const { Category } = this.$store.getters;
      Category.del(this.category).then((res) => {
        this.$store.dispatch(NOTICE_SEND, 'deleted');
        this.$emit('deleted', res.data);
        this.category = {};
      });
    },
    setForm() {
      const { Category } = this.$store.getters;
      // get category info if not new
      const id = this.id || this.$route.params.id;
      if (id) {
        Category.get(id)
          .then((res) => {
            this.category = res.data;
            isNew = false;
          });
      } else {
        isNew = true;
        this.category = {
          parent_id: this.parentId,
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
