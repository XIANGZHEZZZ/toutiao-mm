/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// import store from '@/store'

// 登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data: data
    })
}
// 验证手机号码 带参数 手机号
export const sendSms = mobile => {
    return request({
        method: 'GET',
        // url: '/v1_0/sms/codes/'+mobile,
        url: `/v1_0/sms/codes/${mobile}`,
    }) 
}
// 获取用户自己的信息 
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    }) 
}