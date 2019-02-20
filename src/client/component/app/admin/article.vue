<template>
  <form @submit.prevent="submit">
    <div class="uk-margin">
      <input
        v-model="article.title"
        type="text"
        placeholder="title"
        class="uk-input"
      >
    </div>
    <div class="uk-margin">
      <app-category-option v-model="article.category_id" />
    </div>
    <div class="uk-margin uk-flex">
      <div uk-form-custom>
        <input
          ref="coverImage"
          type="file"
          @change="uploadCoverImage"
        >
        <button class="uk-button uk-button-default">Select Cover Image</button>
      </div>
      <no-ssr>
        <viewer
          :images="coverImages"
          class="uk-margin-left"
        >
          <img
            v-for="src in coverImages"
            :key="src"
            :src="src"
            width="40"
            height="40"
            alt="cover image"
          >
        </viewer>
      </no-ssr>
    </div>
    <div class="uk-margin">
      <no-ssr>
        <mavon-editor
          v-if="isClient"
          ref="md"
          v-model="article.content"
          :toolbars="editor.toolbars"
          :box-shadow="editor.boxShadow"
          :placeholder="editor.placeholder"
          @imgAdd="editor.imgAdd"
        />
      </no-ssr>
    </div>
    <div
      v-show="isShowAdvanced"
      class="uk-margin"
    >
      <app-theme-option v-model="article.theme" />
    </div>
    <div class="uk-margin">
      <a @click="showAdvanced">
        advanced setting
      </a>
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
          ><span uk-icon="icon: triangle-down" /></button>
          <div uk-dropdown="mode: click">
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
import NoSsr from 'vue-no-ssr';
import AppCategoryOption from './category-option';
import AppThemeOption from './theme-option';
import { NOTICE_SEND } from '../../../store';
import config from '../../../config';

const { db } = config;

let isNew = true;

export default {
  components: {
    AppCategoryOption,
    AppThemeOption,
    NoSsr,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: Number,
      default: db.rootId,
    },
  },
  data() {
    const me = this;
    return {
      article: {},
      imgUploadPromises: [],
      submitReady: true,
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
        placeholder: 'start writing...',
        imgAdd: async (pos, file) => {
          const data = new FormData();
          data.append('file', file);
          const uploaded = me.$store.getters.Common.upload(data);
          uploaded.then(res => me.$refs.md.$img2Url(pos, res.data.url));
          me.imgUploadPromises.push(uploaded);
          me.submitReady = false;
          Promise.all(me.imgUploadPromises).then(() => {
            me.submitReady = true;
          });
        },
      },
      isShowAdvanced: false,
      coverImages: [],
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
    submit() {
      if (!this.submitReady) {
        this.$store.dispatch(NOTICE_SEND, 'please wait for images are all uploaded');
        return;
      }
      const { Article } = this.$store.getters;
      const method = isNew ? 'save' : 'update';
      Article[method](this.article).then((res) => {
        this.$store.dispatch(NOTICE_SEND, 'updated');
        this.$emit('updated', res.data);
        if (isNew) {
          this.article = {};
        }
      });
    },
    del() {
      const { Article } = this.$store.getters;
      Article.del(this.article).then((res) => {
        this.$store.dispatch(NOTICE_SEND, 'deleted');
        this.$emit('deleted', res.data);
        this.article = {};
      });
    },
    setForm() {
      const { Article } = this.$store.getters;
      const id = this.id || this.$route.params.id;
      if (id) {
        Article
          .get(id)
          .then((res) => {
            this.article = res.data;
            this.article.created_at = new Date(this.article.created_at);
            isNew = false;
          });
      } else {
        isNew = true;
        this.article = {
          category_id: this.categoryId,
        };
      }
    },
    showAdvanced() {
      this.isShowAdvanced = !this.isShowAdvanced;
    },
    uploadCoverImage() {
      const data = new FormData();
      data.append('file', this.$refs.coverImage.files[0]);
      const uploaded = this.$store.getters.Common.upload(data);
      this.imgUploadPromises.push(uploaded);
      uploaded.then((res) => {
        this.coverImages = [res.data.url];
      });
    },
  },
};
</script>
<style lang="scss">
  .v-note-help-wrapper .v-note-help-content .v-note-help-show {
    -webkit-overflow-scrolling: touch !important;
  }
</style>
