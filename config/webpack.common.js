// Custom files for outside configuration
const helpers = require('./helpers');
const buildUtils = require('./build-utils');

/*****  Webpack Plugins  *****/
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
/****************************/

/*****  Common Webpack Settings *****/
module.exports = function (options) {
  const isProd = options.env === 'production';
  const APP_CONFIG = require(process.env.ANGULAR_CONF_FILE || (isProd ? './config.prod.json' : './config.dev.json'));

  const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA,options.metadata || {});
  const GTM_API_KEY = process.env.GTM_API_KEY || APP_CONFIG.gtmKey;

  const ngcWebpackConfig = buildUtils.ngcWebpackSetup(isProd, METADATA);
  const supportES2015 = buildUtils.supportES2015(METADATA.tsConfigPath);

  const entry = {
    polyfills: './src/polyfills.browser.ts',
    main:      './src/main.browser.ts'
  };

  Object.assign(ngcWebpackConfig.plugin, {
    tsConfigPath: METADATA.tsConfigPath,
    mainPath: entry.main
  });

  return {
    entry: entry,
    resolve: {
      mainFields: [ ...(supportES2015 ? ['es2015'] : []), 'browser', 'module', 'main' ],
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src'), helpers.root('node_modules')],
      alias: buildUtils.rxjsAlias(supportES2015)
    },
    module: {

      rules: [
        ...ngcWebpackConfig.loaders,
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [helpers.root('src', 'styles')]
        },
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [helpers.root('src', 'styles')]
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          use: 'file-loader'
        }

      ],

    },
    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'AOT': METADATA.AOT,
        'process.env.ENV': JSON.stringify(METADATA.ENV),
        'process.env.NODE_ENV': JSON.stringify(METADATA.ENV),
        'process.env.HMR': METADATA.HMR,
        // 'FIREBASE_CONFIG': JSON.stringify(APP_CONFIG.firebase),
      }),

      new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),

      new CommonsChunkPlugin({
        minChunks: Infinity,
        name: 'inline'
      }),
      new CommonsChunkPlugin({
        name: 'main',
        async: 'common',
        children: true,
        minChunks: 2
      }),


      new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' },
        { from: 'src/meta'}
      ],
        isProd ? { ignore: [ 'mock-data/**/*' ] } : undefined
      ),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: function (a, b) {
          const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
          return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
        },
        metadata: METADATA,
        gtmKey: GTM_API_KEY,
        inject: 'body',
        xhtml: true,
        minify: isProd ? {
          caseSensitive: true,
          collapseWhitespace: true,
          keepClosingSlash: true
        } : false
      }),

      new ScriptExtHtmlWebpackPlugin({
        sync: /inline|polyfills|vendor/,
        defaultAttribute: 'async',
        preload: [/polyfills|vendor|main/],
        prefetch: [/chunk/]
      }),

      new LoaderOptionsPlugin({}),

      new ngcWebpack.NgcWebpackPlugin(ngcWebpackConfig.plugin),

      new WebpackInlineManifestPlugin(),
    ],

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
};
