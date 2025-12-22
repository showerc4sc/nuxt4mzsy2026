/**
 * API 工具函数
 * 提供统一的 API 请求方法，自动配置基础 URL
 */

/**
 * 获取 API 基础 URL
 * @returns {string} API 基础 URL
 */
export function getApiBase() {
  const config = useRuntimeConfig();
  return config.public.apiBase;
}

/**
 * 发送 GET 请求
 * @param {string} endpoint - API 端点路径
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
export async function apiGet(endpoint, options = {}) {
  const apiBase = getApiBase();
  const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint}`;
  
  return $fetch(url, {
    method: 'GET',
    ...options
  });
}

/**
 * 发送 POST 请求
 * @param {string} endpoint - API 端点路径
 * @param {Object} data - 请求数据
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
export async function apiPost(endpoint, data = {}, options = {}) {
  const apiBase = getApiBase();
  const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint}`;
  
  return $fetch(url, {
    method: 'POST',
    body: data,
    ...options
  });
}

/**
 * 发送 PUT 请求
 * @param {string} endpoint - API 端点路径
 * @param {Object} data - 请求数据
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
export async function apiPut(endpoint, data = {}, options = {}) {
  const apiBase = getApiBase();
  const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint}`;
  
  return $fetch(url, {
    method: 'PUT',
    body: data,
    ...options
  });
}

/**
 * 发送 DELETE 请求
 * @param {string} endpoint - API 端点路径
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
export async function apiDelete(endpoint, options = {}) {
  const apiBase = getApiBase();
  const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint}`;
  
  return $fetch(url, {
    method: 'DELETE',
    ...options
  });
}

/**
 * 通用 API 请求方法
 * @param {string} endpoint - API 端点路径
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
export async function apiRequest(endpoint, options = {}) {
  const apiBase = getApiBase();
  const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint}`;
  
  return $fetch(url, options);
}