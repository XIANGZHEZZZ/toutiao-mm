<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell 
        v-for="(item, index) in list" 
        :key="index" 
        :title="item.title"
        :to="{
          //根据理由名称进行跳转
          name: 'article',
          // 传递路由动态参数
          params: {
              // 属性名：路由路劲中设计的动态参数名称
              articleId: item.art_id
          }
        }"
      />
    </van-list>
  </div>
</template>

<script>
import { searchResult } from '@/api/search'
export default {
    name: 'SearchResult',
    components: {},
    props: {
      searchText: {
        type: String,
        required: true
      }
    },
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            perPage: 10,
            error: false
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: { 
      async onLoad() {
        try {
          const {data} = await searchResult({
            page: this.page,
            per_page: this.perPage,
            q: this.searchText
          })
          // if (Math.random() > 0.5) {
          //   JSON.parse('ddddd')
          // }
          const { results } =data.data
          this.list.push(...results);
          this.loading = false;
          if(results.length) {
            this.page++
          } else {
            this.finished = true;
          }
        } catch (err) {
          this.error = true
          this.loading = false;
        }
      }
    }
}
</script>

<style lang="less" scoped>

</style>>