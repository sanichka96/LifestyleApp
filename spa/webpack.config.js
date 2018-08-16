var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        bundle: ["./src/app.jsx", "./src/styles/main.scss"],
    },
    output: {
        path: path.resolve(__dirname, './built/'),
        filename: 'out.js'
    },
    devServer: {
        inline: true,
        port: 3000,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'built')
    },
    stats: 'errors-only',
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', "react"]
                }
            }
        },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                })

            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: "./src/images/favicon.png"
        }),
        new ExtractTextPlugin('./main.css')
    ]
}