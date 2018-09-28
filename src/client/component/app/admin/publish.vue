<template>
  <div>
    {{ test }}
  </div>
</template>
<script>
import Staticize from '../../../api/staticize';

export default {
  components: {},
  data() {
    return {
      test: 'hello',
    };
  },
  created() {
    Staticize.get().then(() => {
    });
  },
  methods: {},
};
</script>
