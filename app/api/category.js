import request from '~/utils/request';

/**
 * 获取分类列表
 * @param {Object} params - 请求参数
 * @returns {Promise<Object>} 返回分类列表数据
 */
export async function getCategoryList(params = {}) {
  return request.get('/client/cms/category/pub/getList', { params });
}

/**
 * 根据ID获取分类详情
 * @param {string|number} _id - 分类ID
 * @returns {Promise<Object>} 返回分类详情数据
 */
export async function getCategoryById(_id) {
  return request.get(`client/cms/category/pub/getInfo`, { params: { _id } });
}

/**
 * 根据slug获取分类详情
 * @param {string} slug - 分类slug
 * @returns {Promise<Object>} 返回分类详情数据
 */
export async function getCategoryBySlug(slug) {
  return request.get(`client/cms/category/pub/getBySlug`, { params: { slug } });
}

