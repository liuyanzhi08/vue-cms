<template>
  <div>
    <div class="uk-text-meta">CMS. Proudly using ES7, Vue 2, Koa 2, Webpack 4, Babel 7 and Mocha</div>
    <div class="uk-card uk-card-default uk-card-body">
      <s-list
        cid="2"
        limit="0,5"
      >
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
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
</style>
