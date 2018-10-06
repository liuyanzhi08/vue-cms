<template>
  <div class="uk-card uk-card-default uk-card-body">
    <div v-if="test">{{ text }}</div>
    <button @click="toggle">click</button>
    <div>
      {{ article }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { ARTICLE_FETCH } from '../../store';

export default {
  data() {
    return {
      test: true,
      text: 'hell',
    };
  },
  computed: {
    ...mapGetters([
      'article',
    ]),
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
