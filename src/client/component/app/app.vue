<template>
  <div>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import(/* webpackChunkName: "bootstrap" */ 'bootstrap.script')

  export default {
    data: function () {
      return {
        brand: 'VMS',
        navs: [
          {
            id: 'categoryList',
            label: 'category'
          },
          {
            id: 'about',
            label: 'about'
          }
        ]
      }
    },
    components: {
    }
  }
</script>
<style lang="scss">
  @import "~bootstrap.style";
  @import "~fontawesome";
  @import "~style/overwrite";

  body {
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  }
</style>
