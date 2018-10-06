<template>
  <div class="uk-card uk-card-default uk-card-body">
    <div v-if="test">{{ text }}</div>
    <button @click="toggle">click</button>
    <vms-detail :aid="$route.params.id">
      <template slot-scope="{ article }">
        <div>{{ article }}</div>
      </template>
    </vms-detail>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: true,
      text: 'hell',
    };
  },
  methods: {
    toggle() {
      this.test = !this.test;
    },
  },
};
</script>
<style lang="scss">
</style>
