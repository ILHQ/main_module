import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import registerApps from '@/qiankun/index';
import '@/styles/base.scss';

Vue.config.productionTip = false;

registerApps();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#main-app');
