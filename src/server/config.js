import _path from 'path';

const db = {
  username: 'root',
  password: 'root',
  database: 'cms',
  prefix: 'vms'
};

const port = 1993;
const server = {
  port,
  url: `http://127.0.0.1:${port}`,
};

const root = _path.resolve(__dirname, '../..');
const path = {
  root,
  static: _path.join(root, 'dist/static'),
  log: {
    access: _path.join(root, 'log/vms-access.log'),
    error: _path.join(root, 'log/vms-error.log'),
  },
}

export {
  db,
  server,
  path
}
