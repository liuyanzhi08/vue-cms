<template>
  <div>
    {{test}}
  </div>
</template>
<script>
  import Staticize from '../../../api/staticize'

  export default {
    data: function () {
      return {
        test: 'hello',
      }
    },
    methods: {
    },
    created: function () {
      Staticize.get().then(() => {
      })
    },
    components: {
    }
  }
</script>
