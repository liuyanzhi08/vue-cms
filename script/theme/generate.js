require('@babel/register');
require('@babel/polyfill');

const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');

const { dir } = require('../../src/server/config').default;

const newThemeName = process.argv[2] || 'theme-demo';
const sourceThemePath = path.join(dir.clientRoot, 'theme/theme-blog');
const targetThemePath = path.join(dir.clientRoot, `theme/${newThemeName}`);
fse.copy(sourceThemePath, targetThemePath).then(() => {
  console.log(chalk.green(`[theme] new theme generated: ${targetThemePath}`));
});
