const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  performance: {
    hints: false,
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
      watch: true,
    },
    port: 9001,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public/index.html"),
      title: "React Webpack",
    }),
    new ModuleFederationPlugin({
      name: "HomeApp",
      filename: "remoteEntry.js",
      exposes: {
        "./HomePage": "./src/Home",
      },
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
