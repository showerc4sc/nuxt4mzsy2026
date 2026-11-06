<template>
  <section v-if="!pending && !error" class="relative isolate overflow-hidden bg-[#102b25] py-20 text-white sm:py-24 lg:py-32">
    <img
      :src="backgroundImage"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.12] grayscale"
      loading="lazy"
    />
    <div class="absolute inset-0 -z-10 bg-[#102b25]/75"></div>
    <div class="pointer-events-none absolute inset-y-0 right-[12%] -z-10 hidden w-px bg-white/[0.07] lg:block" aria-hidden="true"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="reveal lg:col-span-4">
          <div class="mb-7 flex h-11 w-11 items-center justify-center rounded-sm border border-white/20 text-[#7dd9bb]">
            <Icon name="heroicons:light-bulb" class="h-5 w-5" />
          </div>
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#8ad9be]">Vision & Mission</p>
          <h2 class="max-w-sm text-3xl font-semibold leading-[1.3] tracking-[-0.035em] text-white sm:text-4xl">{{ title }}</h2>
          <div class="mt-8 h-px w-16 bg-[#7dd9bb]/60"></div>
        </div>

        <div v-if="visionItems.length" class="lg:col-span-7 lg:col-start-6">
          <article
            v-for="(item, index) in visionItems"
            :key="index"
            class="reveal grid gap-5 border-t border-white/15 py-8 first:pt-0 sm:grid-cols-12 sm:gap-6"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="sm:col-span-4">
              <div class="mb-4 flex items-center gap-3 text-[#8ad9be]">
                <Icon :name="item.icon" class="h-5 w-5" />
                <span class="font-mono text-xs tabular-nums text-white/45">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <h3 class="text-xl font-semibold tracking-[-0.02em] text-white">{{ item.name }}</h3>
            </div>
            <div class="sm:col-span-8">
              <p v-if="item.value" class="text-sm leading-7 text-white/70 sm:text-base sm:leading-8">{{ item.value }}</p>
              <div v-if="item.tags && item.tags.length > 0" class="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                <span v-for="(tag, tagIndex) in item.tags" :key="tagIndex" class="text-sm font-medium text-[#a8e5ce]">
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
          <div class="h-px bg-white/15"></div>
        </div>
        <div v-else class="flex items-center gap-4 border-y border-white/15 py-8 text-white/70 lg:col-span-7 lg:col-start-6">
          <Icon name="heroicons:light-bulb" class="h-6 w-6 shrink-0 text-[#8ad9be]" />
          <p>暂无企业理念与愿景内容</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" aria-busy="true" aria-label="正在加载企业理念与愿景" class="bg-[#102b25] py-20 text-white sm:py-24 lg:py-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid animate-pulse gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-4">
          <div class="mb-7 h-11 w-11 rounded-sm bg-white/10"></div>
          <div class="mb-5 h-3 w-32 rounded-sm bg-white/10"></div>
          <div class="h-10 w-56 max-w-full rounded-sm bg-white/10"></div>
        </div>
        <div class="lg:col-span-7 lg:col-start-6">
          <div v-for="i in 3" :key="i" class="grid gap-5 border-t border-white/10 py-8 sm:grid-cols-12">
            <div class="sm:col-span-4">
              <div class="mb-4 h-5 w-5 rounded-sm bg-white/10"></div>
              <div class="h-6 w-28 rounded-sm bg-white/10"></div>
            </div>
            <div class="space-y-3 sm:col-span-8">
              <div class="h-4 w-full rounded-sm bg-white/10"></div>
              <div class="h-4 w-3/4 rounded-sm bg-white/10"></div>
            </div>
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
        <p>加载企业理念与愿景失败，请稍后重试</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 企业理念与愿景组件
 * 用于显示企业理念、愿景、使命和价值观
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
const { data: articleData, pending, error } = useAsyncData(`company-vision-${props.slug}`, async () => {
  try {
    const response = await getArticleBySlug(props.slug);
    return response || {};
  } catch (err) {
    console.error('获取企业理念与愿景数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 标题
 */
const title = computed(() => articleData.value?.title || '企业理念与愿景');

/**
 * 背景图片URL
 */
const backgroundImage = computed(() => articleData.value?.cover || 'https://picsum.photos/seed/mzsy-vision/1920/1080.jpg');

/**
 * 企业理念与愿景项目列表
 * 从 attrList 中提取数据
 */
const visionItems = computed(() => {
  const attrList = articleData.value?.attrList || [];
  return attrList.map(item => ({
    name: item.attrName || '',
    value: item.attrValue || '',
    icon: item.attrEx || 'heroicons:star',
    tags: item.attrTags || []
  }));
});
</script>

<style scoped>
/* 组件样式使用 Tailwind CSS，无需额外样式 */
</style>
