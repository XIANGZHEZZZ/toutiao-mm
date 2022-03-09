
// 频道模块
const MY_CHANNELS = 'MY_CHANNEL'
export default {
  namespaced: true,
  state() {
    return {
      myChannels: JSON.parse(window.localStorage.getItem(MY_CHANNELS)) || [], // 用户频道
      // allChannels: [], // 全部频道
    };
  },
  getters: {},
  mutations: {
    myMutationsChannels(state, channel) {
      state.myChannels = channel;
      window.localStorage.setItem(
        'MY_CHANNELS',
        JSON.stringify(state.myChannels)
      );
    },
    removeItem (state, channel) {
      console.log(channel);
      window.localStorage.removeItem(channel)
    }
    // allMutationsChannels(state, channel) {
    //   channel.forEach((element) => {
    //     const res = state.myChannels.find((myChannel) => {
    //       return myChannel.id === element.id;
    //     });
    //     if (!res) {
    //       state.allChannels.push(element);
    //     }
    //   });
    // },
  },
  actions: {
    // 获取用户频道
    // async getMyChannels({ commit }) {
    //   const {
    //     data: {
    //       data: { channels },
    //     },
    //   } = await getUserChannels();
    //   commit('myMutationsChannels', channels);
    // },
    // // 获取全部频道
    // async actionsAllChannels({ commit }) {
    //   const {
    //     data: {
    //       data: { channels },
    //     },
    //   } = await getAllChannels();
    //   commit('allMutationsChannels', channels);
    // },
  },
};
