const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { name } = require('./package');

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: '/',
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: `dist_${name}`,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,
  // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾
  productionSourceMap: false,
  configureWebpack: config => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, './src'),
      '@c': path.resolve(__dirname, './src/components'),
      '@p': path.resolve(__dirname, './src/pages')
    };
    if (process.env.NODE_ENV === 'production') {
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `${packageName.replace('@', '')}`;
              }
            }
          }
        },
        minimizer: [new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            compress: {
              pure_funcs: ['console.log']
            }
          }
        })]
      };
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    });
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/var.scss";'
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  // webpack-dev-server 相关配置
  devServer: { // 设置代理
    hot: true, // 热加载
    host: 'localhost', // ip地址
    port: 8080, // 端口
    https: false, // false关闭https，true为开启
    open: true, // 自动打开浏览器
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': { // 本地
        target: 'xxx',
        // 如果要代理 websockets
        ws: true,
        changeOrigin: true
      },
      '/test': { // 测试
        target: 'xxx'
      }
    }
  },
  pluginOptions: { // 第三方插件配置
    // ...
  }
};
