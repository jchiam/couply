const webpack = require('webpack');
const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: ['react-hot-loader/patch', './src/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'import-glob-loader']
        })
      },
      {
        test: /\.svg$/,
        use: ['babel-loader', 'react-svg-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/cloudinary': {
        target: 'http://localhost:5002/couply-67e89/us-central1/cloudinary',
        secure: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('style.css'),
    new DotenvPlugin({
      sample: '.env.example',
      path: '.env'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: 'body'
    })
  ]
};
