import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {
  registerMicroApps,
  setDefaultMountApp,
  runAfterFirstMounted,
  addGlobalUncaughtErrorHandler,
  start
} from 'qiankun';
import { initGlState } from './glState';
import { apps } from './apps';

function registerApps () {
  /**
   * 在主应用中注册微应用
   * */
// 注册微应用匹配的路由，名称
  registerMicroApps(
    apps,
    {
      beforeLoad: [
        loadApp => {
          NProgress.start();
          console.log('before load', loadApp);
        }
      ],
      beforeMount: [
        mountApp => {
          NProgress.inc();
          console.log('before mount', mountApp);
        }
      ],
      afterMount: [
        mountApp => {
          NProgress.done();
          console.log('after mount', mountApp);
        }
      ],
      beforeUnmount: [
        mountApp => {
          console.log('before unload', mountApp);
        }
      ],
      afterUnmount: [
        unloadApp => {
          console.log('after unload', unloadApp);
        }
      ]
    }
  );
// 设置主应用启动后默认进入的微应用。
// setDefaultMountApp();
// 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
  runAfterFirstMounted(() => console.log('开启监控埋点'));
// 添加全局的未捕获异常处理器。
  addGlobalUncaughtErrorHandler(event => console.log('error：', event));
// 定义全局状态
  initGlState();
  start({
    prefetch: true, // 可选，是否开启预加载，默认为 true。
    sandbox: true, // 可选，是否开启沙箱，默认为 true。从而确保微应用的样式不会对全局造成影响。
    singular: true // 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
    // fetch: () => {}, // 可选，自定义的 fetch 方法。
    // getPublicPath: (url) => { console.log(url); },
    // getTemplate: (tpl) => { console.log(tpl); },
    // excludeAssetFilter: (assetUrl) => { console.log(assetUrl); }, // 可选，指定部分特殊的动态加载的微应用资源（css/js) 不被qiankun 劫持处理
  });
}

export default registerApps;
