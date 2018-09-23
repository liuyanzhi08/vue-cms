<template>
  <div class="category-list">
    <ui-sidebar>
      <aside>
        <el-tree
          :props="{ isLeaf: 'leaf' }"
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
      <div>
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
      const nodeId = node.data.data ? node.data.data.id : 0;
      return Category.query({
        parent_id: nodeId,
      }).then((res) => {
        const subCategories = [];
        _.each(res.data.items, (category) => {
          subCategories.push({
            label: `${category.title} [ id: ${category.id} ]`,
            data: category,
            leaf: false,
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
            leaf: true,
          });
        });
        resolve(subCategories.concat(subArticles));
      }));
    },
    click(node) {
      if (!node.leaf) {
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
    addArticle(node) { this.selected = { id: 0, type: 'article', categoryId: node.id }; },
    addCategory(node) { this.selected = { id: 0, type: 'category', parentId: node.id }; },
    renderContent(h, { node }) {
      if (node.isLeaf) {
        return (<span>{node.label}</span>);
      }
      return (
        <span className="node-edit">
          {node.label}
          <span className="menu">
            <i
              className="fa fa-plus article"
              on-click={(e) => { this.addArticle(node); e.stopPropagation(); }}
              on-dblclick={(e) => { this.addCategory(node); e.stopPropagation(); }}
            />
          </span>
        </span>
      );
    },
  },
};
</script>
<style lang="scss">
    .category-list {
        width: 100%;
        .main {
            padding: 10px;
        }
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
    }
</style>
