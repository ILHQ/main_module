import * as types from '../mutation-types';

// init state
const state = {
  userInfo: {}
};

// getters
const getters = {
  userInfo: state => state.userInfo
};

// actions
const actions = {
};

// mutations
const mutations = {
  [types.AUTH_SET_USER](state, userInfo) {
    state.userInfo = userInfo;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
