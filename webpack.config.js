var path = require('path');

module.exports = {
  entry: "./src/main/js/app.jsx",
  output: {
    path: path.resolve(__dirname, './src/main/resources/built/js'),
    filename: 'out.js'
  },
  mode: 'development',
  watch: true,
  module: {
    rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', "react"]
            }
          }
        }
    ]
  }
}