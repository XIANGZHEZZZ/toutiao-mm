<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="已显示全部评论"
    :error="error" 
    error-text="加载失败，请点击重试"
    @load="onLoad"
    :immediate-check="false"
  >
    <comment-item 
      v-for="(item, index) in list"
      :key="index" 
      :comment="item"
			@reply-click="$emit('reply-click', $event)"
    ></comment-item>
    <!-- <van-cell 
      v-for="(item, index) in list" 
      :key="index" 
      :title="item.content" 
    /> -->
  </van-list>
</template>

<script>
import {getComments} from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
    name: 'CommentList',
    components: {
      CommentItem
    },
    props: {
      source: {
        type: [Number, String, Object],
        required: true
      },
      type: {
        type: String,
        // 自定义 Prop 数据验证
        validator (value) {
          return ['a', 'c'].includes(value)
        },
        default: 'a'
      },
      list: {
        type: Array,
        default: () => []
      }
    },
    data () {
        return {
          // list: [],
          loading: false,
          finished: false,
          offset: null, //获取下一页数据的标记
          limit: 10,
          error: false // 报错信息
          
        }
    },
    computed: {},
    watch: {},
    created () {
      // 当你手动初始 onLoad 的话，它不会自动开始初始的 loading
      // 所以我们要手动的开启初始 loading
      this.loading = true
      this.onLoad()
    },
    mounted () {},
    methods: {
      async onLoad() {
          try {
            // 获取文章的评论和获取评论的回复是同一个接口
            // 唯一的区别是接口参数不一样
            //    type
            //      a 文章的评论
            //      c 评论的回复
            //    source
            //      文章的评论，则传递文章的 ID
            //      评论的回复，则传递评论的 ID
            const {data} =  await getComments({
              type: this.type,
              source: this.source.toString(), // 源id，文章id或评论id
              offset: this.offset,
              limit: this.limit
            })

            // 2. 将数据添加到列表中
            const {results} = data.data
            this.list.push(...results)

            // 把文章评论的总数量传递到外部
            this.$emit('onload-success', data.data)

            // 3. 将 loading 设置为 false
            this.loading = false

            // 4. 判断是否还有数据
            if (results.length) {
              // 有就更新获取下一页的数据页码
              this.offset = data.data.last_id
            } else {
              // 没有就将 finished 设置结束
              this.finished = true;
            }
            
          } catch (err) {
            this.error = true
            this.loading = false
          }

        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        // setTimeout(() => {
        //   for (let i = 0; i < 10; i++) {
        //     this.list.push(this.list.length + 1);
        //   }

          // 加载状态结束
          // this.loading = false;

          // 数据全部加载完成
        //   if (this.list.length >= 40) {
        //     this.finished = true;
        //   }
        // }, 1000);
      },
    }
}
</script>

<style lang="less" scoped>

</style>