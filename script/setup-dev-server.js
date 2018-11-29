import config from '../src/config';
import spaDevServer from './spa-dev-server';
import ssrDevServer from './ssr-dev-server';

const { ssr } = config;
const setupDevServer = ssr ? ssrDevServer : spaDevServer;

export default setupDevServer;
