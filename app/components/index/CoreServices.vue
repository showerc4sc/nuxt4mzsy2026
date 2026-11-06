<template>
  <section class="relative overflow-hidden bg-white py-20 md:py-28">
    <div class="site-container">
      <div class="reveal mb-12">
        <p class="eyebrow">{{ sectionData.subtitle || '我们的服务' }}</p>
        <h2 class="section-heading">{{ sectionData.title || '核心业务' }}</h2>
        <p class="section-copy">{{ sectionData.summary || '我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案' }}</p>
      </div>

      <div v-if="pending" class="grid gap-5 md:grid-cols-2" aria-label="核心业务加载中">
        <div class="skeleton h-[32rem] rounded-2xl"></div>
        <div class="grid gap-5"><div v-for="i in 3" :key="i" class="skeleton h-36 rounded-2xl"></div></div>
      </div>
      <div v-else-if="error" class="rounded-2xl border border-[#eaded5] bg-[#fffaf5] px-6 py-16 text-center text-[#8a5b40]">加载失败，请稍后重试</div>

      <template v-else-if="servicesData.length">
        <div class="grid gap-5 md:grid-cols-2">
          <article v-if="servicesData[0]" class="reveal group relative overflow-hidden rounded-2xl bg-[#123b30] p-7 text-white sm:p-10 md:row-span-3">
            <div class="pointer-events-none absolute inset-0 opacity-30" style="background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px); background-size: 48px 48px;"></div>
            <div class="relative flex h-full min-h-[28rem] flex-col">
              <div class="flex items-center justify-between">
                <span class="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-[#b3ddc9]"><Icon :name="`heroicons:${servicesData[0].icon}`" class="h-7 w-7" /></span>
                <span class="font-mono text-xs tracking-widest text-white/45">01</span>
              </div>
              <div class="mt-auto pt-16">
                <h3 class="text-3xl font-semibold tracking-tight md:text-4xl">{{ servicesData[0].title }}</h3>
                <p class="mt-5 max-w-lg text-sm leading-7 text-white/65 md:text-base md:leading-8">{{ servicesData[0].description }}</p>
                <div class="mt-7 flex flex-wrap gap-2">
                  <span v-for="feature in servicesData[0].features" :key="feature" class="rounded-md bg-white/10 px-3 py-1.5 text-xs text-white/80">{{ feature }}</span>
                </div>
              </div>
            </div>
          </article>

          <article v-for="(service, index) in servicesData.slice(1)" :key="service.id" class="reveal group rounded-2xl border border-[#dfe7e2] bg-[#f8faf9] p-6 transition-all duration-400 ease-out hover:-translate-y-1 hover:border-[#b9d0c3] hover:bg-white sm:p-8" :class="`reveal-delay-${Math.min(index + 1, 5)}`">
            <div class="flex h-full gap-5">
              <div class="icon-tile bg-white transition-colors duration-300 group-hover:bg-[#176f5a] group-hover:text-white"><Icon :name="`heroicons:${service.icon}`" class="h-6 w-6" /></div>
              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-4">
                  <h3 class="text-xl font-semibold text-[#1b4034]">{{ service.title }}</h3>
                  <span class="font-mono text-[11px] text-[#91a299]">{{ String(index + 2).padStart(2, '0') }}</span>
                </div>
                <p class="mt-3 text-sm leading-7 text-[#667b70]">{{ service.description }}</p>
                <div v-if="service.features?.length" class="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  <span v-for="feature in service.features" :key="feature" class="text-xs font-medium text-[#46715e]">{{ feature }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="reveal mt-9">
          <NuxtLink to="/products" class="btn-secondary group">查看全部服务<span class="btn-icon"><Icon name="heroicons:arrow-right" class="h-4 w-4" /></span></NuxtLink>
        </div>
      </template>

      <div v-else class="rounded-2xl border border-dashed border-[#cbdad1] py-16 text-center text-[#73857b]">业务内容正在更新</div>
    </div>
  </section>
</template>

<script setup>
import { getArticleBySlug } from '~/api/article';

const { data: articleData, pending, error } = await useAsyncData('core-services', async () => {
  try {
    return await getArticleBySlug('index-core-biz') || {};
  } catch (err) {
    console.error('获取核心业务数据失败:', err);
    return {};
  }
}, { server: true });

const servicesData = computed(() => {
  if (!articleData.value?.attrList || !Array.isArray(articleData.value.attrList)) return [];
  return articleData.value.attrList.map((item) => ({
    id: item._index,
    title: item.attrName || '',
    description: item.attrValue || '',
    icon: item.attrEx || 'beaker',
    features: item.attrTags || []
  }));
});

const sectionData = computed(() => {
  if (!articleData.value) {
    return { title: '核心业务', subtitle: '我们的服务', summary: '我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案' };
  }
  return {
    title: articleData.value.title || '核心业务',
    subtitle: articleData.value.subtitle || '我们的服务',
    summary: articleData.value.summary || '我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案'
  };
});
</script>
