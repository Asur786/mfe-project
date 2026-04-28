const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath: "auto",
    clean: true,
  },
  devServer: {
    port: 3000,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        dashboard: "dashboard@http://localhost:3001/remoteEntry.js",
        settings: "settings@http://localhost:3002/remoteEntry.js",
        profile: "profile@http://localhost:3003/remoteEntry.js",
        services: "services@http://localhost:3004/remoteEntry.js",
        privacyPolicy: "privacyPolicy@http://localhost:3005/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
