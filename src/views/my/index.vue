<template>
  <div class="my-container">
      <!-- 已登录头部 -->
      <div v-if="user" class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image
              class="avatar"
              round
              fit="cover"
             
              :src="userinfo.photo"
            />
            <span class="name">{{userinfo.name}}</span>
          </div>
          <div class="right">
            <van-button size="mini" round to="/user/profile">编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <div class="count">{{userinfo.art_count}}</div>
            <div class="text">头条</div>
          </div>
          <div class="data-item">
            <div class="count">{{userinfo.follow_count}}</div>
            <div class="text">关注</div>
          </div>
          <div class="data-item">
            <div class="count">{{userinfo.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
          <div class="data-item">
            <div class="count">{{userinfo.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </div>
      </div>
      <!-- 未登录头部 -->
      <div v-else class="header not-login">
        <div class="login-btn" @click="$router.push('/login')">
          <img class="img" src="~@/assets/mobile.png" alt="">
          <span class="text">登录/注册</span>
        </div>
      </div>
      
      <!-- 导航 Grid 宫格 -->
      <van-grid class="grid-nav mb-9" :column-num="2" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
      <!-- /导航 -->

       <van-cell title="消息通知"  is-link />
       <van-cell class="mb-9" title="小智同学"  is-link />
       <van-cell 
        v-if="user"
        class="logout-cell" 
        clickable
        title="退出登录"  
        @click="onLogout" 
       />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      userinfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  // 
  created () {
    if(this.user) {
      this.loadUserInfo()
    }
   
  },
  methods: {
    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '标题',
      }).then(() => {
        // on 确认
        this.$store.commit('setUser', null)
      }).catch(() => {
        // on 取消
      })
    },
    // 获取获取用户自己的信息
    async loadUserInfo () {
      try {
       const {data} = await getUserInfo()
       this.userinfo = data.data
       console.log(data);
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试',err)
      }
    }

  }
}
</script>

<style scoped lang="less">
.my-container{
    .header{
        height: 361px;
        // background: url("../../assets/banner.png");
        // 在vuecli 创建的项目中 css中提供@别名 指向scr目录 前面加~才能用
        background: url("~@/assets/banner.png");
        background-size: cover; //将背景图片缩放填充到整个盒子中
    }
    .not-login{
      display: flex;
      align-items: center;
      justify-content: center;
      .login-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .img{
          width: 132px;
          height: 132px;
          margin-bottom: 15px;
          
        }
        .text{
          font-size: 28px;
          color: #fff;
        }
      }
    }
    .user-info{
      .base-info{
        height: 231px;
        padding: 76px 32px 23px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
       .left{
         display: flex;
         align-items: center;
          .avatar{
            width: 132px;
            height: 132px;
            margin-right: 23px;
            border: 2px solid #fff;
          }
          .name{
            font-size: 30px;
            color: #fff;
          }
        }
        
       
      }
      .data-stats{
        
        display: flex;
        .data-item{
          flex: 1;
          display: flex;
          height: 130px;
          justify-items: center;
          align-items: center;
          flex-direction: column;
         color: #fff;
         .count{
           font-size: 36px;
           }
          .text{
            font-size: 23px;
          }
        }
      }
    }
    .grid-nav{
      .grid-item{
        height: 140px;
        i.toutiao{
          font-size: 45px;
        }
        .toutiao-shoucang{
          color: #eb5253;
        }
        .toutiao-lishi{
          color: #ff9d1d;
        }
        span.text{
          font-size: 28px;
        }
      }
    }
    .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }

}
</style>px