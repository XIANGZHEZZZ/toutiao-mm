import request from '@/utils/request';

// 获取文章新闻推荐
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params,
  });
};

// 获取新闻详情
export const getArticlesById = (articleId) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`,
  });
};
// 收藏文章
export const addCollections = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target,
    },
  });
};
// 取消收藏文章
export const deleteCollections = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`,
  });
};

// 文章点赞
export const addLikings = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target,
    },
  });
};
// 取消对文章点赞
export const deleteLikings = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`,
  });
};
