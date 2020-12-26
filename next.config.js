const withCSS = require('@zeit/next-css');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = withCSS({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/films', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },

  webpack(config) {
    config.plugins.push(new MiniCssExtractPlugin());

    config.module.rules.push({
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]___[hash:base64:5]'
            },
          },
        },
        'less-loader'
      ],
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|ico)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/files',
            outputPath: 'static/files'
          },
        },
      ],
    });
    return config;
  },
});
