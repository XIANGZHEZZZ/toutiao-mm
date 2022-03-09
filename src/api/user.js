/**
 * 用户相关请求模块
 */
import request from '@/utils/request';
// import store from '@/store'

// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data,
  });
};
// 验证手机号码 带参数 手机号
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    // url: '/v1_0/sms/codes/'+mobile,
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};
// 获取用户的频道
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels',
  });
};

// 关注用户
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target,
    },
  });
};

// 取关注用户
export const deleteFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
  });
};

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile',
  });
};
// 编辑用户个人资料
export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data,
  });
};
// 编辑用户照片资料（头像、身份证照片）
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data,
  });
};
