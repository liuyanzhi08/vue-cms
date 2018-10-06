<template>
  <div class="vms-detail">
    <slot
      :article="article"
    />
  </div>
</template>
<script>
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
    const { Article } = this.$store.getters;
    Article.get(this.aid).then((res) => {
      this.article = res.data;
    });
  },
};
</script>
<style lang="scss">
</style>
