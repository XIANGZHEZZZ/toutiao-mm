/**
 * 请求模块
 */

import axios from "axios";

import store from '@/store';

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/' // 接口的基准路劲
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // 请求发起会经过这里
    // config：本次请求的请求配置对象
    const { user } = store.state
    if(user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config);
    // 务必要返回 config 配置对象 否则请求停在这里
    return config
}, function(error) {
    return Promise.reject(error)
})


// 响应拦截器

// 导出基础接口
export default request
