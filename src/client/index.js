import core from './core';

const { app, router } = core;

router.onReady(() => app.$mount('#app'));
export default app;
