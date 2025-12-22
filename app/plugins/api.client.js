/**
 * API 插件
 * 提供全局访问 API 方法的能力
 */

export default defineNuxtPlugin(async (nuxtApp) => {
  // 导入 API 工具函数
  const {
    getApiBase,
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    apiRequest
  } = await import('~/utils/api.js');

  // 将 API 方法添加到 nuxtApp 实例中
  nuxtApp.provide('api', {
    base: getApiBase,
    get: apiGet,
    post: apiPost,
    put: apiPut,
    delete: apiDelete,
    request: apiRequest
  });
});