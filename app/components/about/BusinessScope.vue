<template>
  <section v-if="!pending && !error" class="py-32 md:py-40 bg-gray-50 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-eco-100/30 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-5xl mx-auto">
        <!-- 标题区域 -->
        <div class="reveal flex items-center mb-12">
          <div class="w-14 h-14 bg-eco-800 rounded-2xl flex items-center justify-center mr-5 shadow-[0_8px_24px_rgba(22,101,52,0.2)]">
            <Icon name="heroicons:clipboard-document-list" class="w-7 h-7 text-white" />
          </div>
          <div>
            <span class="text-eco-700 text-sm font-semibold uppercase tracking-wider">Business Scope</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">{{ title }}</h2>
          </div>
        </div>

        <!-- 卡片网格：Double-Bezel -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(item, index) in businessScopeItems" :key="index"
            class="reveal bezel group"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="bezel-inner p-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-eco-50 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 group-hover:bg-eco-800 group-hover:scale-105">
                  <Icon :name="item.icon" class="w-6 h-6 text-eco-800 group-hover:text-white transition-colors duration-500" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-900 mb-3">{{ item.name }}</h3>
                  <ul class="space-y-2">
                    <li v-for="(tag, tagIndex) in item.tags" :key="tagIndex" class="flex items-start text-gray-600 text-sm">
                      <Icon name="heroicons:check-badge" class="w-4 h-4 text-eco-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{{ tag }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <div class="animate-pulse">
          <div class="flex items-center mb-10">
            <div class="w-14 h-14 bg-gray-200 rounded-2xl mr-5"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded w-32"></div>
              <div class="h-8 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="i in 4" :key="i" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-5 bg-gray-200 rounded w-32"></div>
                  <div v-for="j in 3" :key="j" class="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="py-20 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto text-center">
        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-yellow-500" />
        </div>
        <p class="text-xl text-gray-600">加载经营范围失败</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 经营范围组件
 * 用于显示经营范围信息
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
const { data: articleData, pending, error } = useAsyncData(`business-scope-${props.slug}`, async () => {
  try {
    const response = await getArticleBySlug(props.slug);
    return response || {};
  } catch (err) {
    console.error('获取经营范围数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 标题
 */
const title = computed(() => articleData.value?.title || '经营范围');

/**
 * 经营范围项目列表
 * 从 attrList 中提取数据
 */
const businessScopeItems = computed(() => {
  const attrList = articleData.value?.attrList || [];
  return attrList.map(item => ({
    name: item.attrName || '',
    icon: item.attrEx || 'heroicons:light-bulb',
    tags: item.attrTags || []
  }));
});
</script>

<style scoped>
/* 组件样式使用 Tailwind CSS，无需额外样式 */
</style>
