<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        size="small"
        round
        type="info"
        icon="search"
      >
        搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        {{ channel.name }}
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo" @click="isPopupShow = true"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isPopupShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channels-edit
        :myChannels="channels"
        :active="active"
        @update-active="onUpdateActive"
      ></channels-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user';
import ChannelsEdit from './commponents/channels-edit.vue';
import { mapState } from 'vuex';
export default {
  name: 'HomeIndex',
  components: { ChannelsEdit },
  data() {
    return {
      active: 0,
      channels: [],
      isPopupShow: false,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
    })
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        let channels = [];
        if (this.token) {
          // 已登录
          const { data } = await getUserChannels();
          channels = data.data.channels;
        } else {
          // 未登录
          // console.log(JSON.parse(window.localStorage.getItem('MY_CHANNELS')));
          const localChannels = JSON.parse(window.localStorage.getItem('MY_CHANNELS'))
          if (localChannels) {
            channels = localChannels
          } else {
            const { data } = await getUserChannels();
            channels = data.data.channels;
          }
        }
        this.channels = channels;
      } catch (err) {
        this.$toast('获取频道数据失败');
      }
    },
    onUpdateActive(index, isPopupShow = true) {
      this.active = index;
      this.isPopupShow = isPopupShow;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  padding-top: 175px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    font-size: 28px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }

    .van-tabs__nav {
      padding-bottom: 0;
      .van-tab {
        border-right: 1px solid #edeff3;
        color: #777;
      }
      // 选中颜色
      .van-tab--active {
        color: #333;
      }
    }
    /deep/.van-tabs__wrap--scrollable .van-tab {
      min-width: 200px !important;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 3px;
      background-color: #3296fa;
    }
  }
}
</style>
