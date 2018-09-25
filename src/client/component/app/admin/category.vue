<template>
  <form @submit.prevent="submit(category)">
    <div class="uk-margin">
      <input
        v-model="category.title"
        type="text"
        placeholder="title"
        class="uk-input"
      >
    </div>
    <div class="uk-margin">
      <textarea
        v-model="category.description"
        placeholder="description"
        class="uk-textarea"
      />
    </div>
    <div class="uk-margin">
      <app-category-tree v-model="category.parent_id" />
    </div>
    <div class="uk-margin">
      <button
        type="submit"
        class="uk-button uk-button-primary"
      >提交</button>
    </div>
  </form>
</template>
<script>
import 'simplemde/dist/simplemde.min.css';
import category from '../../../api/category';
import AppCategoryTree from './category-tree';

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
      default: 0,
    },
  },
  data() {
    console.log(this.parentId);
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
    submit(data) {
      const method = isNew ? 'save' : 'update';
      category[method](data.id, data).then(res => {});
    },
    setForm() {
      // get category info if not new
      const id = this.id || this.$route.params.id;
      if (id) {
        category.get(id)
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
<style lang="scss">
  body {
    transition: all .2s;
  }
</style>
