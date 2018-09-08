<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>

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
    components: {}
  }
</script>
<style lang="scss">
</style>
