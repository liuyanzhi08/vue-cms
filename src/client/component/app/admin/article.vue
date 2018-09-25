<template>
  <form @submit.prevent="submit(article)">
    <div class="uk-margin">
      <input
        v-model="article.title"
        type="text"
        placeholder="title"
        class="uk-input"
      >
    </div>
    <div class="uk-margin">
      <app-category-tree v-model="article.category_id" />
    </div>
    <div class="uk-margin">
      <textarea
        v-model="article.content"
        placeholder="content"
        class="uk-textarea"
      />
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
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import Article from '../../../api/article';
import AppCategoryTree from './category-tree';
import { NOTICE_SEND } from '../../../store';

let isNew = true;
let simplemde;

export default {
  components: {
    AppCategoryTree,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      article: {},
    };
  },
  watch: {
    id: {
      handler() {
        this.setForm();
      },
      immediate: true,
    },
    categoryId: {
      handler() {
        this.setForm();
      },
    },
  },
  created() {
    // get article info if not new
  },
  mounted() {
    simplemde = new SimpleMDE();
  },
  methods: {
    submit(inputData) {
      const method = isNew ? 'save' : 'update';
      const data = inputData;
      data.content = simplemde.value();
      Article[method](data).then(() => {
        this.$store.dispatch(NOTICE_SEND, 'updated');
      });
    },
    setForm() {
      const id = this.id || this.$route.params.id;
      if (id) {
        Article
          .get(id)
          .then((res) => {
            this.article = res.data;
            this.article.create_time = new Date(this.article.create_time);
            isNew = false;
            simplemde.value(res.data.content);
          });
      } else {
        isNew = true;
        if (simplemde) {
          simplemde.value('');
        }
        this.article = {
          category_id: this.categoryId,
        };
      }
    },
  },
};
</script>
<style lang="scss">
</style>
