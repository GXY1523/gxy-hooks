const merge = require('webpack-merge'); //结合 基本的webpack导出
const common = require('../../webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'encodeHooks.js',
    library: 'encodeHooks',
    path: path.resolve(__dirname, './dist'),
  },
});
