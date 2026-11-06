<template>
  <section v-if="!pending && !error" class="bg-[#f5f8f6] py-20 sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="reveal lg:col-span-3">
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#137457]">Cooperation</p>
          <h2 class="text-3xl font-semibold tracking-[-0.035em] text-[#102b25] sm:text-4xl">{{ title }}</h2>
          <div class="mt-8 h-px w-16 bg-[#159a76]/50"></div>
        </div>

        <div v-if="cooperationFields.length" class="grid gap-x-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-5 lg:grid-cols-3">
          <article
            v-for="(item, index) in cooperationFields"
            :key="index"
            class="reveal group border-t border-[#102b25]/15 py-7 lg:py-0"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="mb-8 flex items-center justify-between">
              <div class="flex h-11 w-11 items-center justify-center rounded-sm bg-[#e4eee8] text-[#137457] transition-colors duration-300 group-hover:bg-[#102b25] group-hover:text-white">
                <Icon :name="item.icon" class="h-5 w-5" />
              </div>
              <span class="font-mono text-xs tabular-nums text-[#789086]">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="mb-3 text-lg font-semibold tracking-[-0.015em] text-[#102b25]">{{ item.name }}</h3>
            <p class="text-sm leading-7 text-[#526b61]">{{ item.description }}</p>
          </article>
        </div>
        <div v-else class="flex items-center gap-4 border-y border-[#102b25]/10 py-8 text-[#526b61] lg:col-span-8 lg:col-start-5">
          <Icon name="heroicons:cube" class="h-6 w-6 shrink-0 text-[#137457]" />
          <p>暂无合作领域信息</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" aria-busy="true" aria-label="正在加载合作领域" class="bg-[#f5f8f6] py-20 sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid animate-pulse gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-3">
          <div class="mb-5 h-3 w-24 rounded-sm bg-[#102b25]/10"></div>
          <div class="h-10 w-36 rounded-sm bg-[#102b25]/10"></div>
        </div>
        <div class="grid gap-x-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-5 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="border-t border-[#102b25]/10 py-7 lg:py-0">
            <div class="mb-8 h-11 w-11 rounded-sm bg-[#102b25]/10"></div>
            <div class="mb-4 h-5 w-24 rounded-sm bg-[#102b25]/10"></div>
            <div class="space-y-3">
              <div class="h-3 w-full rounded-sm bg-[#102b25]/10"></div>
              <div class="h-3 w-4/5 rounded-sm bg-[#102b25]/10"></div>
            </div>
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
        <p>加载合作领域失败，请稍后重试</p>
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
</script>

<style scoped>
/* 组件样式使用 Tailwind CSS，无需额外样式 */
</style>
