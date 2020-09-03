"use strict";

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: ["./src/app/index.ts", "./src/app/scss/main.scss"],

  output: {
    filename: "js/bundle-[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },

  resolve: {
    // priority of lookup -> left to right
    modules: ["src", "node_modules"]
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          },
        }
      },
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)$/i,
        use: ["file-loader"],
      }
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        { from: './src/app/assets', to: 'assets' }
      ]
    }),

    new HtmlWebpackPlugin({
      title: 'Title',
      template: 'src/templates/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    
    new ForkTsCheckerWebpackPlugin()
  ]
};