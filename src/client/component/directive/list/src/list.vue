<template>
  <div>
    <slot
      :category="category"
    />
    <slot
      :articles="articles"
    />
    <slot
      :article="articles[0]"
    />
  </div>
</template>
<script>
import { path } from '../../../../config';

export default {
  name: 'VmsList',
  props: {
    cid: {
      type: String,
      default: '0',
    },
    limit: {
      type: String,
      default: '0, 10',
    },
  },
  data() {
    return {
      articles: [],
      category: null,
    };
  },
  computed: {
    article() {
      return this.articles.length ? this.articles[0] : null;
    },
  },
  created() {
    const { Article, Category } = this.$store.getters;
    const limit = this.limit.replace(/\s/g, '');
    const [from, size] = limit.split(',');
    Article.query({
      _from: from,
      _size: size,
      category_id: this.cid,
    }).then((res) => {
      this.articles = res.data.items.map((item) => {
        const article = item;
        article.url = `${path.user}/article/${item.id}`;
        return article;
      });
    });
    Category.get(this.cid).then((res) => {
      this.category = res.data;
      this.category.url = `${path.user}/category/${this.category.id}`;
    });
  },
};
</script>
<style lang="scss">
</style>
