const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

require("dotenv-flow").config();

const { HOME_APP_HOST, CONTACT_APP_HOST } = process.env;

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
    port: 9000,
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
      name: "App",
      remotes: {
        HomeApp: `HomeApp@${HOME_APP_HOST}/remoteEntry.js`,
        ContactApp: `ContactApp@${CONTACT_APP_HOST}/remoteEntry.js`,
      },
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
