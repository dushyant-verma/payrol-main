/* eslint-disable no-unused-vars */
const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OpenPlugin = require("open-webpack-plugin");
const port = 3000;
const publicPath = "/";
// const publicPath = "/react/template";

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  // devServer: {

  // },

  externals: {
    config: JSON.stringify({
      apiUrl: "",
      publicPath: "/react/template/",
    }),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      Assets: path.resolve(__dirname, "src/assets/"),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenPlugin({ url: `http://localhost:${port}` }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      filename: "./index.html",
      favicon: "./public/favicon.png",
    }),
    new MiniCssExtractPlugin({
      // plugin for controlling how compiled css will be outputted and named
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "css/*.*",
        "js/*.*",
        "fonts/*.*",
        "images/*.*",
      ],
    }),
    // new TerserPlugin({
    //   terserOptions: {
    //     compress: false,
    //     mangle: true,
    //   },
    // }),
  ],
};
