<template>
  <section v-if="!pending && !error" class="border-y border-[#102b25]/10 bg-[#edf3ef] py-20 sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="reveal mb-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#137457]">Our Partners</p>
          <h2 class="text-3xl font-semibold tracking-[-0.035em] text-[#102b25] sm:text-4xl">{{ title }}</h2>
        </div>
        <p class="max-w-sm self-end text-sm leading-7 text-[#526b61] lg:col-span-4 lg:col-start-9">与产业链伙伴建立稳定协作，共同推进新能源技术落地</p>
      </div>

      <div v-if="partnersData.length" class="grid border-y border-[#102b25]/10 bg-white sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(partner, index) in partnersData"
          :key="index"
          class="reveal group relative border-[#102b25]/10 p-7 [&:not(:last-child)]:border-b sm:p-8 sm:[&:not(:last-child)]:border-b-0 sm:[&:not(:nth-last-child(-n+2))]:border-b sm:odd:border-r lg:[&:not(:nth-last-child(-n+2))]:border-b-0 lg:[&:not(:nth-last-child(-n+3))]:border-b lg:odd:border-r-0 lg:[&:not(:nth-child(3n))]:border-r"
          :class="`reveal-delay-${Math.min(index + 1, 5)}`"
        >
          <div class="mb-8 flex items-start justify-between gap-5">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#159a76]/20 text-[#137457]">
              <Icon name="heroicons:building-office" class="h-5 w-5" />
            </div>
            <span class="text-right text-xs font-medium leading-5 text-[#137457]">{{ partner.type }}</span>
          </div>
          <h3 class="mb-4 text-lg font-semibold leading-7 tracking-[-0.015em] text-[#102b25]">{{ partner.name }}</h3>
          <p class="text-sm leading-7 text-[#526b61]">{{ partner.description }}</p>
        </article>
      </div>
      <div v-else class="flex items-center gap-4 border-y border-[#102b25]/10 py-8 text-[#526b61]">
        <Icon name="heroicons:building-office" class="h-6 w-6 shrink-0 text-[#137457]" />
        <p>暂无合作企业信息</p>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" aria-busy="true" aria-label="正在加载合作企业" class="border-y border-[#102b25]/10 bg-[#edf3ef] py-20 sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="animate-pulse">
        <div class="mb-12">
          <div class="mb-5 h-3 w-24 rounded-sm bg-[#102b25]/10"></div>
          <div class="h-10 w-44 rounded-sm bg-[#102b25]/10"></div>
        </div>
        <div class="grid border-y border-[#102b25]/10 bg-white sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="border-b border-r border-[#102b25]/10 p-7 sm:p-8">
            <div class="mb-8 flex items-center justify-between">
              <div class="h-10 w-10 rounded-sm bg-[#102b25]/10"></div>
              <div class="h-3 w-16 rounded-sm bg-[#102b25]/10"></div>
            </div>
            <div class="mb-4 h-5 w-36 rounded-sm bg-[#102b25]/10"></div>
            <div class="space-y-3">
              <div class="h-3 w-full rounded-sm bg-[#102b25]/10"></div>
              <div class="h-3 w-3/4 rounded-sm bg-[#102b25]/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="border-y border-[#102b25]/10 bg-[#edf3ef] py-20 sm:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 border-y border-[#102b25]/10 py-8 text-[#425c53]" role="alert">
        <Icon name="heroicons:exclamation-triangle" class="h-6 w-6 shrink-0 text-[#9a7025]" />
        <p>加载合作企业失败，请稍后重试</p>
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
