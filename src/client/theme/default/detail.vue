<template>
  <div class="uk-card uk-card-default uk-card-body">
    <s-detail :aid="$route.params.id">
      <div
        slot="article"
        slot-scope="article"
      >
        <h2>{{ article.title }}</h2>
        <h3>{{ article.created_at }}</h3>
        {{ article.content }}
      </div>
    </s-detail>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
</style>
