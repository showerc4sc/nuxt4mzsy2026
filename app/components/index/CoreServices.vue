<template>
  <section class="relative overflow-hidden bg-white py-32 md:py-40">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 标题区域 -->
      <div class="reveal mb-20 max-w-3xl">
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          {{ sectionData.title || '核心业务' }}
        </h2>
        <p class="mt-5 text-lg font-light leading-relaxed text-gray-600 md:text-xl">
          {{ sectionData.summary || '我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案' }}
        </p>
      </div>

      <!-- 加载状态 -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="i in 4" :key="i" class="bezel">
          <div class="bezel-inner h-64 animate-pulse"></div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="py-20 text-center">
        <p class="text-gray-500">加载失败，请稍后重试</p>
      </div>

      <!-- 正常内容：非对称 Bento 网格（high-end-visual-design §3.B1） -->
      <template v-else>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-3">
          <!-- 第一项：大卡片，纵跨 3 行 -->
          <div
            v-if="servicesData[0]"
            class="reveal md:row-span-3 bezel group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1"
          >
            <div class="bezel-inner flex h-full flex-col p-10">
              <!-- 序号 + 图标 -->
              <div class="mb-8 flex items-center gap-4">
                <span class="font-mono text-2xl font-bold tabular-nums text-eco-800">01</span>
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-eco-50 text-eco-800 transition-colors duration-500 group-hover:bg-eco-800 group-hover:text-white">
                  <Icon :name="`heroicons:${servicesData[0].icon}`" class="h-7 w-7" />
                </div>
              </div>

              <!-- 标题 -->
              <h3 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl transition-colors duration-500 group-hover:text-eco-900">{{ servicesData[0].title }}</h3>

              <!-- 描述 -->
              <p class="mb-8 flex-1 leading-relaxed text-gray-600">{{ servicesData[0].description }}</p>

              <!-- 特性标签 -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="feature in servicesData[0].features"
                  :key="feature"
                  class="rounded-full bg-eco-50 px-3 py-1 text-xs font-medium text-eco-800 transition-colors duration-500 group-hover:bg-eco-100"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>

          <!-- 其余项：标准卡片，右列堆叠 -->
          <div
            v-for="(service, index) in servicesData.slice(1)"
            :key="service.id"
            class="reveal bezel group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1"
            :class="`reveal-delay-${Math.min(index, 5)}`"
          >
            <div class="bezel-inner flex h-full items-center gap-5 p-6 md:p-7">
              <!-- 序号 + 图标 -->
              <div class="flex flex-col items-center gap-3 shrink-0">
                <span class="font-mono text-sm font-bold tabular-nums text-eco-800">
                  {{ String(index + 2).padStart(2, '0') }}
                </span>
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-eco-50 text-eco-800 transition-colors duration-500 group-hover:bg-eco-800 group-hover:text-white">
                  <Icon :name="`heroicons:${service.icon}`" class="h-6 w-6" />
                </div>
              </div>

              <!-- 文本 -->
              <div class="flex-1 min-w-0">
                <h3 class="mb-1.5 text-lg font-bold text-gray-900">{{ service.title }}</h3>
                <p class="text-sm leading-relaxed text-gray-600 line-clamp-2">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部 CTA -->
        <div class="reveal mt-12">
          <NuxtLink
            to="/products"
            class="group inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white pl-6 pr-2 py-2 text-base font-semibold text-gray-900 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-eco-300 hover:bg-eco-50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-eco-400"
          >
            <span>查看全部服务</span>
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 group-hover:bg-eco-100 group-hover:text-eco-700">
              <Icon name="heroicons:arrow-right" class="h-4 w-4" />
            </span>
          </NuxtLink>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
/**
 * 核心业务组件
 * 非对称 Bento 网格展示公司核心业务（high-end-visual-design §3.B1 + §4.A Double-Bezel）
 */

import { getArticleBySlug } from '~/api/article';

/**
 * 使用API获取核心业务数据
 * slug为 index-core-biz
 */
const { data: articleData, pending, error } = await useAsyncData(
  'core-services',
  async () => {
    try {
      const response = await getArticleBySlug('index-core-biz');
      return response || {};
    } catch (err) {
      console.error('获取核心业务数据失败:', err);
      return {};
    }
  },
  {
    server: true
  }
);

/**
 * 将API返回的数据映射为服务卡片格式
 */
const servicesData = computed(() => {
  if (!articleData.value || !articleData.value.attrList || !Array.isArray(articleData.value.attrList)) {
    return [];
  }

  return articleData.value.attrList.map((item) => ({
    id: item._index,
    title: item.attrName || '',
    description: item.attrValue || '',
    icon: item.attrEx || 'beaker',
    features: item.attrTags || []
  }));
});

/**
 * 获取标题和描述
 */
const sectionData = computed(() => {
  if (!articleData.value) {
    return {
      title: '核心业务',
      subtitle: '我们的服务',
      summary: '我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案'
    };
  }

  return {
    title: articleData.value.title || '核心业务',
    subtitle: articleData.value.subtitle || '我们的服务',
    summary: articleData.value.summary || '我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案'
  };
});
</script>

<style scoped>
/* 组件特定样式 */
</style>
