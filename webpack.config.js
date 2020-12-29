const path = require('path');
const webpack = require('webpack');

const paths = (() => {
  const root = __dirname;
  return {
    root,
    src: path.join(root, 'src'),
    out: path.join(root, 'app', 'js'),
    nodeModules: path.join(root, 'node_modules')
  };
})();

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  bail: isProduction,
  mode: isProduction ? 'production' : 'development',
  entry: {
    contentScript: path.join(paths.src, 'contentScript.ts')
  },
  output: {
    path: paths.out,
    filename: '[name].js'
  },
  devtool: isProduction ? false : 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: paths.src,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
