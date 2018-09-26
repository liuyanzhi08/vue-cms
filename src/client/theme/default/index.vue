<template>
  <div>
    <s-list
      cid="6"
      limit="0,5">
      <h1
        slot="category"
        slot-scope="category"
      >
        <a :href="category.url">{{ category.title }}</a>
      </h1>
      <div
        slot="article"
        slot-scope="article"
      >
        <div style="color:red">
          标题: {{ article.title }}
        </div>
        <div style="color:red">
          时间: {{ article.created_at }}
        </div>
      </div>
    </s-list>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
</style>
