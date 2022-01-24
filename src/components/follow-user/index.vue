<template>
    <van-button 
        v-if="isFollowed"
        class="follow-btn"
        size="small"
        round
        @click="onFollow"
        :loading="followLoading"
    >已关注</van-button>

    <van-button 
        v-else
        class="follow-btn"
        size="small"
        color="#3296fa"
        icon="plus"
        round
        type="info"
        @click="onFollow"
        :loading="followLoading"
    >关注</van-button>          
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
    name: 'FollowUser',
    components: {},
    // 自定义 v-model 的数据名称
    model: {
        prop: 'isFollowed', // 默认是 value
        event: 'update-is_followed' // 默认是 input
    },
    props: {
        isFollowed: {
            type: Boolean,
            required: true
        },
        userId: {
            type: [String, Number, Object],
            required: true
        }
    },
    data () {
        return {
            followLoading: false //处理一直点击事件
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        async onFollow() {
            this.followLoading = true
            try {
                if(this.isFollowed) {
                    // 已关注，取消关注
                    await deleteFollow(this.userId)
                } else {
                    // 没有关注，添加关注
                    await addFollow(this.userId) 
                }
            // 成功之后就取反切换状态
            // this.article.is_followed = !this.article.is_followed
            this.$emit('update-is_followed',!this.isFollowed)
            } catch (err) {
                let message = '操作失败，请重试'
                if(err.response && err.response.status === 400) {
                    message = '你不能关注你自己'
                }
                this.$toast(message)
            }
            this.followLoading = false
        }
    }
}
</script>

<style lang="less" scoped>

</style>>