<template>
    <van-button
        :icon="articleAttitude === 1 ? 'good-job' : 'good-job-o'"
        :class="{likings: articleAttitude === 1}"
        @click="onLikings"
        :loading="loading"
        
    ></van-button> 

    <!-- <van-button 
        v-if="value === 1"
        @click="onLikings"
        :loading="loading"
        icon="good-job"
    ></van-button>

    <van-button 
        v-else
        @click="onLikings"
        :loading="loading"
        icon="good-job-o"
    ></van-button> -->
</template>

<script>
import { addLikings, deleteLikings } from '@/api/article'

export default {
    name: 'LikingsArticle',
    components: {},
    model: {
        prop: 'articleAttitude',
        event: 'update-is_attitude'
    },
    props: {
       articleAttitude: {
           type: Number,
           required: true
       },
       articleId: {
           type: [Number, String, Object],
           required: true
       }
    },
    data () {
        return {
           loading: false
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
       async onLikings() {
           this.loading = true
           try {
               let status = -1
               if(this.articleAttitude === 1) {
                //    取消收藏文章
                   await deleteLikings(this.articleId)
               } else {
                //    收藏文章
                   await addLikings(this.articleId)
                   status = 1
               }
            //    更新图标状态
            this.$emit('update-is_attitude', status)
            // 提示消息
            this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
           } catch (err) {
               console.log(err);
               this.$toast.fail('操作失败，请重试！')
           }
           this.loading = false
       }
        
    }
}
</script>

<style lang="less" scoped>
.likings{
     color: #e5645f !important;
     z-index: 1;
}
</style>>