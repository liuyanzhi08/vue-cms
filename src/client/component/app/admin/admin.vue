<template>
  <div>
    <navbar />
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>
<script>
import navbar from './navbar';

export default {
  components: {
    navbar,
  },
};
</script>
