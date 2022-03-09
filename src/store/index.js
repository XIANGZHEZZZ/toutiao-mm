import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import channel from './modules/channel';
// 导入封装本地存储操作模块
// import { setItem, getItem } from '@/utils/storage';
Vue.use(Vuex);

// const TOKEN_KEY = 'TOUTIAO_USER';

export default new Vuex.Store({
  state: {
    // // 用一个对象，存储当前登录用户信息（token 等信息） 存储的时候用的是字符串类型 转成为对象 JSON.parse()
    // // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // user: getItem(TOKEN_KEY),
  },
  mutations: {
    // setUser(state, data) {
    //   state.user = data;
    //   // 为了防止刷新丢失数据，需要把数据备份到本地存储 存储格式为字符串类型 JSON.stringify()
    //   // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    //   setItem(TOKEN_KEY, state.user);
    // },
  },
  actions: {},
  modules: {
    user,
    channel
  },
});
