/**
 * 文章相关API
 * 提供文章数据的获取接口
 */

import request from '~/utils/request';

/**
 * 获取文章列表
 * @param {Object} params - 请求参数
 * @param {string|number} params.category_id - 分类ID
 * @param {number} params.status - 状态，默认为1
 * @param {number} params.page - 页码，默认为1
 * @param {number} params.limit - 每页数量，默认为20
 * @param {string} params.keyword - 关键词搜索
 * @param {string} params.sortField - 排序字段，默认为"sort"
 * @param {string} params.sortType - 排序方式，默认为"desc"
 * @returns {Promise<Object>} 返回文章列表数据
 */
export async function getArticleList(params = {}) {
  const defaultParams = {
    status: 1,
    page: 1,
    limit: 20,
    sortField: 'sort',
    sortType: 'desc'
  };
  
  const queryParams = { ...defaultParams, ...params };
  
  return request.get('/client/cms/article/pub/getList', { params: queryParams });
}


/**
 * 根据ID获取文章详情
 * @param {string|number} id - 文章ID
 * @returns {Promise<Object>} 返回文章详情数据
 */
export async function getArticleById(id) {
  return request.get('/client/cms/article/pub/getInfo', { params: { _id } });
}

/**
 * 根据slug获取文章详情
 * @param {string} slug - 文章slug
 * @returns {Promise<Object>} 返回文章详情数据
 */
export async function getArticleBySlug(slug) {
  return request.get('/client/cms/article/pub/getBySlug', { params: { slug } });
}

/**
 * 根据栏目slug获取文章列表
 * @param {Object} params - 请求参数
 * @param {string} params.category_slug - 栏目别名
 * @param {boolean} params.recursive - 是否包含子栏目的文章（可选，默认false）
 * @param {number} params.page - 页码，默认为1
 * @param {number} params.limit - 每页条数，默认为20
 * @param {string} params.keyword - 关键词搜索（可选）
 * @param {string} params.sortField - 排序字段，默认为"sort"
 * @param {string} params.sortType - 排序方式：asc-升序，desc-降序，默认为"desc"
 * @returns {Promise<Object>} 返回文章列表数据
 */
export async function getArticleListByCategorySlug(params = {}) {
  const defaultParams = {
    recursive: false,
    page: 1,
    limit: 20,
    sortField: 'sort',
    sortType: 'desc'
  };
  
  const queryParams = { ...defaultParams, ...params };
  
  return request.get('/client/cms/article/pub/getListByCategorySlug', { params: queryParams });
}
