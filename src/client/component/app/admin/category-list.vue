<template>
  <div>
    <ui-sidebar>
      <aside
        v-show="expanded"
        slot="side"
      >
        <el-tree
          ref="tree"
          node-key="treeId"
          :props="{ isLeaf: 'isLeaf' }"
          :data="rootCategory"
          :render-content="renderContent"
          :load="load"
          :empty-text="'nothing'"
          lazy
          @node-click="click"
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
import Article from '../../../api/article';
import Category from '../../../api/category';
import AppArticle from './article';
import AppCategory from './category';
import { db } from '../../../config';

const label = obj => `${obj.title} [ id: ${obj.id} ]`;

const id = (obj, type) => `${type}-${obj.id}`;

export default {
  components: {
    AppArticle,
    AppCategory,
  },
  data() {
    return {
      rootCategory: [],
      selected: {
        id: 0,
        type: 'article',
      },
      expanded: true,
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    load(node, resolve) {
      const nodeId = node.data.id || db.rootId;
      return Category.query({
        parent_id: nodeId,
      }).then((res) => {
        const subCategories = [];
        _.each(res.data.items, (category) => {
          subCategories.push({
            treeId: id(category, 'category'),
            label: label(category),
            isLeaf: false,
            ...category,
          });
        });
        return subCategories;
      }).then(subCategories => Article.query({
        category_id: nodeId,
      }).then((res) => {
        const subArticles = [];
        _.each(res.data.items, (article) => {
          subArticles.push({
            treeId: id(article, 'article'),
            label: label(article),
            isLeaf: true,
            ...article,
          });
        });
        const subs = subCategories.concat(subArticles);
        node.data.subs = subs;
        resolve(subs);
      }));
    },
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
    // eslint-disable
    renderContent(h, { node, data }) {
      const { subs } = data;
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
    updateArticle(node) {
      const { tree } = this.$refs;
      const aid = id(node, 'article');
      tree.remove(aid);
      node.label = label(node);
      node.treeId = id(node, 'article');
      node.isLeaf = true;
      const cid = node.category_id === db.rootId ? null : `category-${node.category_id}`;
      tree.append(node, cid);
    },
    updateCategory(node) {
      const { tree } = this.$refs;
      const cid = id(node, 'category');
      const nodeInTree = tree.getNode(cid);
      tree.remove(cid);
      if (nodeInTree) {
        node.children = nodeInTree.children;
      }
      node.label = label(node);
      node.treeId = id(node, 'category');
      node.isLeaf = false;
      const pid = node.parent_id === db.rootId ? null : `category-${node.parent_id}`;
      tree.append(node, pid);
    },
    deleteArticle(node) {
      const { tree } = this.$refs;
      const aid = id(node, 'article');
      tree.remove(aid);
    },
    deleteCategory(node) {
      const { tree } = this.$refs;
      const cid = id(node, 'category');
      tree.remove(cid);
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
