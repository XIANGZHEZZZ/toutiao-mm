<template>
    <!-- 第一种方法 -->
    <!-- :to="'/article/' + article.art_id"-->
    <!-- 第二种方法 -->
    <!-- :to="`/article/${article.art_id}`-->
  <van-cell 
    class="article-item" 
    :to="{
        //根据理由名称进行跳转
        name: 'article',
        // 传递路由动态参数
        params: {
            // 属性名：路由路劲中设计的动态参数名称
            articleId: article.art_id
        }
    }"
  >
      <!-- 左边标题或头部标题 -->
      <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <!-- 底部 -->
      <div slot="label">
          <div v-if="article.cover.type === 3" class="cover-wrap">
            <div 
                class="cover-item"
                v-for="(img, index) in article.cover.images"
                :key="index"
            >
                <van-image
                    class="cover-item-img"
                    fit="cover"
                    :src="img"
                />
            </div>
             
          </div>
          <div class="label-info-wrap">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}</span>
              <span>{{article.pubdate | relativeTime}}</span>
          </div>
      </div>
      <!-- 右边图片 -->
      <van-image
        class="rigth-cover"
        fit="cover"
        v-if="article.cover.type === 1"
        slot="default"
        :src="article.cover.images[0]"
      />
  </van-cell>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: {
        article: {
            type: Object,
            required: true
        }
       
    }
}
</script>

<style lang="less" scoped>
    .article-item {
        /deep/.title{
            font-size: 32px;
            color: #3a3a3a;
        }
        .van-cell__value{
            flex: unset;
            width: 232px;
            height: 164px;
            padding-left: 25px;
        }
        .rigth-cover{
            width: 232px;
            height: 164px;
        }
        .label-info-wrap span {
            font-size: 22px;
            color: #b4b4b4;
            margin-right: 25px;
        }
        .cover-wrap{
            display: flex;
            padding: 30px 0;
            .cover-item{
                flex: 1;
                height: 146px;
               
                padding-right: 4px;
                &:last-child {
                  padding-right: 0;  
                }
                .cover-item-img{
                    width: 100%;
                    height: 164px;
                }
            }
        }
    }
</style>>
