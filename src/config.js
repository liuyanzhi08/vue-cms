
export default {
  db: {
    username: 'root',
    password: 'root',
    database: 'cms',
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
    }
  }
};
