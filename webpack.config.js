'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge')

const webpackCommon = {
    target: 'electron-renderer',

    entry: {
        app: ['./src']
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader?presets[]=es2015' }]
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            },
            {
                test: /\.hbs$/,
                use: { loader: 'handlebars-loader' }
            },
            {
                test: /\.(png|svg)$/,
                use: { loader: 'file-loader?name=assets/gfx/[name].[ext]' }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader?sourceMap']
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin([
            {
                from: './src/node_modules',
                to: './node_modules'
            },
            {
                from: './src/electron.js',
                to: './index.js'
            },
            {
                from: './src/index.html',
                to: './index.html'
            },
            {
                from: './src/package.json',
                to: './package.json'
            },
            {
                from: './src/icon.icns',
                to: './icon.icns'
            }
        ],
        { ignore: ['.DS_Store'] }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash',
            menubar: 'menubar'
        })
    ],

    resolve: {
        modules: [
            path.join(__dirname, './node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            jquery: 'jquery/src/jquery',
            handlebars: 'handlebars/dist/handlebars'
        }
    },

    resolveLoader: {
        modules: [path.join(__dirname, './node_modules')]
    },

    output: {
        filename: 'app.js',
        path: path.join(__dirname, './dist'),
        publicPath: '/'
    }
}

const webpackDev = {
    devtool: '#inline-source-map',

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9753
    }
}

const webpackProd = {
    devtool: 'source-map'
}

if(~['start', 'dev'].indexOf(process.env.npm_lifecycle_event))
    module.exports = merge(webpackCommon, webpackDev)
else
    module.exports = merge(webpackCommon, webpackProd)
