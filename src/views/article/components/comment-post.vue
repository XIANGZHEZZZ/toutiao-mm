<template>
  <div class="comment-post">
      <van-field
        class="post-field"
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
       />
       <van-button
        class="post-btn"
        @click="onPost"
        :disabled="!message.length"
       >发布</van-button>
  </div>
</template>

<script>
import {addComments} from '@/api/comment'
export default {
    name: 'CommentPost',
    components: {},
    inject: {
        articleId: {
        type: [Number, String, Object],
        default: null
        }
    },
    props: {
        target: {
            type: [Number, String, Object],
            required: true
        }
    },
    data () {
        return {
            message: ''
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        async onPost () {
            this.$toast.loading({
                message: '发布中...',
                forbidClick: true, // 禁用背景点击
                duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
            })
            try {
               const {data} = await addComments({
                //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
                target: this.target.toString(),
                content: this.message,
                art_id: this.articleId ? this.articleId.toString() : this.articleId
               })
               console.log(data);
               // 发布成功 清空文本框
               this.message = ''
                // 发布成功 将内容传到父组件中 由父组件更新list 评论列表   
               this.$emit('post-success', data.data)
               this.$toast.success('发布成功')

            } catch (err) {
                this.$toast.fail('发布失败')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.comment-post{
    display: flex;
    padding: 32px 0 32px 32px;
    align-items: center;
    .post-field{
        background-color: #f5f7f9;
    }
    .post-btn{
        width: 150px;
        border: none;
        padding: 0;
        color: #6ba3d8;
        &::before {
            display: none;
        }
    }
}
</style>