<template>
  <div>
    <slot
      :id="category.id"
      :title="category.title"
      :description="category.description"
      :created_time="category.created_time"
      :url="category.url"
      name="category"
    />
    <slot
      v-for="article in articles"
      :id="article.id"
      :title="article.title"
      :content="article.content"
      :category_id="article.category_id"
      :created_time="article.created_time"
      :url="article.url"
      name="article"
    />
  </div>
</template>
<script>
import { path } from '../../../../config';
import Article from '../../../../api/article';
import Category from '../../../../api/category';

export default {
  name: 'SList',
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
      category: {},
    };
  },
  created() {
    const [from, size] = this.limit.split(',');
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
