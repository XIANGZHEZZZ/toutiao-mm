<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article';
import ArticleItem from '@/components/article-item';
export default {
  name: 'ArticleList',
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      refreshSuccessText: '刷新成功',
    };
  },
  created() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(), // 时间戳
        });
        //  if(Math.random() > 0.5) {
        //    JSON.parse('dsnajndjsa')
        //  }
        const { results } = data.data;

        //  数组的展开操作符， 会把每一个数据元素拿出来
        this.list.push(...results);
        //  本次加载数据结束之后要把加载状态设置为结束
        this.loading = false;
        //  判断数据是否加载完成
        if (results.length) {
          //  更新下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          //  没有数据了，将 finished 设置为 true 不再 loading 加载更多
          this.finished = true;
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true;
        //  请求失败了，loading 也需要关闭
        this.loading = false;
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        // 1 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(), // 时间戳
        });
        //    if(Math.random() > 0.5) {
        //    JSON.parse('dsnajndjsa')
        //  }
        // 2 将数据追加到列表顶部
        const { results } = data.data;
        this.list.unshift(...results);
        // 3 关闭下拉刷新的 loading 状态
        this.isLoading = false;

        this.refreshSuccessText = `刷新成功，更新了${results.length}数据`;
      } catch (err) {
        // 展示错误提示状态
        this.refreshSuccessText = `刷新失败`;
        //  请求失败了，loading 也需要关闭
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 80vh;
  overflow-y: auto;
}
</style>
