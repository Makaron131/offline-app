const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = (env, argv) => {
  return {
    mode: "development",
    entry: {
      app: ["./src/index.tsx"],
    },
    output: {
      filename: "[name].[hash].js",
      chunkFilename: "[name].[hash].js",
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd", // 采用通用模块定义
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", "json"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                babelrc: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|woff2?)$/,
          use: [
            {
              loader: "url-loader",
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: "file-loader",
        },
        {
          test: /\.css/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.less$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "sls-[name]-[local]",
                },
              },
            },
            "less-loader",
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new CopyWebpackPlugin({
        patterns: ["public/manifest.json"],
      }),
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        additionalManifestEntries: [
          {
            url: "index.html",
            revision: null, // version: hash or timestamp?
          },
        ],
      }),
    ],
    devServer: {
      compress: true,
      port: 9001,
    },
  };
};
