<template>
  <form @submit.prevent="submit">
    <div class="uk-margin">
      <input
        v-model="category.title"
        type="text"
        placeholder="title"
        class="uk-input"
      >
    </div>
    <div class="uk-margin">
      <app-category-tree v-model="category.parent_id" />
    </div>
    <div class="uk-margin">
      <textarea
        v-model="category.description"
        placeholder="description"
        class="uk-textarea"
      />
    </div>
    <div class="uk-margin">
      <div class="uk-button-group">
        <button
          class="uk-button uk-button-primary"
          type="submit"
        >submit</button>
        <div class="uk-inline">
          <button
            class="uk-button uk-button-default"
            type="button"
          ><span uk-icon="icon:  triangle-down" /></button>
          <div uk-dropdown="mode: click; animation: uk-animation-slide-top-small; duration: 200">
            <ul class="uk-nav uk-dropdown-nav">
              <li @click="del"><a href="#">delete</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import AppCategoryTree from './category-tree';
import { NOTICE_SEND } from '../../../store';
import { db } from '../../../config';

let isNew = true;

export default {
  components: {
    AppCategoryTree,
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
      category: { parent_id: this.parentId },
    };
  },
  watch: {
    id: {
      handler() {
        this.setForm();
      },
      immediate: true,
    },
    parentId: {
      handler() {
        this.setForm();
      },
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    submit() {
      const method = isNew ? 'save' : 'update';
      this.$store.getters.Category[method](this.category).then((res) => {
        this.$store.dispatch(NOTICE_SEND, 'updated');
        this.$emit('updated', res.data);
        if (isNew) {
          this.category = {};
        }
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
