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
    root: path.resolve(), // logical path (maybe in webpack file system)
    diskRoot: path.join(__dirname, '..'), // disk path
  },
  ssr: false,
};
