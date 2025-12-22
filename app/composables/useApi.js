/**
 * API Composable
 * 提供响应式 API 请求方法
 */

/**
 * 使用 API 获取数据
 * @param {string} endpoint - API 端点路径
 * @param {Object} options - 请求选项
 * @returns {Object} 包含数据、错误和加载状态的响应式对象
 */
export function useApiFetch(endpoint, options = {}) {
  // 使用 useAsyncData 获取数据
  const { data, error, pending, refresh } = useAsyncData(
    `api-${endpoint}`,
    () => {
      const { $api } = useNuxtApp();
      return $api.request(endpoint, options);
    },
    {
      // 默认选项
      server: true,
      client: true,
      ...options
    }
  );

  return {
    data,
    error,
    pending,
    refresh
  };
}

/**
 * 使用 API 获取数据（仅客户端）
 * @param {string} endpoint - API 端点路径
 * @param {Object} options - 请求选项
 * @returns {Object} 包含数据、错误和加载状态的响应式对象
 */
export function useApiFetchClient(endpoint, options = {}) {
  // 使用 useAsyncData 获取数据，仅在客户端执行
  const { data, error, pending, refresh } = useAsyncData(
    `api-client-${endpoint}`,
    () => {
      const { $api } = useNuxtApp();
      return $api.request(endpoint, options);
    },
    {
      server: false,
      client: true,
      ...options
    }
  );

  return {
    data,
    error,
    pending,
    refresh
  };
}

/**
 * 执行 API 请求的操作函数
 * @param {string} method - HTTP 方法
 * @param {string} endpoint - API 端点路径
 * @param {Object} data - 请求数据（用于 POST/PUT）
 * @param {Object} options - 请求选项
 * @returns {Object} 包含执行函数、错误和加载状态的响应式对象
 */
export function useApiRequest(method = 'GET', endpoint, data = null, options = {}) {
  // 状态
  const result = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // 执行请求的函数
  const execute = async (requestEndpoint = endpoint, requestData = data, requestOptions = options) => {
    loading.value = true;
    error.value = null;
    
    try {
      const { $api } = useNuxtApp();
      
      let response;
      switch (method.toUpperCase()) {
        case 'GET':
          response = await $api.get(requestEndpoint, requestOptions);
          break;
        case 'POST':
          response = await $api.post(requestEndpoint, requestData, requestOptions);
          break;
        case 'PUT':
          response = await $api.put(requestEndpoint, requestData, requestOptions);
          break;
        case 'DELETE':
          response = await $api.delete(requestEndpoint, requestOptions);
          break;
        default:
          response = await $api.request(requestEndpoint, {
            method,
            body: requestData,
            ...requestOptions
          });
      }
      
      result.value = response;
      return response;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    result,
    error,
    loading,
    execute
  };
}