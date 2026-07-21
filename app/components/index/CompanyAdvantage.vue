<template>
  <section class="relative overflow-hidden bg-white py-32 md:py-40">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center py-20">
        <div class="h-12 w-12 animate-spin rounded-full border-2 border-eco-300 border-t-eco-800"></div>
      </div>

      <div v-else class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <!-- 左侧：标题与正文 -->
        <div class="reveal lg:pt-4">
          <h2 class="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {{ advantageData?.title || '为什么选择淼泽松源' }}
          </h2>
          <div
            class="advantage-content mt-6 max-w-none text-base font-light leading-relaxed text-gray-600 md:text-lg"
            v-html="advantageData?.content || ''"
          ></div>
        </div>

        <!-- 右侧：优势清单（Double-Bezel） -->
        <div class="reveal reveal-delay-1 lg:pt-4">
          <div class="bezel">
            <div class="bezel-inner divide-y divide-gray-100">
              <div
                v-for="(item, index) in rightAdvantages"
                :key="index"
                class="flex items-start gap-5 p-6"
              >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-eco-800 text-white">
                  <Icon :name="getCheckIconName(index)" class="h-5 w-5" />
                </div>
                <div>
                  <h4 class="mb-1 font-semibold text-gray-900">{{ item.attrName }}</h4>
                  <p class="text-sm leading-relaxed text-gray-600">{{ item.attrValue }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部 CTA：Button-in-Button -->
          <NuxtLink
            to="/about"
            class="group mt-6 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white pl-5 pr-2 py-2 text-sm font-semibold text-gray-900 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-eco-300 hover:bg-eco-50 active:scale-[0.98]"
          >
            <Icon name="heroicons:arrow-path" class="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            <span>持续创新，永不止步</span>
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 group-hover:bg-eco-100 group-hover:text-eco-700">
              <Icon name="heroicons:arrow-right" class="h-3.5 w-3.5" />
            </span>
          </NuxtLink>
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

// 图标配置：统一 eco 强调色，不再使用紫/黄/蓝混色
const rightIconConfig = [
  { name: 'heroicons:check-circle' },
  { name: 'heroicons:users' },
  { name: 'heroicons:cog-6-tooth' },
  { name: 'heroicons:shield-check' }
];

/**
 * 获取右侧图标名称
 */
const getCheckIconName = (index) => {
  return rightIconConfig[index]?.name || 'heroicons:check-circle';
};

/**
 * 根据 slug 获取文章数据
 */
const { data: advantageData, pending } = await useAsyncData(
  'advantage-article',
  () => getArticleBySlug('index-advantage'),
  {
    transform: (response) => {
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

  return advantageData.value.attrList.map((item) => ({
    attrName: item.attrName || '',
    attrValue: item.attrValue || ''
  }));
});
</script>

<style scoped>
/* 富文本内容排版（来自 API 的 HTML） */
.advantage-content :deep(p) {
  margin-bottom: 1rem;
}

.advantage-content :deep(h3),
.advantage-content :deep(h4) {
  font-weight: 600;
  color: rgb(17 24 39);
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.advantage-content :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}

.advantage-content :deep(li) {
  margin-bottom: 0.25rem;
}

.advantage-content :deep(strong) {
  color: rgb(17 24 39);
  font-weight: 600;
}
</style>
