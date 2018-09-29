<template>
  <div>
    <div class="uk-card uk-card-default uk-card-body uk-flex uk-flex-center">
      <button
        class="uk-button uk-button-primary"
        @click="publish"
      >
        <span
          v-if="loading"
          uk-spinner="ratio: 1"
        />
        <span>publish</span>
      </button>
    </div>
  </div>
</template>
<script>
import staticize from '../../../api/staticize';

export default {
  components: {},
  data() {
    return {
      loading: false,
    };
  },
  created() {
  },
  methods: {
    publish() {
      this.loading = true;
      staticize.get().then(() => {
        this.loading = false;
      });
    },
  },
};
</script>
