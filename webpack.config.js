//entry -> output
const path = require("path");
console.log(path.join(__dirname, "public"));
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader',
          'css-loader',
          // 'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-loader'
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, "public")
  }
};