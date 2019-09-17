const path = require('path');

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
  bail: true,
  mode: isProduction ? 'production' : 'development',
  entry: {
    contentScript: path.join(paths.src, 'contentScript.js')
  },
  output: {
    path: paths.out,
    filename: '[name].js'
  },
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths.src,
        use: 'babel-loader'
      }
    ]
  }
};
