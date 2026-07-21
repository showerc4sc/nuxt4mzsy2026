<template>
  <section v-if="!pending && !error" class="py-32 md:py-40 bg-gradient-to-br from-eco-800 via-eco-900 to-slate-900 relative overflow-hidden">
    <!-- 细微纹理 -->
    <div class="pointer-events-none absolute inset-0 opacity-40" style="background-image: radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.06), transparent 40%);"></div>

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="reveal mb-16 max-w-3xl">
        <h3 class="text-4xl md:text-5xl font-bold tracking-tight text-white">{{ title }}</h3>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        <div v-for="(item, index) in achievementsData" :key="index"
          class="reveal"
          :class="`reveal-delay-${Math.min(index + 1, 5)}`"
        >
          <div class="font-mono text-5xl font-semibold tabular-nums tracking-tight text-white md:text-6xl">
            {{ item.value }}
          </div>
          <div class="mt-5 h-px w-10 bg-eco-400"></div>
          <div class="mt-5 text-sm font-light text-white/70 md:text-base">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-32 mx-auto mb-10"></div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div v-for="i in 4" :key="i" class="text-center">
            <div class="h-10 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 mx-auto mb-4 text-yellow-400" />
        <p class="text-xl text-gray-600">加载合作成果失败</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 合作成果组件
 * 用于显示合作成果统计信息
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
const { data: articleData, pending, error } = useAsyncData(`cooperation-achievements-${props.slug}`, async () => {
  try {
    const response = await getArticleBySlug(props.slug);
    return response || {};
  } catch (err) {
    console.error('获取合作成果数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 标题
 */
const title = computed(() => articleData.value?.title || '合作成果');

/**
 * 合作成果数据列表
 * 从 attrList 中提取数据
 */
const achievementsData = computed(() => {
  const attrList = articleData.value?.attrList || [];
  return attrList.map(item => ({
    name: item.attrName || '',
    value: item.attrValue || ''
  }));
});
</script>

<style scoped>
/* 组件样式使用 Tailwind CSS，无需额外样式 */
</style>
