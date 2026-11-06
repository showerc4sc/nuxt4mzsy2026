<template>
  <section class="relative overflow-hidden bg-[#eef3ef] py-20 md:py-28">
    <div class="pointer-events-none absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-[#dcebe2]/70 blur-3xl"></div>
    <div class="site-container relative">
      <div v-if="pending" class="grid gap-12 lg:grid-cols-2" aria-label="公司优势加载中">
        <div class="space-y-5"><div class="skeleton h-12 w-3/4 rounded"></div><div class="skeleton h-40 rounded"></div></div>
        <div class="skeleton h-96 rounded-2xl"></div>
      </div>

      <div v-else class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="reveal lg:col-span-5 lg:pt-3">
          <p class="eyebrow">WHY MIAOZE</p>
          <h2 class="section-heading">{{ advantageData?.title || '为什么选择淼泽松源' }}</h2>
          <div class="advantage-content mt-7 max-w-[65ch] text-base leading-8 text-[#5f746a]" v-html="advantageData?.content || ''"></div>
          <NuxtLink to="/about" class="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#216d53]">
            了解淼泽松源
            <span class="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c9d9d0] bg-white/60 transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="heroicons:arrow-right" class="h-4 w-4" />
            </span>
          </NuxtLink>
        </div>

        <div class="reveal reveal-delay-1 lg:col-span-7">
          <div class="overflow-hidden rounded-2xl border border-[#d7e2db] bg-white/80">
            <div v-for="(item, index) in rightAdvantages" :key="index" class="group grid grid-cols-[auto_1fr] gap-5 border-b border-[#e0e8e3] p-6 last:border-0 sm:p-7">
              <div class="icon-tile transition-colors duration-300 group-hover:bg-[#176f5a] group-hover:text-white">
                <Icon :name="getCheckIconName(index)" class="h-5 w-5" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-[#1a3f33]">{{ item.attrName }}</h3>
                <p class="mt-2 text-sm leading-7 text-[#65796f]">{{ item.attrValue }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getArticleBySlug } from '~/api/article';

const rightIconConfig = [
  { name: 'heroicons:check-circle' },
  { name: 'heroicons:users' },
  { name: 'heroicons:cog-6-tooth' },
  { name: 'heroicons:shield-check' }
];
const getCheckIconName = (index) => rightIconConfig[index]?.name || 'heroicons:check-circle';

const { data: advantageData, pending } = await useAsyncData('advantage-article', () =>
  getArticleBySlug('index-advantage'), {
  transform: (response) => response || null
});

const rightAdvantages = computed(() => {
  if (!advantageData.value?.attrList || !Array.isArray(advantageData.value.attrList)) {
    return [
      { attrName: '行业领先经验', attrValue: '深耕新能源领域多年，拥有丰富的项目实施经验和成功案例' },
      { attrName: '专业团队支持', attrValue: '汇聚行业顶尖人才，提供从咨询到实施的全流程专业服务' },
      { attrName: '定制化解决方案', attrValue: '根据客户需求量身定制，确保每个项目都能达到最佳效果' },
      { attrName: '可靠品质保证', attrValue: '严格的质量控制体系，确保产品稳定性和长期可靠运行' }
    ];
  }
  return advantageData.value.attrList.map((item) => ({ attrName: item.attrName || '', attrValue: item.attrValue || '' }));
});
</script>

<style scoped>
.advantage-content :deep(p) { margin-bottom: 1rem; }
.advantage-content :deep(h3), .advantage-content :deep(h4) { margin: 1.5rem 0 0.5rem; color: #1a3f33; font-weight: 600; }
.advantage-content :deep(ul) { margin-bottom: 1rem; padding-left: 1.25rem; list-style: disc; }
.advantage-content :deep(li) { margin-bottom: 0.25rem; }
.advantage-content :deep(strong) { color: #1a3f33; font-weight: 600; }
</style>
