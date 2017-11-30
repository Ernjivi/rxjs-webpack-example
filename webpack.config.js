const path = require('path');
const package = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractTextPlugin = new ExtractTextPlugin({
    filename: 'styles/main-[hash:7].css',
})



module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        filename: '[name]-[hash:7]-bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8080
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: 'babel-loader', 
                exclude: /node_modules/ },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        'sass-loader',
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:7].[ext]',
                            outputPath: 'images/'
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor-bundle',
            filename: 'vendor-[hash:7]-bundle.js',
            minChunks(module, count) {
                var context = module.context;
                return context && context.indexOf('node_modules') >= 0;
            },
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default']
        }),
        extractTextPlugin
    ]
}
