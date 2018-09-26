<template>
  <div>
    <router-view class="uk-offcanvas-content" />
  </div>
</template>
<script>

export default {
  components: {},
  data() {
    return {
      brand: 'VMS',
      navs: [
        {
          id: 'categoryList',
          label: 'category',
        },
        {
          id: 'about',
          label: 'about',
        },
      ],
    };
  },
};
</script>
<style lang="scss">
</style>
