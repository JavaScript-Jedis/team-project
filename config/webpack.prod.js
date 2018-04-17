// Custom files for outside configuration
const helpers = require('./helpers');
const buildUtils = require('./build-utils');

// Webpack Configurations
const webpackMerge = require('webpack-merge');         // Used to merge Webpack Settings
const commonConfig = require('./webpack.common.js');   // Common Webpack Settings

/*****  Webpack Plugins  *****/
/**/ const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
/**/ const ExtractTextPlugin = require('extract-text-webpack-plugin');
/**/ const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin')
/**/ const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
/**/ const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
/**/ const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/****************************/

/*****  Production Webpack Settings *****/
function getUglifyOptions (supportES2015) {
  const uglifyCompressOptions = {
    pure_getters: true,
    passes: 3
  };

  return {
    ecma: supportES2015 ? 6 : 5,
    warnings: false,
    ie8: false,
    mangle: true,
    compress: uglifyCompressOptions,
    output: {
      ascii_only: true,
      comments: false
    }
  };
}

module.exports = function (env) {
  const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
  const supportES2015 = buildUtils.supportES2015(buildUtils.DEFAULT_METADATA.tsConfigPath);
  const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
    ENV: ENV,
    HMR: false
  });

  METADATA.envFileSuffix = METADATA.E2E ? 'e2e.prod' : 'prod';

  return webpackMerge(commonConfig({ env: ENV, metadata: METADATA }), {
    output: {
      path: helpers.root('dist'),
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[name].[chunkhash].chunk.js'
    },

    module: {

      rules: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
          include: [helpers.root('src', 'styles')]
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader'
          }),
          include: [helpers.root('src', 'styles')]
        },

      ]

    },
    plugins: [

      new SourceMapDevToolPlugin({
        filename: '[file].map[query]',
        moduleFilenameTemplate: '[resource-path]',
        fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
        sourceRoot: 'webpack:///'
			}),

      new ExtractTextPlugin('[name].[contenthash].css'),

      new PurifyPlugin(), /* buildOptimizer */

      new HashedModuleIdsPlugin(),
      new ModuleConcatenationPlugin(),
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        uglifyOptions: getUglifyOptions(supportES2015)
      }),

      /**
       * Plugin: CompressionPlugin
       * Description: Prepares compressed versions of assets to serve
       * them with Content-Encoding
       *
       * See: https://github.com/webpack/compression-webpack-plugin
       */
      //  install compression-webpack-plugin
/*      new CompressionPlugin({
        regExp: /\.css$|\.html$|\.js$|\.map$/,
        threshold: 2 * 1024
      })*/

    ],

    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      fs: 'empty'
    }

  });
};
