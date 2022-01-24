<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
          <follow-user
            class="follow-btn"
            v-model="article.is_followed"
            :user-id="article.aut_id"
          />
        </van-cell>
         <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表  article.art_id 文章id-->
        <comment-list
          :source="article.art_id"
          :list="commentList"
          @onload-success="totalCommentCount = $event.total_count"
					@reply-click="onReplyClick"
        />
        <!-- /文章评论列表 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
          >写评论</van-button>

          <van-icon
            class="comment-icon"
            name="comment-o"
            :badge="totalCommentCount"
          />

          <collections-article
            class="btn-item"
            v-model="article.is_collected"
            :article-id="article.art_id"
          />

          <likings-article
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>

        </div>
        <!-- /底部区域 -->
        <!-- 发布评论 -->
        <van-popup 
          v-model="isPostShow"
          position="bottom"
        >
          <comment-post
            :target="article.art_id"
            @post-success = "onPostSuccess"
          ></comment-post>

        </van-popup>
        <!-- 发布评论 -->
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->
      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button
          class="retry-btn"
          @click="loadArticle"
        >点击重试</van-button>
      </div> 
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

		<!-- 发布评论 -->
        <van-popup 
          v-model="isReplyShow"
          position="bottom"
					style="height: 100%"
        >
					<!--
					v-if 条件渲染
						true：渲染元素节点
						false：不渲染
				-->
          <comment-reply 
						v-if="isReplyShow"
						:comment="currentComment" 
						@close="isReplyShow=false"
						@reply-click="onReplyClick"
					></comment-reply>
        </van-popup>
    <!-- 发布评论 -->

    

    
  </div>
</template>

<script>
import { getArticlesById } from '@/api/article'
// 预览图片组件
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CommentList from './components/comment-list.vue'
import CollectionsArticle from '@/components/collections-article'
import LikingsArticle from '@/components/likings-article'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: { 
    FollowUser, 
    CommentList,
    CollectionsArticle,
    LikingsArticle,
    CommentPost,
		CommentReply
  },
	// 给所有的后代组件提供数据
  // 注意：不要滥用
	provide: function () {
		return {
			articleId: this.articleId 
		}
	},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
      return {
        loading: true, // 加载中的 loading 状态
        article: {}, // 文章详情
        errStatus: 0, // 失败的状态码
        totalCommentCount: 0, // 评论文章总数
        isPostShow: false, // 控制发布评论的显示状态
        commentList: [], // 评论列表
				isReplyShow: false, // 控制回复评论的显示状态
				currentComment: {} // 当前点击回复的评论项
      }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      // 展示 loading 加载中
      this.loading = true
      try {
        const { data } = await getArticlesById(this.articleId)
        // 数据驱动视图这件事儿不是立即的
        this.article = data.data
        console.log(this.article);
        // 初始化图片点击预览
        // console.log(this.$refs['article-content']) 
        // 结果 undefined 是因为还没加载到文章 需要开启定时器
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      // 无论成功还是失败，都需要关闭 loading
      this.loading = false        
    },
    previewImage () {
      // 得到所有的 img 节点
      const articleContent = this.$refs['article-content']
      // console.log(articleContent);
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs);
      const images = []
      imgs.forEach((img, index) => {
        // console.log(img, index);
        images.push(img.src)
        // 给每个 img 注册点击事件，在处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置，从 0 开始
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (data) {
      // 关闭弹出层
      this.isPostShow = false
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
			this.totalCommentCount++
    },
		onReplyClick (comment) {
			console.log('comment', comment);
			this.isReplyShow = true
			this.currentComment = comment
		}
  }
}
</script>

<style lang="less" scoped>
@import "./github-markdown.css";
.article-container{
  .main-wrap{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    .loading-wrap {
      padding: 200px 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }
    .article-detail{
      position: fixed;
      left: 0;
      right: 0;
      top: 92px;
      bottom: 88px;
      overflow-y: scroll;
      background-color: #fff;
      .article-title{
        font-size: 40px;
        padding: 50px 32px;
        margin: 0;
        color: #3a3a3a;
      }
      .user-info{
        .avatar{
          width: 70px;
          height: 70px;
          margin-right: 17px;
        }
        .van-cell__label {
          margin-top: 0; 
        }
        .user-name {
        font-size: 24px;
        color: #3a3a3a;
        }
        .publish-date {
          font-size: 23px;
          color: #b7b7b7;
        }
        .follow-btn {
          width: 170px;
          height: 58px;
        }
      }
      .article-content {
        padding: 55px 32px;
        /deep/ p {
          text-align: justify;
        }
      }
      .article-bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        height: 88px;
        border-top: 1px solid #d8d8d8;
        background-color: #fff;
        .comment-btn{
          width: 282px;
          height: 46px;
          border: 2px solid #eeeeee;
          font-size: 30px;
          line-height: 46px;
          color: #a7a7a7;
        }
        /deep/ .van-icon {
          font-size: 40px;
        }
        .comment-icon {
          top: 2px;
          color: #777;
          .van-info {
            font-size: 16px;
            background-color: #e22829;
          }
        }
        .btn-item{
          border: none;
          height: 40px;
          line-height: 40px;
          color: #777777;
          padding: 0;
        }
      }
    }
    .error-wrap {
      padding: 200px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .van-icon {
        font-size: 122px;
        color: #b4b4b4;
      }
      .text {
        font-size: 30px;
        color: #666666;
        margin: 33px 0 46px;
      }
      .retry-btn {
        width: 280px;
        height: 70px;
        line-height: 70px;
        border: 1px solid #c3c3c3;
        font-size: 30px;
        color: #666666;
      }
    }
  }
}
</style>

