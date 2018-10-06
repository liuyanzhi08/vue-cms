import core from '../core';

const { app, router } = core;

export default async context => new Promise((resolve, reject) => {
  // 设置服务器端 router 的位置
  router.push(context.url);

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    // 匹配不到的路由，执行 reject 函数，并返回 404
    if (!matchedComponents.length) {
      reject(new Error('404'));
    }

    // Promise 应该 resolve 应用程序实例，以便它可以渲染
    resolve(app);
  }, reject);
});
