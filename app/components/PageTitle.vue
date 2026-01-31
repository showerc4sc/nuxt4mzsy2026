<template>
  <section v-if="!pending && !error" class="relative pt-40 pb-24 text-white overflow-hidden" :style="{ backgroundImage: `url('${backgroundImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }">
    <!-- 深色遮罩层 -->
    <div class="absolute inset-0 bg-gradient-to-br from-eco-900/85 to-primary-900/80"></div>
    <!-- 装饰性光晕 -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
    </div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ title }}</h1>
      <p class="text-xl opacity-90 max-w-3xl">
        {{ subtitle }}
      </p>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" class="relative pt-40 pb-24 text-white overflow-hidden bg-gradient-to-br from-eco-900/85 to-primary-900/80">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="animate-pulse">
        <div class="h-12 bg-white/20 rounded w-64 mb-6"></div>
        <div class="h-6 bg-white/20 rounded w-96"></div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="relative pt-40 pb-24 text-white overflow-hidden bg-gradient-to-br from-eco-900/85 to-primary-900/80">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 mx-auto mb-4 text-yellow-400" />
        <p class="text-xl">加载页面标题失败</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 页面标题组件
 * 用于显示页面顶部的标题区域，包含背景图片、标题和副标题
 * 数据通过 getCategoryBySlug API 获取
 */

import { getCategoryBySlug } from '~/api/category';

/**
 * 定义组件属性
 */
const props = defineProps({
  /**
   * 分类 slug
   * @type {String}
   * @required
   */
  slug: {
    type: String,
    required: true
  }
});

/**
 * 使用API获取分类数据
 */
const { data: categoryData, pending, error } = useAsyncData(`page-title-${props.slug}`, async () => {
  try {
    const response = await getCategoryBySlug(props.slug);
    console.log("getCategoryBySlug",response)
    return response || {};
  } catch (err) {
    console.error('获取页面标题数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 页面标题
 */
const title = computed(() => categoryData.value?.title || '页面标题');

/**
 * 页面副标题
 */
const subtitle = computed(() => categoryData.value?.subtitle || '');

/**
 * 背景图片URL
 */
const backgroundImage = computed(() => categoryData.value?.cover || 'https://picsum.photos/seed/mzsy-default/1920/1080.jpg');
</script>

<style scoped>
/* 组件样式使用 Tailwind CSS，无需额外样式 */
</style>
