<template>
  <div>
    <app-category-tree
      ref="publishCategoryTree"
      :show-checkbox="true"
    />
    <div class="uk-card uk-card-default uk-card-body uk-flex uk-flex-center">
      <button
        class="uk-button uk-button-primary"
        @click="publish"
      >
        <span
          v-if="loading"
          uk-spinner="ratio: 1"
        />
        <span>publish</span>
      </button>
    </div>
  </div>
</template>
<script>
import AppCategoryTree from './category-tree';

export default {
  components: {
    AppCategoryTree,
  },
  data() {
    return {
      loading: false,
      articles: [],
    };
  },
  created() {
  },
  methods: {
    publish() {
      const { publishCategoryTree } = this.$refs;
      const checkedNodes = publishCategoryTree.getCheckedNodes();
      const articleIds = checkedNodes.filter(item => !!item.isLeaf).map(item => item.id);
      const categoryIds = checkedNodes.filter(item => !item.isLeaf).map(item => item.id);

      const { Common } = this.$store.getters;
      this.loading = true;
      Common.staticize({
        articleIds,
        categoryIds,
      }).then(() => {
        this.loading = false;
      });
    },
  },
};
</script>
