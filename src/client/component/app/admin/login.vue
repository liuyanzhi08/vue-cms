<template>
  <div class="uk-flex uk-flex-center">
    <form
      class="uk-padding"
      @submit.prevent="login"
    >
      <h2 class="uk-heading-primary">vue-cm</h2>
      <div class="uk-margin">
        <div class="uk-inline">
          <span
            class="uk-form-icon"
            uk-icon="icon: user"
          />
          <input
            v-model="user.username"
            type="text"
            class="uk-input"
          >
        </div>
      </div>
      <div class="uk-margin">
        <div class="uk-inline">
          <span
            class="uk-form-icon"
            uk-icon="icon: lock"
          />
          <input
            v-model="user.password"
            class="uk-input"
            type="text"
          >
        </div>
      </div>

      <div class="uk-margin">
        <button
          class="uk-button uk-button-primary"
        >登陆</button>
      </div>
    </form>
  </div>
</template>
<script>
import { AUTH_LOGIN, NOTICE_SEND } from '../../../store';

export default {
  components: {},
  data() {
    return {
      user: {},
    };
  },
  created() {
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch(AUTH_LOGIN, this.user);
        const { to } = this.$router.currentRoute.params;
        const togo = to ? {
          name: this.$router.currentRoute.params.to.name,
          params: this.$router.currentRoute.params.to.params,
        } : { name: 'categoryList' };
        this.$router.push(togo);
      } catch (e) {
        const { data } = e.response;
        this.$store.dispatch(NOTICE_SEND, data.msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
