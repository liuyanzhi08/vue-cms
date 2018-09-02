import axios from 'axios';

const Auth = {
  login: (user) => {
    return axios({url: '/api/auth/login', data: user, method: 'POST' }).then((res) => {
      return res.data;
    });
  },
  logout: () => {
    return axios({url: '/api/auth/logout', method: 'POST' });
  }
}

export default Auth;
