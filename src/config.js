export default {
  db: {
    username: 'root',
    password: 'root',
    database: 'vms_dnc8~MRzMP',
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
};
