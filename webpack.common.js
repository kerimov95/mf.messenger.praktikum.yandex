const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: './src/app/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app-[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'components': path.resolve(__dirname, 'src/app/components/'),
      'modules': path.resolve(__dirname, 'src/app/modules/'),
      'utilities': path.resolve(__dirname, 'src/app/utilities/'),
      'api': path.resolve(__dirname, 'src/app/api/'),
      'pages': path.resolve(__dirname, 'src/app/pages/'),
      '@': path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
  ],
};
