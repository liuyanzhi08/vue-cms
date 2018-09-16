<template>
  <div class="category-list">
    <ui-sidebar>
      <aside>
        <!--222<img src="~@image/test.jpg" alt="">222-->
        <ui-tree
          :data="rootCategories"
          :load="load"
          :click="click"
          :render-content="renderContent"/>
        <div class="menu root-add ">
          <i
            class="fa fa-plus article"
            @click="addArticle({data: {id: 0}})"
            @dblclick="addCategory({data: {id: 0}})"/>
        </div>
      </aside>
      <div>
        <app-article
          v-if="selected.type === 'article'"
          :id="selected.id"
          :category-id="selected.categoryId"/>
        <app-category
          v-if="selected.type === 'category'"
          :id="selected.id"
          :parent-id="selected.parentId"/>
      </div>
    </ui-sidebar>
  </div>
</template>
<script>
import '@style/overwrite.scss';
import Article from '../../../api/article';
import Category from '../../../api/category';
import AppArticle from './article.vue';
import AppCategory from './category.vue';
import _ from 'lodash';

export default {
  components: {
    AppArticle,
    AppCategory,
  },
  data() {
    return {
      rootCategories: [],
      page: null,
      total: null,
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
    Category.query({
      parent_id: 0,
    }).then((res) => {
      const _this = this;
      _.each(res.data.items, (category) => {
        _this.rootCategories.push({
          label: `${category.title} [ id: ${category.id} ]`,
          children: -1,
          data: category,
        });
      });
      this.total = res.data.total;
      this.page = +this.$route.query._page || 1;
    });
  },
  methods: {
    load(node) {
      return Category.query({
        parent_id: node.data.id,
      }).then((res) => {
        const subCategories = [];
        _.each(res.data.items, (category) => {
          subCategories.push({
            label: `${category.title} [ id: ${category.id} ]`,
            children: -1,
            data: category,
          });
        });
        return subCategories;
      }).then(subCategories => Article.query({
        category_id: node.data.id,
      }).then((res) => {
        const subArticles = [];
        _.each(res.data.items, (article) => {
          subArticles.push({
            label: `${article.title} [ id: ${article.id} ]`,
            data: article,
          });
        });
        return subCategories.concat(subArticles);
      }));
    },
    click(node) {
      if (node.children) {
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
    renderContent(h, { node }) {
      if (!node.children) {
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
