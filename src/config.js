import path from 'path';

export default {
  db: {
    username: 'root',
    password: 'root',
    database: 'vms',
    prefix: 'vms',
  },
  server: {
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
  ssr: true,
};
