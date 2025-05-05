const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinifierPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'web/dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                },
            },
            {
                test: /\.scss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'fonts/[name].[ext]',
                    },
                  },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinifierPlugin()
        ]
    }
}