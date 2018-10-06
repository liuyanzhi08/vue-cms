import Core from './core';

const { app, router } = new Core();

router.onReady(() => app.$mount('#app'));
export default app;
