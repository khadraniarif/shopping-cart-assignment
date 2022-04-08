const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const webpack  = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        './src/index.js',
        './src/assets/sass/main.scss'
    ],
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        static: './dist'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Online Shopping Cart',
            description: 'Buy Online Fruits',
            template: './src/index.hbs'
        }),
        new HtmlWebpackPlugin({
            title: "Products",
            template: "src/pages/products.hbs",
            filename: "products.html"
        }),
        new MiniCssExtractPlugin({
              filename: "style.css"
        })
    ],
    resolve: {
        alias: {
            handlebars: __dirname + '/node_modules/handlebars/dist/handlebars.min.js',
            fs: false,
            '@src': path.resolve(__dirname, 'src')
        }
        // extensions: ['.tsx', '.ts', '.js', 'webpack.js', '.web.js', '.html'],
    },
    output: {
        path:   path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'assets/images',
                  
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ]
            }
        ]
    }
}