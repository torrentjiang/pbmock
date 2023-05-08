//@ts-check
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        publicPath: `/pbmock/`,
    },
    plugins: [
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('dev'),
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new HtmlWebpackPlugin({
            vendorJsUrl: '/pbmock/vendor.dll.js',
            // filename: path.resolve(__dirname, '../src/index.html'),
            template: path.resolve(__dirname, '../src/template/index.html')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            // @ts-ignore
            manifest: require('./vendor-manifest.json')
        })
    ],
});