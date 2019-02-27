<template>
  <el-tree
    ref="tree"
    node-key="treeId"
    :props="{ isLeaf: 'isLeaf' }"
    :data="rootCategory"
    :render-content="renderContent"
    :load="load"
    :empty-text="'nothing'"
    lazy
    :show-checkbox="showCheckbox"
    @node-click="click"
    @check-change="checkChange"
  />
</template>
<script>
import _ from 'lodash';
import config from '../../../config';

const { db } = config;

const label = (obj, type) => `${obj.title} [ ${type.substr(0, 1)}id: ${obj.id} ]`;

const id = (obj, type) => `${type}-${obj.id}`;

const max = 999999999999;

export default {
  name: 'AppCategoryTree',
  props: {
    click: {
      type: Function,
      default: _.noop,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
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
  created() {
  },
  methods: {
    load(node, resolve) {
      const { Article, Category } = this.$store.getters;
      const nodeId = node.data.id || db.rootId;
      return Category.query({
        parent_id: nodeId,
        _page: 1,
        _num: max,
      }).then((res) => {
        const subCategories = [];
        _.each(res.data.items, (category) => {
          subCategories.push({
            treeId: id(category, 'category'),
            label: label(category, 'category'),
            isLeaf: false,
            ...category,
          });
        });
        return subCategories;
      }).then(subCategories => Article.query({
        category_id: nodeId,
        _page: 1,
        _num: max,
        _sort: 'created_at',
        _dir: 'asc',
      }).then((res) => {
        const subArticles = [];
        _.each(res.data.items, (article) => {
          subArticles.push({
            treeId: id(article, 'article'),
            label: label(article, 'article'),
            isLeaf: true,
            ...article,
          });
        });
        const subs = subCategories.concat(subArticles);
        node.data.subs = subs;
        resolve(subs);
      }));
    },
    /* eslint-disable */
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
    /* eslint-enable */
    updateArticle(node) {
      const { tree } = this.$refs;
      const aid = id(node, 'article');
      tree.remove(aid);
      node.label = label(node, 'article');
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
      node.label = label(node, 'category');
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
    checkChange(node) {
      this.$emit('check-change', node);
    },
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes();
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
</style>
