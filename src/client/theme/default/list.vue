<template>
  <div>
    <ul>
      <s-list
        :cid="$route.params.id"
        limit="0,5">
        <h2
          slot="category"
          slot-scope="category"
        >
          {{ category.title }}
        </h2>
        <a
          slot="article"
          slot-scope="article"
          :href="article.url"
        >
          <li>
            <div style="color:red">
              标题: {{ article.title }}
            </div>
            <div style="color:red">
              时间: {{ article.created_at }}
            </div>
          </li>
        </a>
      </s-list>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
</style>
