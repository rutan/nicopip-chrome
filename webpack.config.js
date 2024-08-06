import * as path from 'node:path';
import webpack from 'webpack';

const paths = (() => {
  const __dirname = new URL('.', import.meta.url).pathname;
  const root = __dirname;
  return {
    root,
    src: path.join(root, 'src'),
    out: path.join(root, 'app', 'js'),
    nodeModules: path.join(root, 'node_modules'),
  };
})();

const isProduction = process.env.NODE_ENV === 'production';

export default {
  bail: isProduction,
  mode: isProduction ? 'production' : 'development',
  entry: {
    contentScript: path.join(paths.src, 'contentScript.ts'),
    inject: path.join(paths.src, 'inject.ts'),
  },
  output: {
    path: paths.out,
    filename: '[name].js',
  },
  devtool: isProduction ? false : 'cheap-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: paths.src,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
    }),
  ],
};
