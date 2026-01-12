import { getArticleBySlug } from '~/api/article';

/**
 * 公司信息 Composable
 * 用于获取和管理公司信息数据
 * @returns {Object} 公司信息相关的计算属性和方法
 */
export function useCompanyInfo() {
  /**
   * 获取公司信息数据
   * slug: company-info
   */
  const { data: companyData, pending, error, refresh } = useAsyncData('company-info', async () => {
    try {
      const response = await getArticleBySlug('company-info');
      return response || {};
    } catch (err) {
      console.error('获取公司信息失败:', err);
      return {};
    }
  }, {
    server: true
  });

  /**
   * 公司名称
   */
  const companyName = computed(() => companyData.value?.title || '淼泽松源');

  /**
   * 公司副标题
   */
  const companySubtitle = computed(() => companyData.value?.subtitle || '新能源科技');

  /**
   * 公司简介
   */
  const companySummary = computed(() => companyData.value?.summary || '');

  /**
   * 公司封面图
   */
  const companyCover = computed(() => companyData.value?.cover || '');

  /**
   * 公司内容
   */
  const companyContent = computed(() => companyData.value?.content || '');

  /**
   * 公司图片列表
   */
  const companyImages = computed(() => companyData.value?.images || []);

  /**
   * 公司扩展属性列表
   */
  const companyAttrList = computed(() => companyData.value?.attrList || []);

  /**
   * 公司标签
   */
  const companyTags = computed(() => companyData.value?.tags || []);

  /**
   * 公司 ID
   */
  const companyId = computed(() => companyData.value?._id || '');

  /**
   * 公司分类信息
   */
  const companyCategory = computed(() => companyData.value?.categoryInfo || null);

  /**
   * 发布时间
   */
  const publishTime = computed(() => companyData.value?.publish_time || '');

  /**
   * SEO 元数据
   */
  const seoMeta = computed(() => ({
    keywords: companyData.value?.keywords || [],
    description: companyData.value?.summary || ''
  }));

  /**
   * 公司地址
   */
  const companyAddress = computed(() => companyData.value?.companyAddress || '');

  /**
   * 公司邮箱
   */
  const companyEmail = computed(() => companyData.value?.companyEmail || '');

  /**
   * 公司纬度
   */
  const companyLat = computed(() => companyData.value?.companyLat || '');

  /**
   * 公司经度
   */
  const companyLng = computed(() => companyData.value?.companyLng || '');

  /**
   * 公司电话
   */
  const companyTel = computed(() => companyData.value?.companyTel || '');

  /**
   * 工作时间
   */
  const workTimes = computed(() => companyData.value?.workTimes || '');

  /**
   * 完整的公司信息对象
   */
  const companyInfo = computed(() => ({
    id: companyId.value,
    name: companyName.value,
    subtitle: companySubtitle.value,
    summary: companySummary.value,
    cover: companyCover.value,
    content: companyContent.value,
    images: companyImages.value,
    attrList: companyAttrList.value,
    tags: companyTags.value,
    category: companyCategory.value,
    publishTime: publishTime.value,
    address: companyAddress.value,
    email: companyEmail.value,
    lat: companyLat.value,
    lng: companyLng.value,
    tel: companyTel.value,
    workTimes: workTimes.value,
    seo: seoMeta.value
  }));

  return {
    companyData,
    companyName,
    companySubtitle,
    companySummary,
    companyCover,
    companyContent,
    companyImages,
    companyAttrList,
    companyTags,
    companyId,
    companyCategory,
    publishTime,
    seoMeta,
    companyAddress,
    companyEmail,
    companyLat,
    companyLng,
    companyTel,
    workTimes,
    companyInfo,
    pending,
    error,
    refresh
  };
}
