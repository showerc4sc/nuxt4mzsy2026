<template>
  <section v-if="!pending && !error" class="bg-[#f5f8f6] py-20 sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="reveal lg:col-span-3">
          <div class="mb-7 flex h-11 w-11 items-center justify-center rounded-sm border border-[#159a76]/20 bg-[#e4eee8] text-[#137457]">
            <Icon name="heroicons:clipboard-document-list" class="h-5 w-5" />
          </div>
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#137457]">Business Scope</p>
          <h2 class="text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#102b25] sm:text-4xl">{{ title }}</h2>
        </div>

        <div v-if="businessScopeItems.length" class="grid gap-x-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
          <article
            v-for="(item, index) in businessScopeItems"
            :key="index"
            class="reveal group border-t border-[#102b25]/15 py-7"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="mb-6 flex items-center justify-between">
              <div class="flex h-10 w-10 items-center justify-center rounded-sm bg-[#e4eee8] text-[#137457] transition-colors duration-300 group-hover:bg-[#102b25] group-hover:text-white">
                <Icon :name="item.icon" class="h-5 w-5" />
              </div>
              <span class="font-mono text-xs tabular-nums text-[#789086]">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="mb-4 text-lg font-semibold tracking-[-0.015em] text-[#102b25]">{{ item.name }}</h3>
            <ul class="space-y-2.5">
              <li v-for="(tag, tagIndex) in item.tags" :key="tagIndex" class="flex items-start gap-2.5 text-sm leading-6 text-[#526b61]">
                <Icon name="heroicons:check" class="mt-1 h-4 w-4 shrink-0 text-[#159a76]" />
                <span>{{ tag }}</span>
              </li>
            </ul>
          </article>
        </div>
        <div v-else class="flex items-center gap-4 border-y border-[#102b25]/10 py-8 text-[#526b61] lg:col-span-8 lg:col-start-5">
          <Icon name="heroicons:clipboard-document-list" class="h-6 w-6 shrink-0 text-[#137457]" />
          <p>暂无经营范围信息</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" aria-busy="true" aria-label="正在加载经营范围" class="bg-[#f5f8f6] py-20 sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid animate-pulse gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-3">
          <div class="mb-7 h-11 w-11 rounded-sm bg-[#102b25]/10"></div>
          <div class="mb-5 h-3 w-28 rounded-sm bg-[#102b25]/10"></div>
          <div class="h-10 w-40 rounded-sm bg-[#102b25]/10"></div>
        </div>
        <div class="grid gap-x-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
          <div v-for="i in 4" :key="i" class="border-t border-[#102b25]/10 py-7">
            <div class="mb-6 h-10 w-10 rounded-sm bg-[#102b25]/10"></div>
            <div class="mb-4 h-5 w-32 rounded-sm bg-[#102b25]/10"></div>
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
        <p>加载经营范围失败，请稍后重试</p>
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
