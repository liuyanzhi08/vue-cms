<template>
  <div>
    <button
      class="uk-button uk-button-secondary uk-width-1-1 uk-hidden@m"
      @click="toggle"
    >
      <span v-if="!expanded">展开目录</span>
      <span v-if="expanded">收起目录</span>
      <span
        v-if="!expanded"
        uk-icon="icon: triangle-down"
      />
      <span
        v-if="expanded"
        uk-icon="icon: triangle-up"
      />
    </button>
    <ui-sidebar>
      <aside
        v-show="expanded"
        slot="side"
      >
        <el-tree
          :props="{ isLeaf: 'isLeaf' }"
          :data="rootCategories"
          :render-content="renderContent"
          :load="load"
          lazy
          @node-click="click"
        />
        <div class="menu root-add ">
          <i
            class="fa fa-plus article"
            @click="addArticle({data: {id: 0}})"
            @dblclick="addCategory({data: {id: 0}})"
          />
        </div>
      </aside>
      <div slot="main">
        <app-article
          v-if="selected.type === 'article'"
          :id="selected.id"
          :category-id="selected.categoryId"
        />
        <app-category
          v-if="selected.type === 'category'"
          :id="selected.id"
          :parent-id="selected.parentId"
        />
      </div>
    </ui-sidebar>
  </div>
</template>
<script>
import _ from 'lodash';
import Article from '../../../api/article';
import Category from '../../../api/category';
import AppArticle from './article';
import AppCategory from './category';

export default {
  components: {
    AppArticle,
    AppCategory,
  },
  data() {
    return {
      rootCategories: [],
      selected: {
        id: null,
        type: 'article',
      },
      expanded: true,
    };
  },
  computed: {
    doneTodosCount() {
      return this.$store.getters.doneTodos;
    },
  },
  created() {
  },
  methods: {
    load(node, resolve) {
      let { data } = node.data;
      if (!data) {
        node.data.data = { id: 0 };
        ({ data } = node.data);
      }
      const nodeId = data.id;
      return Category.query({
        parent_id: nodeId,
      }).then((res) => {
        const subCategories = [];
        _.each(res.data.items, (category) => {
          subCategories.push({
            label: `${category.title} [ id: ${category.id} ]`,
            data: category,
            isLeaf: false,
          });
        });
        return subCategories;
      }).then(subCategories => Article.query({
        category_id: nodeId,
      }).then((res) => {
        const subArticles = [];
        _.each(res.data.items, (article) => {
          subArticles.push({
            label: `${article.title} [ id: ${article.id} ]`,
            data: article,
            isLeaf: true,
          });
        });
        const subs = subCategories.concat(subArticles);
        data.subs = subs;
        if (!subs.length) {
          subs.push({
            label: '空',
            isEmpty: true,
            isLeaf: true,
          });
        }
        resolve(subs);
      }));
    },
    click(node) {
      if (!node.isLeaf) {
        this.selected = {
          id: node.data.id,
          type: 'category',
        };
      } else {
        this.selected = {
          id: node.data.id,
          type: 'article',
        };
      }
    },
    addArticle(node) { this.selected = { id: 0, type: 'article', categoryId: node.data.id }; },
    addCategory(node) { this.selected = { id: 0, type: 'category', parentId: node.data.id }; },
    // eslint-disable
    renderContent(h, { node, data }) {
      if (data.isEmpty) {
        return (<span>{node.label}</span>);
      }
      const { subs } = data.data;
      if (node.isLeaf && !subs) {
        return (
          <span>
            <span
              class="uk-margin-small-right"
              uk-icon="icon: file-edit"
            />
            {node.label}
          </span>
        );
      }
      return (
          <span>
            <span
              class="uk-margin-small-right"
              uk-icon="icon: folder"
            />
            {node.label}
         </span>
      );
    },
    toggle() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
<style lang="scss" scoped>
  .menu {
    i {
      margin-left: 5px;
    }
  }
  .root-add {
    cursor: pointer;
    margin-left: 3px;
    margin-top: 10px;
  }
</style>
