<template>
    <van-button
        :icon="isCollected ? 'star' : 'star-o'"
        :class="{collected: isCollected}"
        @click="onCollections"
        :loading="loading"
    ></van-button>     
</template>

<script>
import { addCollections, deleteCollections } from '@/api/article'

export default {
    name: 'CollectionsArticle',
    components: {},
    model: {
        prop: 'isCollected',
        event: 'update-is_collected'
    },
    props: {
       isCollected: {
           type: Boolean,
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
       async onCollections() {
           this.loading = true
           try {
               if(this.isCollected) {
                //    取消收藏文章
                   await deleteCollections(this.articleId)
               } else {
                //    收藏文章
                   await addCollections(this.articleId)
               }
            //    更新图标状态
            this.$emit('update-is_collected', !this.isCollected)
            // 提示消息
            this.$toast.success(!this.isCollected ? '收藏成功' : '取消收藏')
           } catch (err) {
               this.$toast.fail('操作失败，请重试！')
           }
           this.loading = false
       }
        
    }
}
</script>

<style lang="less" scoped>
.collected{
    .van-icon {
        color: #ffa500;
    }
}
</style>>