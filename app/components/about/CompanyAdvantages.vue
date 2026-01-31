<template>
  <section v-if="!pending && !error" class="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute top-1/2 right-0 w-80 h-80 bg-eco-100/40 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-5xl mx-auto">
        <!-- 标题区域 -->
        <div class="flex items-center mb-10">
          <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-5 shadow-lg shadow-purple-500/20">
            <Icon name="heroicons:trophy" class="w-7 h-7 text-white" />
          </div>
          <div>
            <span class="text-purple-600 text-sm font-semibold uppercase tracking-wider">Our Advantages</span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900">{{ title }}</h2>
          </div>
        </div>
        
        <!-- 优势卡片列表 -->
        <div class="grid grid-cols-1 gap-6">
          <div v-for="(item, index) in advantageItems" :key="index" 
            class="group bg-white p-6 md:p-8 rounded-2xl shadow-md shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div class="flex flex-col md:flex-row md:items-start gap-5">
              <!-- 图标 -->
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                :class="index % 2 === 0 ? 'bg-gradient-to-br from-eco-500 to-eco-600' : 'bg-gradient-to-br from-primary-500 to-primary-600'">
                <Icon :name="item.icon" class="w-7 h-7 text-white" />
              </div>
              <!-- 内容 -->
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ item.name }}</h3>
                <p class="text-gray-700 font-medium text-lg mb-3">{{ item.title }}</p>
                <p class="text-gray-600 leading-relaxed">{{ item.description }}</p>
              </div>
              <!-- 序号装饰 -->
              <div class="hidden md:flex w-12 h-12 rounded-full bg-gray-100 items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                <span class="text-2xl font-bold text-gray-300 group-hover:text-purple-500 transition-colors">{{ index + 1 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <div class="animate-pulse">
          <div class="flex items-center mb-10">
            <div class="w-14 h-14 bg-gray-200 rounded-2xl mr-5"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded w-36"></div>
              <div class="h-8 bg-gray-200 rounded w-44"></div>
            </div>
          </div>
          <div class="space-y-6">
            <div v-for="i in 3" :key="i" class="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <div class="flex gap-5">
                <div class="w-14 h-14 bg-gray-200 rounded-2xl"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-6 bg-gray-200 rounded w-48"></div>
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto text-center">
        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-yellow-500" />
        </div>
        <p class="text-xl text-gray-600">加载我们的优势失败</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 我们的优势组件
 * 用于显示企业优势信息
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
const { data: articleData, pending, error } = useAsyncData(`company-advantages-${props.slug}`, async () => {
  try {
    const response = await getArticleBySlug(props.slug);
    return response || {};
  } catch (err) {
    console.error('获取我们的优势数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 标题
 */
const title = computed(() => articleData.value?.title || '我们的优势');

/**
 * 优势项目列表
 * 从 attrList 中提取数据
 */
const advantageItems = computed(() => {
  const attrList = articleData.value?.attrList || [];
  return attrList.map((item, index) => ({
    name: item.attrName || '',
    title: item.attrValue || '',
    description: item.attrEx || '',
    icon: index % 2 === 0 ? 'heroicons:handshake' : 'heroicons:cube-transparent'
  }));
});
</script>

<style scoped>
/* 组件样式使用 Tailwind CSS，无需额外样式 */
</style>
