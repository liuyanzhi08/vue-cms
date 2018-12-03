import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import spaConfig from './webpack/dev/ssr.client.config.babel';

const create = () => {
  const readFile = (fs, file) => {
    try {
      return fs.readFileSync(path.join(spaConfig.output.path, file));
    } catch (e) {
      return e;
    }
  };

  // modify client config to work with hot middleware
  const spaConfigClone = Object.assign({}, spaConfig);
  spaConfigClone.entry = {
    index: ['webpack-hot-middleware/client', spaConfig.entry.index],
  };
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

  const readClientFile = (filename, raw) => {
    const buffer = readFile(devMiddleware.fileSystem, filename).toString();
    return raw ? buffer : buffer.toString();
  };
  let resolve;
  const compileDone = new Promise((r) => { resolve = r; });
  const ready = () => {
    resolve({ readClientFile });
  };

  clientCompiler.plugin('done', (res) => {
    const stats = res.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    if (stats.errors.length) return;

    ready();
  });
  return {
    clientCompiler,
    compileDone,
  };
};

export default create;
