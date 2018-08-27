<template>
  <div>
    <slot
        name="category"
        :id="category.id"
        :title="category.title"
        :description="category.description"
        :create_time="category.create_time"
        :url="category.url"
    >
    </slot>
    <slot
        name="article"
        v-for="article in articles"
        :id="article.id"
        :title="article.title"
        :content="article.content"
        :category_id="article.category_id"
        :create_time="article.create_time"
        :url="article.url"
    >
    </slot>
  </div>
</template>
<script>
  import Article from '../../../../api/article'
  import Category from '../../../../api/category'

  export default {
    name: 's-list',
    props: {
      cid: {
        type: String,
        default: '0'
      },
      limit: {
        type: String,
        default: '0, 10'
      }
    },
    data: function () {
      return {
        articles: [],
        category: {}
      }
    },
    created: function () {
      let [from, size] = this.limit.split(',')
      Article.get({
        _from: from,
        _size: size,
        category_id: this.cid
      }).then((res) => {
        this.articles = res.data.items.map((item) => {
          item.url = '/article/' + item.id
          return item
        })
      })
      Category.get(this.cid).then((res) => {
        this.category = res.data
        this.category.url = '/category/' + this.category.id
      })
    }
  }
</script>
<style lang="scss">
</style>
