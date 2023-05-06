const webpack = require('webpack');
const path = require('path');
const fs = require('mz/fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');
module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('dev'),
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new HtmlWebpackPlugin({
            vendorJsUrl: `http://localhost:8088/dist/vendor.dll.js`,
            template: path.resolve(__dirname, '../src/template/index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./vendor-manifest.json')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist/'),
        host: 'localhost',
        port: 8088,
        open: true,
        // stats: 'errors-only',
        hot: true,
        inline: true,
        disableHostCheck: true,
        publicPath: `http://127.0.0.1:8088/dist/`,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            ["/demo"]: {
                secure: false,
                bypass(req, res, proxyOptions) {
                    return '/dist/index.html';
                }
            },
        },
        before(app, server) {
            const dllPath = path.resolve(__dirname, '../dist/vendor.dll.js');
            const content = fs.readFileSync(dllPath);
            const setCache = res => res.writeHead(200, { 'Cache-Control': 'max-age=315360000' });
            app.get('/dist/vendor.dll.js', (req, res) => {
                setCache(res);
                res.end(content);
            });

            const jsPath = path.resolve(__dirname, '../src/public/js/');
            app.get('/public/js/:filename', (req, res) => {
                const { filename } = req.params;
                const filePath = path.resolve(jsPath, filename);
                const fileContent = fs.readFileSync(filePath);
                setCache(res);
                res.end(fileContent);
            });
        }
    }
});