<template>
  <section v-if="!pending && !error" class="bg-[#f5f8f6] py-20 sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="reveal mb-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#137457]">Our Advantages</p>
          <h2 class="text-3xl font-semibold tracking-[-0.035em] text-[#102b25] sm:text-4xl">{{ title }}</h2>
        </div>
        <div class="hidden items-end justify-end lg:col-span-4 lg:col-start-9 lg:flex">
          <Icon name="heroicons:trophy" class="h-9 w-9 text-[#159a76]/60" />
        </div>
      </div>

      <div v-if="advantageItems.length" class="border-b border-[#102b25]/10">
        <article
          v-for="(item, index) in advantageItems"
          :key="index"
          class="reveal group grid gap-5 border-t border-[#102b25]/10 py-8 md:grid-cols-12 md:gap-6 md:py-10"
          :class="`reveal-delay-${Math.min(index + 1, 5)}`"
        >
          <div class="flex items-center justify-between md:col-span-1 md:block">
            <span class="font-mono text-sm tabular-nums text-[#789086]">{{ String(index + 1).padStart(2, '0') }}</span>
            <Icon :name="item.icon" class="h-5 w-5 text-[#137457] md:mt-8" />
          </div>
          <div class="md:col-span-4">
            <h3 class="text-xl font-semibold tracking-[-0.02em] text-[#102b25]">{{ item.name }}</h3>
            <p class="mt-2 text-base font-medium leading-7 text-[#137457]">{{ item.title }}</p>
          </div>
          <p class="max-w-2xl text-sm leading-7 text-[#526b61] md:col-span-6 md:col-start-7 md:text-base md:leading-8">{{ item.description }}</p>
        </article>
      </div>
      <div v-else class="flex items-center gap-4 border-y border-[#102b25]/10 py-8 text-[#526b61]">
        <Icon name="heroicons:trophy" class="h-6 w-6 shrink-0 text-[#137457]" />
        <p>暂无企业优势内容</p>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" aria-busy="true" aria-label="正在加载我们的优势" class="bg-[#f5f8f6] py-20 sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="animate-pulse">
        <div class="mb-12">
          <div class="mb-5 h-3 w-32 rounded-sm bg-[#102b25]/10"></div>
          <div class="h-10 w-44 rounded-sm bg-[#102b25]/10"></div>
        </div>
        <div v-for="i in 3" :key="i" class="grid gap-5 border-t border-[#102b25]/10 py-10 md:grid-cols-12 md:gap-6">
          <div class="h-4 w-6 rounded-sm bg-[#102b25]/10 md:col-span-1"></div>
          <div class="space-y-3 md:col-span-4">
            <div class="h-6 w-36 rounded-sm bg-[#102b25]/10"></div>
            <div class="h-4 w-48 max-w-full rounded-sm bg-[#102b25]/10"></div>
          </div>
          <div class="space-y-3 md:col-span-6 md:col-start-7">
            <div class="h-4 w-full rounded-sm bg-[#102b25]/10"></div>
            <div class="h-4 w-4/5 rounded-sm bg-[#102b25]/10"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="bg-[#f5f8f6] py-20 sm:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 border-y border-[#102b25]/10 py-8 text-[#425c53]" role="alert">
        <Icon name="heroicons:exclamation-triangle" class="h-6 w-6 shrink-0 text-[#9a7025]" />
        <p>加载我们的优势失败，请稍后重试</p>
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
    // heroicons 自 v2 起没有 handshake，用 hand-raised 作为「合作」语义的替代
    icon: index % 2 === 0 ? 'heroicons:hand-raised' : 'heroicons:cube-transparent'
  }));
});
</script>

<style scoped>
/* 组件样式使用 Tailwind CSS，无需额外样式 */
</style>
