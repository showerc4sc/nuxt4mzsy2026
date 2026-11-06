<template>
  <section class="relative isolate -mt-24 overflow-hidden bg-[#102f27] pb-16 pt-40 text-white md:pb-20 md:pt-44">
    <div v-if="!pending && !error" class="absolute inset-0 -z-20 bg-cover bg-center" :style="{ backgroundImage: `url('${backgroundImage}')` }" role="img" :aria-label="title"></div>
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,37,29,.96)_0%,rgba(10,45,35,.88)_55%,rgba(10,43,34,.64)_100%)]"></div>
    <div class="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/3 opacity-30 lg:block" style="background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px); background-size: 52px 52px;"></div>

    <div class="site-container">
      <div v-if="pending" class="animate-pulse" aria-label="页面标题加载中">
        <div class="mb-6 h-4 w-32 rounded bg-white/15"></div>
        <div class="h-12 w-64 max-w-full rounded bg-white/20"></div>
        <div class="mt-6 h-6 w-[32rem] max-w-full rounded bg-white/10"></div>
      </div>
      <div v-else-if="error" class="flex items-center gap-3 text-white/80" role="status">
        <Icon name="heroicons:exclamation-circle" class="h-6 w-6 text-[#d8c69c]" />
        <p>页面标题暂时无法加载</p>
      </div>
      <div v-else class="reveal max-w-4xl">
        <p class="mb-5 text-[10px] font-medium tracking-[0.22em] text-[#a9cdbd]">MIAOZE SONGYUAN</p>
        <h1 class="text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl md:text-6xl">{{ title }}</h1>
        <p v-if="subtitle" class="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">{{ subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getCategoryBySlug } from '~/api/category';

useReveal();
const props = defineProps({
  slug: { type: String, required: true }
});

const { data: categoryData, pending, error } = useAsyncData(`page-title-${props.slug}`, async () => {
  try {
    const response = await getCategoryBySlug(props.slug);
    console.log('getCategoryBySlug', response);
    return response || {};
  } catch (err) {
    console.error('获取页面标题数据失败:', err);
    return {};
  }
}, { server: true });

const title = computed(() => categoryData.value?.title || '页面标题');
const subtitle = computed(() => categoryData.value?.subtitle || '');
const backgroundImage = computed(() => categoryData.value?.cover || 'https://picsum.photos/seed/mzsy-default/1920/1080.jpg');
</script>
