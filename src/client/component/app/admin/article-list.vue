<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>created_at</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="article in articles"
          :key="article.id"
        >
          <td>{{ article.id }}</td>
          <td>
            <router-link :to="{name: 'article', params: { id: article.id }}">
              {{ article.title }}
            </router-link>
          </td>
          <td>{{ article.created_at }}</td>
        </tr>
      </tbody>
    </table>
    <ui-pagination
      :page="page"
      :total="total"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      articles: [],
      page: null,
      total: null,
    };
  },
  computed: {},
  created() {
    const { Article } = this.$store.getters;
    Article.get(this.$route.query).then((res) => {
      this.articles = res.data.items;
      this.total = res.data.total;
      this.page = +this.$route.query._page || 1;
    });
  },
};
</script>
