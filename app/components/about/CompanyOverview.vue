<template>
  <section v-if="!pending && !error" aria-busy="false" class="relative overflow-hidden bg-[#f5f8f6] py-20 sm:py-24 lg:py-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="reveal lg:col-span-4">
          <div class="lg:sticky lg:top-28">
            <div class="mb-7 flex h-11 w-11 items-center justify-center rounded-sm border border-[#159a76]/20 bg-[#e4eee8] text-[#137457]">
              <Icon name="heroicons:building-office-2" class="h-5 w-5" />
            </div>
            <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#137457]">About Us</p>
            <h2 class="text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#102b25] sm:text-4xl">{{ title }}</h2>
            <div class="mt-8 h-px w-16 bg-[#159a76]/50"></div>
          </div>
        </div>
        <div class="reveal reveal-delay-1 lg:col-span-7 lg:col-start-6">
          <div class="border-y border-[#102b25]/10 py-8 sm:py-10">
            <div class="overview-content text-base leading-8 text-[#425c53] sm:text-lg sm:leading-9" v-html="content"></div>
            <div v-if="!content" class="flex items-center gap-3 text-sm text-[#647970]">
              <Icon name="heroicons:document-text" class="h-5 w-5" />
              <span>暂无企业概览内容</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" aria-busy="true" aria-label="正在加载企业概览" class="bg-[#f5f8f6] py-20 sm:py-24 lg:py-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid animate-pulse gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-4">
          <div class="mb-7 h-11 w-11 rounded-sm bg-[#102b25]/10"></div>
          <div class="mb-5 h-3 w-20 rounded-sm bg-[#102b25]/10"></div>
          <div class="h-10 w-48 rounded-sm bg-[#102b25]/10"></div>
        </div>
        <div class="space-y-5 border-y border-[#102b25]/10 py-10 lg:col-span-7 lg:col-start-6">
          <div class="h-4 w-full rounded-sm bg-[#102b25]/10"></div>
          <div class="h-4 w-full rounded-sm bg-[#102b25]/10"></div>
          <div class="h-4 w-11/12 rounded-sm bg-[#102b25]/10"></div>
          <div class="h-4 w-2/3 rounded-sm bg-[#102b25]/10"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="bg-[#f5f8f6] py-20 sm:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 border-y border-[#102b25]/10 py-8 text-[#425c53]" role="alert">
        <Icon name="heroicons:exclamation-triangle" class="h-6 w-6 shrink-0 text-[#9a7025]" />
        <p>加载企业概览失败，请稍后重试</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 企业概览组件
 * 用于显示企业概览信息
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
const { data: articleData, pending, error } = useAsyncData(`company-overview-${props.slug}`, async () => {
  try {
    const response = await getArticleBySlug(props.slug);
    return response || {};
  } catch (err) {
    console.error('获取企业概览数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 标题
 */
const title = computed(() => articleData.value?.title || '企业概览');

/**
 * 内容
 */
const content = computed(() => articleData.value?.content || '');
</script>

<style scoped>
.overview-content :deep(p) {
  margin-bottom: 1.5rem;
}

.overview-content :deep(p:last-child) {
  margin-bottom: 0;
}

.overview-content :deep(h3) {
  margin: 2rem 0 0.75rem;
  color: #102b25;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.overview-content :deep(ul) {
  margin: 1.5rem 0;
  padding-left: 1.25rem;
  list-style: disc;
}

.overview-content :deep(a) {
  color: #137457;
  text-decoration: underline;
  text-underline-offset: 0.25rem;
}
</style>
