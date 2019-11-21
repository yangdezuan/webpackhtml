// webpack.production.config.js

const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
// styles
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		minimizer: [
	    new UglifyJsPlugin({
	      cache: true,
	      parallel: true,
	      sourceMap: true
	    }),
	    new OptimizeCSSAssetsPlugin({})
	  ]
	}
}); 