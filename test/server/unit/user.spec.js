import assert from 'power-assert';
import { server } from '../helper';

describe('interceptors', () => {
  before(() => {
    server.start();
  });

  after(() => {
    server.stop();
  });

  it('test', async () => {
    assert(1 === 0);
    await 1;
  });
});
