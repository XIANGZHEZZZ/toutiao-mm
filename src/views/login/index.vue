<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"
    >
    <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <!-- 
        表单验证：
         1 给 van-field 组件配置 rules 验证规则

         2 当表单提交的时候会自动触发表单验证
           如果验证通过，会触发 submit 事件
           如果验证失败，不会触发 submit 
     -->
    <van-form @submit="onSubmit" ref="loginForm">
        <van-field
            v-model="user.mobile"
            name="mobile"
            placeholder="请输入手机号"
            :rules="userFormRules.mobile"
            type="number"
            maxlength="11"
         >
            <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
            v-model="user.code"
            name="code"
            placeholder="请输入验证码"
            :rules="userFormRules.code"
            type="number"
            maxlength="6"
        >yanzgen
            <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
            <template #button>
                <!-- 
                    time:  倒计时时间
                 -->
                <van-count-down  v-if="isCountDownShow" :time="1000 * 60" format="ss s"  @finish = "isCountDownShow = false"/>
                <van-button v-else native-type="button" class="sen-sms-btn " round size="small" type="default" @click="onSendSms">发送验证码</van-button>
            </template>
        </van-field>
        <div class="login-btn-wrap">
            <van-button  class="login-btn"  block type="info" native-type="submit">登录</van-button>
        </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
    name: 'LoginIndex',
    data() {
        return {
            user: {
                mobile: '',
                code: ''
            },
            userFormRules: {
                mobile: [{ 
                   required: true, 
                   message: '手机号码不能为空' 
                }, {
                   pattern: /^1[3|5|7|8]\d{9}$/,
                   message: '手机号码格式错误'  
                }],
                code: [{ 
                    required: true, 
                    message: '验证码不能为空' 
                },{
                   pattern: /^\d{6}$/,
                   message: '验证码格式错误' 
                }]
            },
            isCountDownShow: false
        };
    },
    methods: {

       async onSubmit() {
            //1 获取表单数据
            const user = this.user
            
           // 2 表单验证

          //  在组件中必须通过 this.$toast 来调用 Toast 组件 
            this.$toast.loading({
                message: '登录中...',
                forbidClick: true, //禁用背景点击
                duration: 0 // 持续时间，默认是2000，如果为0则持续展示
            });

           // 3 提交表单请求登录
            try{
                // console.log(login);
                const {data} = await login(user)
                this.$toast.success('登录成功')
                this.$store.commit('setUser', data.data)
                // 登录成功跳转
                this.$router.push('/my')
            } catch (err) {
                if(err.response.status === 400) {
                    this.$toast.fail('手机号或验证码错误')
                } else {
                    this.$toast.fail('登录失败,请稍后重试')
                }
            }
           // 4 根据请求响应结果处理后续操作
        },
        // 发送验证码
        async onSendSms() {
            // 1 校验手机号
            try{
                await this.$refs.loginForm.validate('mobile');
                console.log('验证成功');
            } catch (err) {
                return console.log('验证失败', err);
            }
            // 2 验证通过，显示倒计时
            this.isCountDownShow = true
            // 3 请求发送验证
            try {
            //   console.log(sendSms);
              await sendSms(this.user.mobile)
              this.$toast('发送成功')
            } catch (err) {
            //  发送失败， 关闭倒计时
             this.isCountDownShow = false
             if(err.response.status === 429) {
                    this.$toast('发送太频繁了，请稍后重试')
                } else {
                    this.$toast('发送失败,请稍后重试')
                }
            } 
        }    
        
    },
}
</script>

<style scoped lang="less">
.login-container{
    .toutiao{
        font-size: 37px;
    }

    .sen-sms-btn {
        background-color: #ededed;
        color: #666;
    }
    .login-btn-wrap {
        padding: 53px 33px;
        .login-btn{
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>