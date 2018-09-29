import Server from '../../../src/server/core';
import { server as config } from '../../../src/server/config';

let server;

const start = () => {
  server = new Server();
};

const stop = () => {
  server.close();
};

const { url } = config;

export default { start, stop, url };
