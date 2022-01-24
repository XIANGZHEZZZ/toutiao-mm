<template>
  <div class="channels-edit">
      <van-cell>
          <div slot="title" class="title-text">我的频道</div>
          <van-button 
            class="edit-btn" 
            round 
            size="mini"
            @click="isEdit = !isEdit"
          >{{isEdit ? '完成' : '编辑'}}</van-button>
      </van-cell>
      <van-grid :gutter="10" class="my-grid">
        <van-grid-item 
            class="grid-item"
            v-for="(channels, index) in myChannels" :key="index"  
            @click="onMyChannelsClick(channels, index)"
        >
            <van-icon 
                slot="icon" 
                name="close" 
                v-show="isEdit && !fiexChannels.includes(channels.id)"
            ></van-icon>
            <span 
                slot="text"
                class="text"
                :class="{active: index===active}"
            >{{channels.name}}</span>
        </van-grid-item>
      </van-grid>

      <!-- 频道推荐 -->
        <van-cell>
            <div slot="title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" class="recommend-grid">
            <van-grid-item 
                class="grid-item"
                v-for="(channels, index) in recommendChannels" :key="index" 
                icon="plus"
                :text="channels.name" 
                @click="onAddChannel(channels)"
            />
        </van-grid>
      <!-- /频道推荐 -->
  </div>
</template>

<script>
import {getAllChannels, addUserChannels, deleteUserChannels} from '@/api/channel'
import {mapState} from 'vuex'
import {setItem} from '@/utils/storage'
export default {
 name: 'ChannelsEdit',
 props: {
     myChannels: {
         type: Array,
         required: true
     },
     active: {
         type: Number,
         required: true
     }
 },
 data () {
     return {
         allChannels: [], //所有频道
         isEdit: false,
         fiexChannels: [0,11] //固定频道，不允许删除
     }
 },
 //计算函数
 computed: {
     ...mapState(['user']),

     recommendChannels () {
        //  数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中
        return this.allChannels.filter(channel => {
            // 数组 find 方法：遍历数组，把符合条件的第一个元素返回
             return !this.myChannels.find(myChannel => {
                return  myChannel.id === channel.id
             })
         })

        //  const channels = []
        //  this.allChannels.forEach(channel => {
        //     const ret = this.myChannels.find(myChannel => {
        //         // 删除全部频道里的我的频道 用id 判断 
        //         return  myChannel.id === channel.id 
        //     })
        //     if(!ret) {
        //         channels.push(channel)
        //     } 
        //  })
        //  return channels
     }
 },
 created () {
     this.loadAllChannels()
 },
 methods: {
    async loadAllChannels() {
         try {
            const {data} = await getAllChannels()
            console.log(data);
            this.allChannels = data.data.channels
         } catch (err) {
             this.$toast('数据请求失败')
         }
    },
    async onAddChannel(channels) {
        this.myChannels.push(channels)
        // 持久化存储数据 分两种 1登录状态下存储 2未登录状态下存储 根据 user.token 判断登录
        try {
            if(this.user) {
                // 登录状态下
                await addUserChannels({
                    id: channels.id,
                    seq: channels.length
                })
            } else {
                // 未登录状态下
                setItem('TOUTIAO_CHANNELS', this.myChannels)
                }
        } catch (err) {
            this.$toast('操作失败，请稍后重试')
        }
    },
    onMyChannelsClick(channels, index) {
        if(this.isEdit) {
            // 固定数组，则不删除
            if(this.fiexChannels.includes(channels.id)) {
                // console.log(this.fiexChannels.includes(channels.id),'channels');
                return
            }
            // 编辑状态，执行删除频道
            // 参数1：要删除的元素的开始索引 （包括自己）
            // 参数2：删除的个数，如果不指定，则从参数1开始一直删除
            if(index <= this.active) {
                // 让激活频道的索引 -1
                this.$emit('update-acticle', this.active-1, true)
            }
            // 删除用户频道
            this.myChannels.splice(index, 1)
            this.deleteChannels(channels)
           
        } else {
             // 非编辑状态，执行切换频道
             this.$emit('update-acticle', index, false)
        }
    },
    async deleteChannels(channels) {
        try {
            if(this.user) {
                await deleteUserChannels(channels.id)
            } else {
                setItem('TOUTIAO_CHANNELS', this.myChannels)
            }
        } catch (err) {
            this.$toast('操作失败，请稍后重试')
        }
    }
 }
}
</script>

<style lang="less" scoped>
.channels-edit {
    padding: 85px 0;
    .title-text{
        font-size: 32px;
        color: #333;
    }
    .edit-btn{
        width: 104px;
        height: 48px;
        border: 1px solid #f85959;
        color: #f85959;
        font-size: 26px;
    }
    /deep/.grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
            white-space: normal;
            padding: 0;
            background-color: #f4f5f6;
        }
        .van-grid-item__text, .text {
            font-size: 28px;
            color: #222;
        }
        .active {
            color: red;
        }
        .van-grid-item__text{
              margin-top: 0px; 
           }

    }
    
    /deep/.recommend-grid{
        .van-grid-item__content {
           flex-direction: row;
           .van-grid-item__icon {
               font-size: 28px;
               margin-right: 6px;
           }
        }
    }
    /deep/.my-grid{
        .van-grid-item__content {
           flex-direction: row;
           position: relative;
           .van-grid-item__icon-wrapper{
              font-size: 30px;
               width: 30px;
               height: 30px;
               position: absolute;
               right: 0;
               top: 0;
               transform: translate(50%,-50%);
               z-index: 2;
           }
        }
    }
}
</style>