import axios from 'axios';

const Auth = {
  login: user => axios({
    url: '/api/auth/login',
    data: user,
    method: 'POST',
  }).then(res => res.data, err => Promise.reject(err)),
  logout: () => axios({
    url: '/api/auth/logout',
    method: 'POST',
  }),
  user: () => axios({
    url: '/api/auth/user',
    method: 'GET',
  }).then(res => res.data, err => Promise.reject(err)),
};

export default Auth;
