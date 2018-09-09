
export default {
  db: {
    username: 'root',
    password: 'root',
    database: 'cms',
    prefix: 'vms',
  },
  server: {
    port: 1991,
    log: {
      access: 'log/vms-access.log',
      error: 'log/vms-error.log',
    },
    path: {
      user: '/user',
      admin: '/admin',
    }
  }
};