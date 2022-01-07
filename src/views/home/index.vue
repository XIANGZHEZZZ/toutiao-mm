<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
        <van-button 
            class="search-btn"
            slot="title" 
            size="small"
            round 
            type="info"
            icon="search"
        >
            搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
<!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
<!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
    data() {
        return {
        active: 0,
        };
    },
}
</script>

<style scoped lang="less">
.home-container{
    /deep/.van-nav-bar__title{
        max-width: unset;
    }
    .search-btn{
        width: 555px;
        height: 64px;
        font-size: 28px;
        background-color: #5babfb;
        border: none;
        .van-icon{
            font-size: 32px;
        }
    }
    .channel-tabs{
         /deep/.van-tabs__nav{
            padding-bottom: 0;
        }
        .van-tab {
            width: 200px;
            height: 82px;
            
        }
    }
}
</style>