import { initGlobalState } from 'qiankun';
import storage from '@/common/storage';
import utils from '@/common/util/index';
import http from '@/common/http/index';
import constants from '@/common/constants/index';
import Vue from 'vue';

// 传入子应用的公共方法 组件 http
export const props = {
  publicPath: process.env.BASE_URL,
  utils, // 公共方法
  constants, // 公共常量
  storage,
  http
};

/**
 * 定义全局状态 (公共数据)
 * @param {object} state
 * */
export function initGlState (state) {
  // 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。
  const actions = initGlobalState(state);
  // 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
  actions.setGlobalState(state);
  // 在当前应用监听全局状态，有变更触发 callback fireImmediately = true 立即触发 callback
  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  }, false);
  // 移除当前应用的状态监听，微应用 umount 时会默认调用
  // actions.offGlobalStateChange();
  // 将action对象绑到Vue原型上
  Vue.prototype.$setGlobalState = actions.setGlobalState;
}
