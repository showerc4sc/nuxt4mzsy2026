<template>
  <section class="py-24 relative overflow-hidden">
    <!-- 动态背景层 - 使用伪元素实现视差效果，而非 background-attachment: fixed -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-cover bg-center transform scale-110"
        :style="{ backgroundImage: `url(${advantageData?.cover || 'https://picsum.photos/seed/mzsy-advantage/1920/1080.jpg'})` }">
      </div>
    </div>

    <!-- 多层渐变遮罩 -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-eco-900/85 z-[1]"></div>

    <!-- 静态光效层 -->
    <div class="absolute inset-0 z-[2] opacity-30 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-eco-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
    </div>

    <!-- 网格装饰 -->
    <div class="absolute inset-0 z-[2] opacity-5 pointer-events-none"
      style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;">
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-400"></div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- 左侧内容区 -->
        <div class="space-y-8">
          <!-- 标签 -->
          <div
            class="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md text-eco-300 rounded-full text-sm font-medium">
            <Icon name="heroicons:trophy" class="w-4 h-4 mr-2" />
            {{ advantageData?.subtitle || '我们的优势' }}
          </div>

          <!-- 标题 -->
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {{ advantageData?.title || '为什么选择淼泽松源' }}
          </h2>

          <!-- 内容 -->
          <div class="text-gray-300 space-y-4 text-lg" v-html="advantageData?.content || ''"></div>

          <!-- 统计数据展示 -->
          <div class="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div class="text-center">
              <div class="text-3xl font-bold text-eco-400 mb-1">10+</div>
              <div class="text-sm text-gray-400">年行业经验</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-400 mb-1">500+</div>
              <div class="text-sm text-gray-400">成功案例</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-400 mb-1">98%</div>
              <div class="text-sm text-gray-400">客户满意度</div>
            </div>
          </div>
        </div>

        <!-- 右侧优势卡片 -->
        <div class="relative">
          <!-- 装饰性背景 -->
          <div class="absolute -inset-4 bg-gradient-to-r from-eco-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>

          <div class="relative rounded-3xl overflow-hidden shadow-2xl glass-dark p-8 md:p-10">
            <h3 class="text-2xl font-bold text-white mb-8 flex items-center">
              <span
                class="w-12 h-12 bg-gradient-to-br from-eco-500 to-eco-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Icon name="heroicons:star" class="w-6 h-6 text-white" />
              </span>
              核心优势
            </h3>

            <div class="space-y-6">
              <div v-for="(item, index) in rightAdvantages" :key="index" class="flex items-start space-x-4 p-3">
                <div
                  class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
                  <Icon :name="getCheckIconName(index)" class="w-7 h-7" :class="getCheckIconColorClass(index)" />
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-white mb-1">{{ item.attrName }}</h4>
                  <p class="text-gray-400 text-sm leading-relaxed">{{ item.attrValue }}</p>
                </div>
              </div>
            </div>

            <!-- 底部CTA -->
            <div class="mt-8 pt-6 border-t border-white/10 text-center">
              <NuxtLink to="/about"
                class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 group border border-white/20 hover:border-white/40">
                <Icon name="heroicons:arrow-path"
                  class="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                持续创新，永不止步
                <Icon name="heroicons:arrow-right"
                  class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 公司优势组件
 * 展示公司核心优势和选择理由
 * 数据来源：通过 slug "index-advantage" 获取文章内容
 */

import { getArticleBySlug } from '~/api/article';

// 图标配置
const rightIconConfig = [
  { name: 'heroicons:check-circle', color: 'text-eco-400' },
  { name: 'heroicons:users', color: 'text-blue-400' },
  { name: 'heroicons:cog-6-tooth', color: 'text-yellow-400' },
  { name: 'heroicons:shield-check', color: 'text-green-400' }
];

/**
 * 获取右侧图标名称
 */
const getCheckIconName = (index) => {
  return rightIconConfig[index]?.name || 'heroicons:check-circle';
};

/**
 * 获取右侧图标颜色类名
 */
const getCheckIconColorClass = (index) => {
  return rightIconConfig[index]?.color || 'text-eco-400';
};

/**
 * 根据 slug 获取文章数据
 */
const { data: advantageData, pending } = await useAsyncData(
  'advantage-article',
  () => getArticleBySlug('index-advantage'),
  {
    transform: (response) => {
      console.log('优势数据:', response);
      return response || null;
    }
  }
);

/**
 * 右侧优势数据（从 attrList 获取）
 */
const rightAdvantages = computed(() => {
  if (!advantageData.value?.attrList || !Array.isArray(advantageData.value.attrList)) {
    // 默认数据
    return [
      { attrName: '行业领先经验', attrValue: '深耕新能源领域多年，拥有丰富的项目实施经验和成功案例' },
      { attrName: '专业团队支持', attrValue: '汇聚行业顶尖人才，提供从咨询到实施的全流程专业服务' },
      { attrName: '定制化解决方案', attrValue: '根据客户需求量身定制，确保每个项目都能达到最佳效果' },
      { attrName: '可靠品质保证', attrValue: '严格的质量控制体系，确保产品稳定性和长期可靠运行' }
    ];
  }

  return advantageData.value.attrList.map(item => ({
    attrName: item.attrName || '',
    attrValue: item.attrValue || ''
  }));
});
</script>

<style scoped>
/* 组件特定样式 */
</style>
