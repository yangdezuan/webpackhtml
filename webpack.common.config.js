const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const PATHFILE = path.resolve(__dirname, 'public/asset/2019');

// the clean options to use
let cleanOptions = {
	root: path.resolve(__dirname, '../'),
}
module.exports = {
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, 'src/js/index.js')]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|le|c)ss$/,
        use: [
          devMode ? 'style-loader' : { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: devMode
                ? 'images/[path][name].[ext]'
                : '/images/[name].[ext]',
              limit: 10 //单位为B, 8KB
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]',
              publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.(mp4|mp3|webm|ogg|wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[ext]'
              // publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([devMode ? '' : PATHFILE], cleanOptions),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].css',
      chunkFilename: devMode ? '[id].css' : '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Outpt Management',
      filename: devMode
        ? 'index.html'
        : path.resolve(__dirname, 'dist/index.html'),
      template: 'src/index.html'
    }),
  ],
  output: {
    filename: devMode ? 'js/[name].js' : 'js/[name].js',
    path: devMode ? path.resolve(__dirname, 'xxx.com') : PATHFILE,
    publicPath: devMode ? '/' : '/asset/2019'
  }
};
