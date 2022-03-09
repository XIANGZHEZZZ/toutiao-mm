<template>
  <div class="channels-edit">
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channels, index) in myChannels"
        :key="index"
        @click="onMyChannelsClick(channels, index)"
      >
        <van-icon
          slot="icon"
          name="close"
          v-show="isEdit && !fiexChannels.includes(channels.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          channels.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channels, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channels.name"
        @click="onAddChannel(channels)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, deleteUserChannels, addUserChannels } from '@/api/channel';
import { mapState } from 'vuex';
export default {
  name: 'ChannelsEdit',
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false,
      fiexChannels: [0, 11], // 固定频道，不允许删除
    };
  },
  // 计算函数
  computed: {
    ...mapState({
      token: (state) => state.user.token,
    }),
    recommendChannels() {
      const channels = [];
      this.allChannels.forEach((channel) => {
        const res = this.myChannels.find((channels) => {
          return channel.id === channels.id;
        });
        if (!res) {
          channels.push(channel);
        }
      });
      return channels;
    },
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast('数据获取失败');
      }
    },
    // 添加频道
    async onAddChannel(channels) {
      this.myChannels.push(channels);
      if (this.token) {
        try {
          // 已登录
          await addUserChannels({
            id: channels.id, // 频道ID
            seq: this.myChannels.length
          })
        } catch (err) {}
      } else {
        // 未登录
        console.log(this.myChannels);
        this.$store.commit('channel/myMutationsChannels', this.myChannels);
      }
    },
    // 删除频道
    onMyChannelsClick(channel, index) {
      if (this.isEdit) {
        // 1. 如果是固定频道，则不删除
        if (this.fiexChannels.includes(channel.id)) {
          return;
        }
        // 2. 删除频道项
        this.myChannels.splice(index, 1);

        if (index < this.active) {
          this.$emit('update-active', this.active - 1, true);
        }
        // 4. 处理持久化
        this.deleteChannel(channel);
      } else {
        this.$emit('update-active', index, false);
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.token) {
          // 已登录，则将数据更新到线上
          await deleteUserChannels(channel.id);
        } else {
          this.$store.commit('channel/myMutationsChannels', this.myChannels);
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.channels-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    border: 1px solid #f85959;
    color: #f85959;
    font-size: 26px;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: normal;
      padding: 0;
      background-color: #f4f5f6;
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
    }
    .active {
      color: red;
    }
    .van-grid-item__text {
      margin-top: 0px;
    }
  }

  /deep/.recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 28px;
        margin-right: 6px;
      }
    }
  }
  /deep/.my-grid {
    .van-grid-item__content {
      flex-direction: row;
      position: relative;
      .van-grid-item__icon-wrapper {
        font-size: 30px;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
        z-index: 2;
      }
    }
  }
}
</style>
