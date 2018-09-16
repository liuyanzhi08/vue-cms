<template>
  <el-form
    ref="form"
    :model="user"
    label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="user.username"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="user.password"/>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="login">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { AUTH_LOGIN } from '../../../store';

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
    login() {
      this.$store.dispatch(AUTH_LOGIN, this.user).then(() => {
        const { to } = this.$router.currentRoute.params;
        const togo = to ? {
          name: this.$router.currentRoute.params.to.name,
          params: this.$router.currentRoute.params.to.params,
        } : { name: 'categoryList' };
        this.$router.push(togo);
      });
    },
  },
};
</script>
<style lang="scss">
  .el-form {
    max-width: 460px;
  }

  body {
  }
</style>
