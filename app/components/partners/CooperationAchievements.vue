<template>
  <section v-if="!pending && !error" class="bg-[#102b25] py-20 text-white sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div class="reveal lg:col-span-3">
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#8ad9be]">Achievements</p>
          <h2 class="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">{{ title }}</h2>
          <div class="mt-8 h-px w-16 bg-[#7dd9bb]/60"></div>
        </div>

        <div v-if="achievementsData.length" class="grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-8 lg:col-start-5 lg:grid-cols-4">
          <div
            v-for="(item, index) in achievementsData"
            :key="index"
            class="reveal border-t border-white/20 pt-6"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="break-words font-mono text-[2rem] font-medium leading-tight tracking-[-0.05em] tabular-nums text-white sm:text-4xl lg:text-[2.5rem]">
              {{ item.value }}
            </div>
            <div class="mt-5 text-sm leading-6 text-white/65">{{ item.name }}</div>
          </div>
        </div>
        <div v-else class="flex items-center gap-4 border-y border-white/15 py-8 text-white/70 lg:col-span-8 lg:col-start-5">
          <Icon name="heroicons:chart-bar" class="h-6 w-6 shrink-0 text-[#8ad9be]" />
          <p>暂无合作成果数据</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" aria-busy="true" aria-label="正在加载合作成果" class="bg-[#102b25] py-20 text-white sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid animate-pulse gap-12 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-3">
          <div class="mb-5 h-3 w-28 rounded-sm bg-white/10"></div>
          <div class="h-10 w-36 rounded-sm bg-white/10"></div>
        </div>
        <div class="grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-8 lg:col-start-5 lg:grid-cols-4">
          <div v-for="i in 4" :key="i" class="border-t border-white/15 pt-6">
            <div class="h-9 w-20 max-w-full rounded-sm bg-white/10"></div>
            <div class="mt-5 h-4 w-16 rounded-sm bg-white/10"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="bg-[#102b25] py-20 text-white sm:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 border-y border-white/15 py-8 text-white/75" role="alert">
        <Icon name="heroicons:exclamation-triangle" class="h-6 w-6 shrink-0 text-[#e4bd73]" />
        <p>加载合作成果失败，请稍后重试</p>
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
