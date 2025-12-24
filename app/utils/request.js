/**
 * HTTP 请求封装
 * 统一处理请求前后的逻辑，返回标准格式
 */

/**
 * 获取 API 基础 URL
 * @returns {string} API 基础 URL
 */
function getApiBase() {
  const config = useRuntimeConfig();
  return config.public.apiBase || 'https://env-00jxt6g9928j.dev-hz.cloudbasefunction.cn/http/router';
}

/**
 * 请求前处理
 * @param {string} url - 请求 URL
 * @param {Object} options - 请求选项
 * @returns {Object} 处理后的请求选项
 */
function beforeRequest(url, options = {}) {
  const apiBase = getApiBase();
  const fullUrl = url.startsWith('http') ? url : `${apiBase}${url}`;

  const requestOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  console.log(`[Request] ${options.method || 'GET'} ${fullUrl}`);

  return { url: fullUrl, options: requestOptions };
}

/**
 * 请求后处理
 * @param {Object} response - 原始响应
 * @returns {Object} 标准格式的响应
 */
function afterRequest(response) {
  console.log('[Response]', response);

  const result = {
    code: 0,
    msg: '',
    data: null
  };

  if (response === null || response === undefined) {
    result.code = -1;
    result.msg = '响应为空';
    return result;
  }

  if (typeof response === 'string') {
    try {
      response = JSON.parse(response);
    } catch (e) {
      result.code = -1;
      result.msg = '响应格式错误';
      result.data = response;
      return result;
    }
  }

  if (response.code !== undefined) {
    result.code = response.code;
    result.msg = response.msg || response.message || '';
    result.data = response.data !== undefined ? response.data : response;
  } else {
    result.data = response;
  }

  return result;
}

/**
 * 错误处理
 * @param {Error} error - 错误对象
 * @returns {Object} 标准格式的错误响应
 */
function handleError(error) {
  console.error('[Request Error]', error);

  const result = {
    code: -1,
    msg: '',
    data: null
  };

  if (error.response) {
    result.code = error.response.status || -1;
    result.msg = error.response.statusText || error.message || '请求失败';
    result.data = error.response._data || null;
  } else if (error.message) {
    result.msg = error.message;
  } else {
    result.msg = '未知错误';
  }

  return result;
}

/**
 * 发送 GET 请求
 * @param {string} url - 请求 URL
 * @param {Object} options - 请求选项
 * @returns {Promise<Object>} 标准格式的响应
 */
export async function requestGet(url, options = {}) {
  try {
    const { url: fullUrl, options: requestOptions } = beforeRequest(url, {
      ...options,
      method: 'GET'
    });

    const response = await $fetch(fullUrl, requestOptions);
    return afterRequest(response);
  } catch (error) {
    return handleError(error);
  }
}

/**
 * 发送 POST 请求
 * @param {string} url - 请求 URL
 * @param {Object} data - 请求数据
 * @param {Object} options - 请求选项
 * @returns {Promise<Object>} 标准格式的响应
 */
export async function requestPost(url, data = {}, options = {}) {
  try {
    const { url: fullUrl, options: requestOptions } = beforeRequest(url, {
      ...options,
      method: 'POST',
      body: data
    });

    const response = await $fetch(fullUrl, requestOptions);
    return afterRequest(response);
  } catch (error) {
    return handleError(error);
  }
}

/**
 * 发送 PUT 请求
 * @param {string} url - 请求 URL
 * @param {Object} data - 请求数据
 * @param {Object} options - 请求选项
 * @returns {Promise<Object>} 标准格式的响应
 */
export async function requestPut(url, data = {}, options = {}) {
  try {
    const { url: fullUrl, options: requestOptions } = beforeRequest(url, {
      ...options,
      method: 'PUT',
      body: data
    });

    const response = await $fetch(fullUrl, requestOptions);
    return afterRequest(response);
  } catch (error) {
    return handleError(error);
  }
}

/**
 * 发送 DELETE 请求
 * @param {string} url - 请求 URL
 * @param {Object} options - 请求选项
 * @returns {Promise<Object>} 标准格式的响应
 */
export async function requestDelete(url, options = {}) {
  try {
    const { url: fullUrl, options: requestOptions } = beforeRequest(url, {
      ...options,
      method: 'DELETE'
    });

    const response = await $fetch(fullUrl, requestOptions);
    return afterRequest(response);
  } catch (error) {
    return handleError(error);
  }
}

/**
 * 通用请求方法
 * @param {string} url - 请求 URL
 * @param {Object} options - 请求选项
 * @returns {Promise<Object>} 标准格式的响应
 */
export async function request(url, options = {}) {
  try {
    const { url: fullUrl, options: requestOptions } = beforeRequest(url, options);

    const response = await $fetch(fullUrl, requestOptions);
    return afterRequest(response);
  } catch (error) {
    return handleError(error);
  }
}

/**
 * 默认导出
 */
export default {
  get: requestGet,
  post: requestPost,
  put: requestPut,
  delete: requestDelete,
  request
};
