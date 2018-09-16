<template>
  <div>
    <navbar />
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>
<script>

import categoryList from './category-list';
import navbar from './navbar';

export default {
  components: {
    categoryList,
    navbar,
  },
};
</script>
