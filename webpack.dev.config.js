// webpack.development.config.js

const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './xxx.com', //本地服务器所加载的页面所在的目录
    host: 'localhost',
    port: 3001, //端口
    open: true, //打开
    inline: true //实时刷新
  }
});
