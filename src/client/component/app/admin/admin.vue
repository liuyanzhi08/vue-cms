<template>
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
  import categoryList from './category-list.vue';
  import navbar from './navbar.vue';

  export default {
    data: function () {
      return {}
    },
    methods: {},
    created: function () {
    },
    mounted: function () {
    },
    watch: {},
    components: {
      categoryList,
      navbar,
    }
  }
</script>
