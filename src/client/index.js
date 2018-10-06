import App from './core';
import {router} from './core';

const app = new App();

router.onReady(() => app.$mount('#app'));
export default app;
