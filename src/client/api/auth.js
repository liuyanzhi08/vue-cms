import axios from 'axios';

const Auth = {
  async login(user) {
    const res = await axios({
      url: '/api/auth/login',
      data: user,
      method: 'POST',
    });
    return res.data;
  },
  async logout() {
    const res = await axios({
      url: '/api/auth/logout',
      method: 'POST',
    });
    return res.data;
  },
  async user() {
    const res = axios({
      url: '/api/auth/user',
      method: 'GET',
    });
    return res.data;
  },
};

export default Auth;
