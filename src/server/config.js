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

const path = {
  static: _path.resolve(__dirname, '../../dist/static')
}

export {
  db,
  server,
  path
}
