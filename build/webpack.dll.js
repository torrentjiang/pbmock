//@ts-check
const webpack = require('webpack');
const path = require('path');
const context = path.resolve(__dirname, '../');

module.exports = {
    // mode: process.env.NODE_ENV || 'production',
    mode: 'development',
    context,
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'antd']
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
    ],
};