// Custom files for outside configuration
const helpers = require('./helpers');
const buildUtils = require('./build-utils');

// Webpack Configurations
const webpackMerge = require('webpack-merge');         // Used to merge Webpack Settings
const commonConfig = require('./webpack.common.js');   // Common Webpack Settings

/*****  Webpack Plugins  *****/
/**/ const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
/**/ const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
/**/ const EvalSourceMapDevToolPlugin = require('webpack/lib/EvalSourceMapDevToolPlugin');
/****************************/

/*****  Development Webpack Settings *****/
module.exports = function (options) {
  const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
  const HOST = process.env.HOST || 'localhost';
  const PORT = process.env.PORT || 3000;

  const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: helpers.hasProcessFlag('hot'),
    PUBLIC: process.env.PUBLIC_DEV || HOST + ':' + PORT
  });

  return webpackMerge(commonConfig({ env: ENV, metadata: METADATA  }), {
    output: {
      path: helpers.root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js',
      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    module: {

      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [helpers.root('src', 'styles')]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [helpers.root('src', 'styles')]
        },

      ]

    },

    plugins: [
      new EvalSourceMapDevToolPlugin({
        moduleFilenameTemplate: '[resource-path]',
        sourceRoot: 'webpack:///'
      }),

      new NamedModulesPlugin(),

      new LoaderOptionsPlugin({
        debug: true,
        options: { }
      }),

    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      hot: METADATA.HMR,
      public: METADATA.PUBLIC,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      },
      setup: function(app) {
				/**  Node Endpoints  **/

      }
    },

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      fs: 'empty'
    }

  });
};
