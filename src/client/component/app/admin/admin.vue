<template>
  <div class="row">
    <div class="col-12">
        <div class="row">
            <div class="col-12">

            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  import categoryList from './category-list.vue';
  import navbar from './navbar.vue';

  export default {
    data: function () {
      return {
      }
    },
    methods: {
    },
    created: function () {
    },
    mounted: function () {
    },
    watch: {
    },
    components: {
      categoryList,
      navbar,
    }
  }
</script>
