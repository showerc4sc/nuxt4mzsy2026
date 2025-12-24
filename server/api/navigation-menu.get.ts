/**
 * 导航菜单API端点
 * 从外部API获取导航菜单数据
 */
export default defineEventHandler(async (event) => {
  const apiBase = 'https://env-00jxt6g9928j.dev-hz.cloudbasefunction.cn/http/router';
  const apiUrl = `${apiBase}/client/cms/category/pub/getList`;

  try {
    // 从外部API获取数据
    const response = await $fetch(apiUrl);

    // 检查响应是否有效
    if (response && response.code === 0 && response.data && response.data.rows) {
      // 映射API响应数据到导航菜单格式
      const mappedData = response.data.rows.map(item => ({
        name: item.title || item.name || item.categoryName || '未命名',
        path: item.path || item.url || item.href || `/${item.id || ''}`
      }));

      // 直接返回映射后的数据
      return mappedData;
    }

    // 如果API返回数据格式不符合预期，返回空数组
    return [];
  } catch (error) {
    // 出错时返回空数组
    return [];
  }
});
