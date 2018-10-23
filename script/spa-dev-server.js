import path from 'path';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import e2k from 'express-to-koa';
import webpackDevMiddleware from 'webpack-dev-middleware';
import spaConfig from './webpack/dev/spa.config.babel';

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(spaConfig.output.path, file));
  } catch (e) {
    return e;
  }
};

module.exports = async function setupDevServer(app) {
  // modify client config to work with hot middleware
  const spaConfigClone = Object.assign({}, spaConfig);
  spaConfigClone.entry.index = ['webpack-hot-middleware/client', spaConfig.entry.index];
  spaConfigClone.output.filename = '[name].js';
  spaConfigClone.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );

  // dev middleware
  const clientCompiler = webpack(spaConfigClone);
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: spaConfigClone.output.publicPath,
    stats: 'minimal',
  });

  const readWebpackFile = filename => readFile(devMiddleware.fileSystem, filename);
  let resolve;
  const readyPromise = new Promise((r) => { resolve = r; });
  const ready = () => {
    resolve({ readWebpackFile });
  };

  clientCompiler.plugin('done', (res) => {
    const stats = res.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    if (stats.errors.length) return;

    ready();
  });

  // hot middleware
  app.use(e2k(webpackHotMiddleware(clientCompiler, { heartbeat: 5000 })));

  return readyPromise;
};
