//@ts-check
const webpack = require('webpack');
const path = require('path');
const context = path.resolve(__dirname, '../');

const dev = 'development';
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === dev;

const filename = isDev ? '[name]/bundle.js' : '[name]/bundle-[chunkhash:5].js';

const publicPathHost = isDev ? `http://127.0.0.1:8088` : 'pbmock';

/**
 * @param {'babel-loader' | 'less-loader' | 'less-loader-modules' | 'css-loader' } loaderName
 */
const getLoaderConfig = loaderName => {
    switch (loaderName) {
        case 'babel-loader':
            return isDev ? 'babel-loader' : 'babel-loader?sourceMap=true';

        case 'less-loader':
            return isDev ? 'style-loader!css-loader?sourceMap=true!less-loader?sourceMap=true' : 'style-loader!css-loader!less-loader';

        case 'css-loader':
            return isDev ? 'style-loader!css-loader?sourceMap=true' : 'style-loader!css-loader';

        default:
            break;
    }
};

module.exports = {
    context,
    entry: {
        app: './src/app.tsx'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '$config': path.resolve(__dirname, '../config'),
            '@': path.resolve(__dirname, '../src/'),
            '@components': path.resolve(__dirname, '../src/components/'),
            '@lib': path.resolve(__dirname, '../src/lib/')
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        // publicPath: `${publicPathHost}/dist/`,
        publicPath: '/pbmock/dist/',
        chunkFilename: '[name].[chunkhash:5].js',
        filename
    },
    module: {
        rules: [{
            test: /\.js$/i,
            loader: getLoaderConfig('babel-loader'),
            exclude: path.resolve(__dirname, '../node_modules/')
        }, {
            test: /\.less$/i,
            oneOf: [{
                loader: getLoaderConfig('less-loader') // compiles Less to CSS
            }]
        }, {
            test: /\.css$/i,
            loader: getLoaderConfig('css-loader')
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?name=[path][name].[ext]&limit=2048'
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)$/,
            loader: 'file-loader?name=[path][name].[ext]'
        },
        // {
        //     test: /\.js/,
        //     loader: 'babel-loader?presets[]=es2015&presets[]=stage-0',
        //     exclude: path.resolve(__dirname, '../node_modules/')
        // }, 
        {
            test: /\.tsx?$/i,
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                // getCustomTransformers: () => ({
                //   before: [
                //         tsImportPluginFactory({
                //             libraryName: 'antd',
                //             libraryDirectory: 'lib',
                //             style: 'css',
                //         })
                //     ]
                // }),
                compilerOptions: {
                    module: 'es2015'
                }
            },
            // exclude: path.resolve(__dirname, '../node_modules/')
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('dev'),
            __CLIENT__: JSON.stringify('mis')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            // @ts-ignore
            manifest: require('./vendor-manifest.json')
        })
    ]
};