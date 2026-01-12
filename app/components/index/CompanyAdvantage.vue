<template>
  <section class="py-20 relative overflow-hidden"
    :style="{ backgroundImage: `url(${advantageData?.cover || 'https://picsum.photos/seed/mzsy-advantage/1920/1080.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }">
    <!-- 深色遮罩层 -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/80"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600"></div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div
            class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            {{ advantageData?.subtitle || '我们的优势' }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">
            {{ advantageData?.title || '为什么选择淼泽松源' }}
          </h2>
          <!-- 直接显示 content 内容 -->
          <div class="text-gray-300 leading-relaxed space-y-4" v-html="advantageData?.content || ''"></div>
        </div>

        <div class="relative">
          <div
            class="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md p-8 border border-white/20">
            <h3 class="text-2xl font-bold text-white mb-6 text-center">{{ advantageData?.title || '为什么选择淼泽松源' }}</h3>

            <div class="space-y-6">
              <div v-for="(item, index) in rightAdvantages" :key="index" class="flex items-start space-x-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Icon :name="getCheckIconName(index)" class="w-6 h-6" :class="getCheckIconColorClass(index)" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-white mb-2">{{ item.attrName }}</h4>
                  <p class="text-gray-300">{{ item.attrValue }}</p>
                </div>
              </div>
            </div>

            <!-- 装饰元素 -->
            <div class="mt-8 text-center">
              <div
                class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full shadow-lg border border-white/30">
                <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
                持续创新，永不止步
              </div>
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
