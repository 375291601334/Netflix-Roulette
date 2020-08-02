const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  const isDevEnv = env === 'development';

  return {
    context: path.join(__dirname, 'src'),
    entry: './index.tsx',
    output: {
      filename: 'main.js',
      path: path.join(__dirname, 'dist'),
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts','.tsx', '.js', '.jsx'],
    },
    mode: env,
    devtool: isDevEnv ? 'inline-source-map' : 'source-map',
    ...(isDevEnv) && {
      devServer: {
        contentBase: './dist',
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
      })
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
            { loader: 'ts-loader' },
          ],
        },
        {
          test: /\.less$/,
          use: [isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: ['file-loader'],
        },
      ],
    },
  };
}
