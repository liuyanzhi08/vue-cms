import axios from 'axios';
import assert from 'power-assert';
import resource from '../../dist/resource-axios';
import server from '../helpers/server';

let api;

describe('interceptors', () => {
  before(() => {
    server.start();
    api = resource(server.base, axios);

    // Add a request interceptor
    axios.interceptors.request.use((config) => {
      assert(config);
      return config;
    });

    // Add a response interceptor
    axios.interceptors.response.use((response) => {
      assert(response);
      return response;
    });
  });
  after(() => {
    server.stop();
  });

  it('should trigger request and response interceptors', async () => {
    await api.get();
  });
});
