const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                },
            },
            // { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: {
            //         loader: 'url-loader',
            //         options: {
            //             mimetype: 'image/png'
            //         }
            //     }
            // },
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/[name][ext]'
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    devServer: {
        // contentBase: 'src',
        static: 'src',
        hot: true,
        open: true,
        port: 8000,
        // watchContentBase: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new Dotenv()
    ]
}