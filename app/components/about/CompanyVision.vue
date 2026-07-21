<template>
  <section v-if="!pending && !error" class="py-32 md:py-40 relative overflow-hidden bg-gradient-to-br from-eco-800 via-eco-900 to-slate-900">
    <!-- 细微纹理：单一 eco 径向 -->
    <div class="pointer-events-none absolute inset-0 opacity-40" style="background-image: radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.06), transparent 40%);"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-5xl mx-auto">
        <!-- 标题区域 -->
        <div class="reveal flex items-center mb-12">
          <div class="w-14 h-14 bg-eco-800 rounded-2xl flex items-center justify-center mr-5 shadow-[0_8px_24px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
            <Icon name="heroicons:light-bulb" class="w-7 h-7 text-white" />
          </div>
          <div>
            <span class="text-eco-300 text-sm font-semibold uppercase tracking-wider">Vision & Mission</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">{{ title }}</h2>
          </div>
        </div>

        <!-- 卡片网格：Double-Bezel 暗色 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(item, index) in visionItems" :key="index"
            class="reveal bezel-dark group"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="bezel-dark-inner p-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 group-hover:bg-eco-800">
                  <Icon :name="item.icon" class="w-6 h-6 text-eco-300" />
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white mb-3">{{ item.name }}</h3>
                  <p v-if="item.value" class="text-gray-300 font-light leading-relaxed">{{ item.value }}</p>
                  <div v-if="item.tags && item.tags.length > 0" class="flex flex-wrap gap-2 mt-4">
                    <span v-for="(tag, tagIndex) in item.tags" :key="tagIndex"
                      class="px-3 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium border border-white/10">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 加载状态 -->
  <section v-else-if="pending" class="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-eco-900/85">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-5xl mx-auto">
        <div class="animate-pulse">
          <div class="flex items-center mb-10">
            <div class="w-14 h-14 bg-white/20 rounded-2xl mr-5"></div>
            <div class="space-y-2">
              <div class="h-4 bg-white/20 rounded w-40"></div>
              <div class="h-8 bg-white/20 rounded w-56"></div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="i in 4" :key="i" class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-white/20 rounded-xl"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-5 bg-white/20 rounded w-32"></div>
                  <div class="h-3 bg-white/20 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 错误状态 -->
  <section v-else class="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-eco-900/85">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-5xl mx-auto text-center">
        <div class="w-16 h-16 bg-yellow-100/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-yellow-400" />
        </div>
        <p class="text-xl text-white">加载企业理念与愿景失败</p>
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
