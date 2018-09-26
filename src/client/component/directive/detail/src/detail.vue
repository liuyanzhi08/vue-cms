<template>
  <div>
    <slot
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
import Article from '../../../../api/article';

export default {
  name: 'SDetail',
  props: {
    aid: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      article: {},
    };
  },
  created() {
    Article.get(this.aid).then((res) => {
      this.article = res.data;
    });
  },
};
</script>
<style lang="scss">
</style>
