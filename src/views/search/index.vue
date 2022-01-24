<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action 
         background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
    />
    </form>

    <!-- 搜索结果 -->
    <search-result 
      v-if="isResultShow" 
      :searchText="searchText"
    >
    </search-result>
     <!-- 搜索建议 -->
    <search-suggetion 
      v-else-if="searchText" 
      :searchText="searchText"
      @search="onSearch"
    ></search-suggetion>
    <!-- 搜索历史 -->
    <search-history 
      v-else 
      :searchHistories="searchHistories"
      @search="onSearch"
      @clear-search-histories="searchHistories = []"
     >
     </search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggetion from './components/search-suggetion.vue'
import SearchResult from './components/search-result.vue'
// 持久化更新 将监听到值传到 setItem 中 ，从本地读取 getItem 值 没有 []  
import {setItem, getItem} from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {SearchHistory, SearchSuggetion, SearchResult},
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  computed: {},
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      // 存储搜索历史记录
      // 要求：不要有重复历史记录，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      console.log(index);
      // 通过indexOf() 查找一个数组 有值 结果为0 没有值为-1 
      // 当有值是
      if(index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      // 取消事件 让取消事件返回首页
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
  .search-container{
    padding-top: 108px;
    .van-search__action{
      color: #fff;
    }
    .search-form{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
</style>