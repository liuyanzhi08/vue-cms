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
      <mavon-editor
        v-model="article.content"
        :toolbars="editor.toolbars"
        :box-shadow="editor.boxShadow"
      />
    </div>
    <div class="uk-margin">
      <button
        type="submit"
        class="uk-button uk-button-primary"
      >submit</button>
    </div>
  </form>
</template>
<script>
import Article from '../../../api/article';
import AppCategoryTree from './category-tree';
import { NOTICE_SEND } from '../../../store';

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
    categoryId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      article: {},
      editor: {
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: false, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        boxShadow: false,
      },
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
  },
  methods: {
    submit(inputData) {
      const method = isNew ? 'save' : 'update';
      const data = inputData;
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
            this.article.created_time = new Date(this.article.created_time);
            isNew = false;
          });
      } else {
        isNew = true;
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
