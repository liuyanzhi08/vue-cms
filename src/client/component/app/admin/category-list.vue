<template>
  <div>
    <ui-sidebar>
      <aside
        v-show="expanded"
        slot="side"
      >
        <app-category-tree
          ref="categoryTree"
          :click="click"
        />
        <div class="menu root-add ">
          <i
            uk-icon="icon: plus"
            @click="addArticle"
          />
          <i
            uk-icon="icon: album"
            @click="addCategory"
          />
        </div>
      </aside>
      <div slot="main">
        <app-article
          v-if="selected.type === 'article'"
          :id="selected.id"
          :category-id="selected.categoryId"
          @updated="updateArticle"
          @deleted="deleteArticle"
        />
        <app-category
          v-if="selected.type === 'category'"
          :id="selected.id"
          :parent-id="selected.parentId"
          @updated="updateCategory"
          @deleted="deleteCategory"
        />
      </div>
    </ui-sidebar>
  </div>
</template>
<script>
import _ from 'lodash';
import AppArticle from './article';
import AppCategory from './category';
import AppCategoryTree from './category-tree';
import { db } from '../../../config';

const label = (obj, type) => `${obj.title} [ ${type.substr(0, 1)}id: ${obj.id} ]`;

const id = (obj, type) => `${type}-${obj.id}`;

export default {
  components: {
    AppArticle,
    AppCategory,
    AppCategoryTree,
  },
  data() {
    return {
      selected: {
        id: 0,
        type: 'article',
      },
      expanded: true,
    };
  },
  created() {
  },
  methods: {
    click(node) {
      if (!node.isLeaf) {
        this.selected = {
          id: node.id,
          type: 'category',
        };
      } else {
        this.selected = {
          id: node.id,
          type: 'article',
        };
      }
    },
    addArticle() { this.selected = { id: 0, type: 'article' }; },
    addCategory() { this.selected = { id: 0, type: 'category' }; },
    /* eslint-enable */
    updateArticle(node) {
      const { categoryTree } = this.$refs;
      categoryTree.updateArticle(node);
    },
    updateCategory(node) {
      const { categoryTree } = this.$refs;
      categoryTree.updateCategory(node);
    },
    deleteArticle(node) {
      const { categoryTree } = this.$refs;
      categoryTree.deleteArticle(node);
    },
    deleteCategory(node) {
      const { categoryTree } = this.$refs;
      categoryTree.deleteCategory(node);
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
