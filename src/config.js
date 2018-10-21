import path from 'path';

export default {
  db: {
    username: 'root',
    password: 'root',
    database: 'vms',
    prefix: 'vms',
  },
  server: {
    uri: 'http://127.0.0.1',
    port: 8081,
    log: {
      access: 'log/access.log',
      error: 'log/error.log',
    },
    path: {
      user: '/user',
      admin: '/admin',
    },
  },
  dir: {
    root: path.resolve(__dirname, '..'),
  },
  ssr: false,
};
