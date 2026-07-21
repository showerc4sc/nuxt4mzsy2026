<template>
  <section v-if="!pending && !error" class="py-32 md:py-40 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="reveal mb-12 max-w-3xl">
        <h3 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">{{ title }}</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(partner, index) in partnersData" :key="index"
          class="reveal bezel group"
          :class="`reveal-delay-${Math.min(index + 1, 5)}`"
        >
          <div class="bezel-inner p-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-eco-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-eco-800">
                <Icon name="heroicons:building-office" class="w-6 h-6" />
              </div>
              <div>
                <h4 class="text-lg font-bold text-gray-900">{{ partner.name }}</h4>
                <span class="text-sm text-gray-500">{{ partner.type }}</span>
              </div>
            </div>
            <p class="text-gray-600 text-sm font-light leading-relaxed">{{ partner.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" class="py-32 md:py-40 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="animate-pulse">
        <div class="h-10 bg-gray-200 rounded w-48 mb-12"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="bezel">
            <div class="bezel-inner p-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gray-200 rounded-2xl flex-shrink-0"></div>
                <div>
                  <div class="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                  <div class="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="py-32 md:py-40 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 mx-auto mb-4 text-yellow-400" />
        <p class="text-xl text-gray-600">加载合作企业失败</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 合作企业组件
 * 用于显示合作企业信息
 * 数据通过 getArticleBySlug API 获取
 */

import { getArticleBySlug } from '~/api/article';

// 滚动入场动效
useReveal();

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
const { data: articleData, pending, error } = useAsyncData(`partner-companies-${props.slug}`, async () => {
  try {
    const response = await getArticleBySlug(props.slug);
    return response || {};
  } catch (err) {
    console.error('获取合作企业数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 标题
 */
const title = computed(() => articleData.value?.title || '合作企业');

/**
 * 合作企业列表
 * 从 attrList 中提取数据
 */
const partnersData = computed(() => {
  const attrList = articleData.value?.attrList || [];
  return attrList.map(item => ({
    name: item.attrName || '',
    type: item.attrValue || '',
    description: item.attrEx || ''
  }));
});
</script>

<style scoped>
/* 组件样式使用 Tailwind CSS，无需额外样式 */
</style>
