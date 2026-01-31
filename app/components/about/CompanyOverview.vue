<template>
  <section v-if="!pending && !error" class="py-20 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-eco-100/30 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-4xl mx-auto">
        <!-- 标题区域 -->
        <div class="flex items-center mb-10">
          <div class="w-14 h-14 bg-gradient-to-br from-eco-500 to-eco-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg shadow-eco-500/20">
            <Icon name="heroicons:building-office-2" class="w-7 h-7 text-white" />
          </div>
          <div>
            <span class="text-eco-600 text-sm font-semibold uppercase tracking-wider">About Us</span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900">{{ title }}</h2>
          </div>
        </div>
        
        <!-- 内容区域 -->
        <div class="bg-white rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div class="prose prose-lg prose-eco text-gray-600 leading-relaxed max-w-none" v-html="content"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" class="py-20 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="animate-pulse">
          <div class="flex items-center mb-10">
            <div class="w-14 h-14 bg-gray-200 rounded-2xl mr-5"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded w-24"></div>
              <div class="h-8 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
          <div class="bg-gray-100 rounded-2xl p-8 space-y-4">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="py-20 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-yellow-500" />
        </div>
        <p class="text-xl text-gray-600">加载企业概览失败</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 企业概览组件
 * 用于显示企业概览信息
 * 数据通过 getArticleBySlug API 获取
 */

import { getArticleBySlug } from '~/api/article';

/**
 * 定义组件属性
 */
const props = defineProps({
  /**
   * 文章 slug
   * @type {String}
   * @required
   */
  slug: {
    type: String,
    required: true
  }
});

/**
 * 使用API获取文章数据
 */
const { data: articleData, pending, error } = useAsyncData(`company-overview-${props.slug}`, async () => {
  try {
    const response = await getArticleBySlug(props.slug);
    return response || {};
  } catch (err) {
    console.error('获取企业概览数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 标题
 */
const title = computed(() => articleData.value?.title || '企业概览');

/**
 * 内容
 */
const content = computed(() => articleData.value?.content || '');
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1.5rem;
}
</style>
