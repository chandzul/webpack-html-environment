const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                    publicPath: "/dist"
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home Project Demo 1',
            minify: {
                collapseWhitespace: false
            },
            hash: true,
            excludeChunks: ['contact'],
            filename: 'index.html', // nombre y ubucacion del archivo a crearse
            template: './src/index.pug' // template
        }),
        new HtmlWebpackPlugin({
            title: 'Contact Project Demo',
            minify: {
                collapseWhitespace: false
            },
            hash: true,
            chunks: ['contact'],
            filename: 'contact.html', // nombre y ubucacion del archivo a crearse
            template: './src/contact.pug' // template
        }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: false,
            allChunks: true
        })
    ]
}