const path                 = require('path');
const webpack              = require('webpack');
const merge                = require('webpack-merge');
const VueLoaderPlugin      = require('vue-loader/lib/plugin');
const HtmlPlugin           = require('html-webpack-plugin');

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src');

const config = {
  mode: 'production',
  target: 'web',
   entry: {
      polyfill: '@babel/polyfill',
      main: APP_DIR + '/popup.js',
    },
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR,
   },
   resolve: {
      extensions: [ '.js', '.vue' ],
      alias: {
        'vue$': 'vue/dist/vue.runtime.js',
        'vuex$': 'vuex/dist/vuex.js',
        '@': APP_DIR
      }
    },
   module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [ APP_DIR ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ APP_DIR ],
        exclude: [ 
            APP_DIR+'/background.js',
            APP_DIR+'/content.js',
            APP_DIR+'/storage.js',
            APP_DIR+'/compromise.min.js',
            APP_DIR+'/entityMap.js',
            APP_DIR+'/recommender.js'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: 'popup.html',
      chunksSortMode: 'dependency'
    })
  ],

  optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all'
      }
    }
};

module.exports = config;