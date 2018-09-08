<template>
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
  import(/* webpackChunkName: "bootstrap" */ 'bootstrap')
  import navbar from './admin/navbar'

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
      navbar,
    }
  }
</script>
<style lang="scss">
    @import "~bootstrap/scss/bootstrap";
    @import "~element-ui.style";
    @import "~fontawesome";
    @import "~style/overwrite";

    body {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    }
</style>
