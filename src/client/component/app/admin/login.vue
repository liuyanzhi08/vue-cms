<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>User name</label>
            <input required v-model="username" type="text" placeholder="Snoopy"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <hr/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>
<script>
  import Install from '../../../api/install'
  import router from '../../../router'
  import installer from '../../../helper/installer'
  import { AUTH_LOGIN } from '../../../store';

  export default {
    data() {
      return {
        username: null,
        password: null,
      }
    },
    methods: {
      login: function () {
        const {username, password} = this;
        this.$store.dispatch(AUTH_LOGIN, { username, password }).then(() => {
          const to = this.$router.currentRoute.params.to;
          const togo = to ? {
              name: this.$router.currentRoute.params.to.name,
              params: this.$router.currentRoute.params.to.params
            } : { name: 'categoryList'};
          this.$router.push(togo);
        })
      }
    },
    created: function () {
    },
    components: {}
  }
</script>
<style lang="scss">

</style>
