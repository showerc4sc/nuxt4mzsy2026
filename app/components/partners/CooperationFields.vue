<template>
  <section v-if="!pending && !error" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h3 class="text-xl font-bold text-gray-900 text-center mb-10">{{ title }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div v-for="(item, index) in cooperationFields" :key="index" class="text-center">
          <div class="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" :class="getIconBgColor(index)">
            <Icon :name="item.icon" class="w-7 h-7" :class="getIconTextColor(index)" />
          </div>
          <h4 class="font-semibold text-gray-900 mb-2">{{ item.name }}</h4>
          <p class="text-gray-600 text-sm">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-32 mx-auto mb-10"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div v-for="i in 3" :key="i" class="text-center">
            <div class="w-14 h-14 bg-gray-200 rounded-xl mx-auto mb-4"></div>
            <div class="h-5 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 mx-auto mb-4 text-yellow-400" />
        <p class="text-xl text-gray-600">加载合作领域失败</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 合作领域组件
 * 用于显示合作领域信息
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
const { data: articleData, pending, error } = useAsyncData(`cooperation-fields-${props.slug}`, async () => {
  try {
    const response = await getArticleBySlug(props.slug);
    return response || {};
  } catch (err) {
    console.error('获取合作领域数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 标题
 */
const title = computed(() => articleData.value?.title || '合作领域');

/**
 * 合作领域列表
 * 从 attrList 中提取数据
 */
const cooperationFields = computed(() => {
  const attrList = articleData.value?.attrList || [];
  return attrList.map(item => ({
    name: item.attrName || '',
    description: item.attrValue || '',
    icon: item.attrEx || 'heroicons:cube'
  }));
});

/**
 * 获取图标背景颜色
 * @param {Number} index - 索引
 * @returns {String} 背景颜色类名
 */
const getIconBgColor = (index) => {
  const colors = ['bg-eco-50', 'bg-blue-50', 'bg-amber-50'];
  return colors[index % colors.length];
};

/**
 * 获取图标文字颜色
 * @param {Number} index - 索引
 * @returns {String} 文字颜色类名
 */
const getIconTextColor = (index) => {
  const colors = ['text-eco-600', 'text-blue-600', 'text-amber-600'];
  return colors[index % colors.length];
};
</script>

<style scoped>
/* 组件样式使用 Tailwind CSS，无需额外样式 */
</style>
