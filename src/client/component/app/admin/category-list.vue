<template>
  <div>
    <button
      class="uk-button uk-button-secondary uk-width-1-1 uk-hidden@m"
      @click="toggle"
    >
      <span v-if="!expanded">expand catalog</span>
      <span v-if="expanded">collapse catalog </span>
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
          ref="tree"
          node-key="treeId"
          :props="{ isLeaf: 'isLeaf' }"
          :data="rootCategory"
          :render-content="renderContent"
          :load="load"
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
          @article-updated="updateNode"
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
import { mapGetters } from 'vuex';
import { RENDER_NODE } from '../../../store';
import Article from '../../../api/article';
import Category from '../../../api/category';
import AppArticle from './article';
import AppCategory from './category';
import { db } from '../../../config';

const label = (obj) => {
  return `${obj.title} [ id: ${obj.id} ]`;
};

const id = (obj, type) => {
  return `${type}-${obj.id}`;
};

export default {
  components: {
    AppArticle,
    AppCategory,
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
  computed: {
    ...mapGetters([
      'rootCategory',
    ]),
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
        if (!subs.length) {
          subs.push({
            treeId: `empty-${nodeId}`,
            label: 'none',
            isEmpty: true,
            isLeaf: true,
          });
        }
        resolve(subs);
      }));
    },
    click(node) {
      if (node.isEmpty) {
        return;
      }
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
      if (data.isEmpty) {
        return (<span>{node.label}</span>);
      }
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
    updateNode(node) {
      const { tree } = this.$refs;
      tree.remove(id(node, 'article'));
      node.label = label(node);
      node.treeId = id(node, 'article');
      node.isLeaf = true;
      const cid = node.category_id === db.rootId ? null : `category-${node.category_id}`;
      tree.append(node, cid);
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
