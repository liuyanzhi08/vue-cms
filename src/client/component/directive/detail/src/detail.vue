<template>
  <div class="vms-detail">
    <slot
      :article="article"
    />
  </div>
</template>
<script>
import Article from '../../../../api/article';

export default {
  name: 'VmsDetail',
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
