const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
      popup: path.join(srcDir, 'popup.tsx'),
      options: path.join(srcDir, 'options.tsx'),
      background: path.join(srcDir, 'background.ts'),
      content_script: path.join(srcDir, 'content_script.tsx'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: (chunk) => chunk.name !== 'background',
                    minChunks: 2,
                    priority: 10,
                },
                // New cache group to consolidate all CSS into a single 'styles' chunk
                allStyles: {
                    name: 'styles', // This chunk will be named 'styles'
                    type: 'css/mini-extract', // Target only CSS modules
                    chunks: 'all', // Consider all CSS from all entry points
                    enforce: true, // Force the creation of this chunk
                    priority: 20, // Higher priority to ensure it processes CSS modules
                }
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "public" }],
            options: {},
        }),
      new MiniCssExtractPlugin({
          filename: "../css/[name].css", // e.g., ../css/styles.a1b2c3d4.css
      }),
    ],
};
