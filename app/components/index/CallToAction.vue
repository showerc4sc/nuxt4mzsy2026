<template>
  <section class="relative overflow-hidden bg-[#f4f7f5] py-20 md:py-28">
    <div class="site-container">
      <div v-if="pending" class="mx-auto max-w-4xl space-y-5" aria-label="联系信息加载中">
        <div class="skeleton h-12 w-2/3 rounded"></div><div class="skeleton h-20 rounded"></div><div class="skeleton h-14 w-48 rounded-xl"></div>
      </div>
      <div v-else-if="error" class="rounded-2xl border border-[#eaded5] bg-[#fffaf5] px-6 py-16 text-center text-[#8a5b40]">加载失败，请稍后重试</div>

      <template v-else>
        <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div class="reveal lg:col-span-8">
            <p class="eyebrow">{{ sectionData.subtitle || '联系我们' }}</p>
            <h2 class="max-w-4xl text-[2rem] font-semibold leading-[1.2] tracking-[-0.035em] text-[#102f27] sm:text-4xl lg:text-5xl">{{ sectionData.title || '准备好开启绿色能源之旅了吗？' }}</h2>
            <p class="mt-6 max-w-2xl text-base leading-8 text-[#63776c]">{{ sectionData.summary || '联系我们的专业团队，了解更多关于新能源解决方案的信息，让我们一起为可持续发展贡献力量' }}</p>
          </div>
          <div class="reveal reveal-delay-1 lg:col-span-4 lg:text-right">
            <NuxtLink to="/contact" class="btn-primary group">立即咨询<span class="btn-icon bg-white/10"><Icon name="heroicons:arrow-up-right" class="h-4 w-4" /></span></NuxtLink>
          </div>
        </div>

        <div class="reveal reveal-delay-2 mt-12 grid overflow-hidden rounded-2xl border border-[#d9e3dd] bg-white sm:grid-cols-3">
          <div class="flex items-start gap-4 border-b border-[#e1e8e4] p-6 sm:border-b-0 sm:border-r">
            <Icon name="heroicons:phone" class="mt-1 h-5 w-5 shrink-0 text-[#397b62]" />
            <div class="min-w-0"><p class="text-xs text-[#7b8d83]">服务热线</p><p class="mt-2 break-all font-mono text-sm font-semibold tabular-nums text-[#24483a]">{{ companyTel || '400-888-8888' }}</p></div>
          </div>
          <div class="flex items-start gap-4 border-b border-[#e1e8e4] p-6 sm:border-b-0 sm:border-r">
            <Icon name="heroicons:envelope" class="mt-1 h-5 w-5 shrink-0 text-[#397b62]" />
            <div class="min-w-0"><p class="text-xs text-[#7b8d83]">电子邮箱</p><p class="mt-2 break-all text-sm font-medium text-[#24483a]">{{ companyEmail || 'contact@mzsy.com' }}</p></div>
          </div>
          <div class="flex items-start gap-4 p-6">
            <Icon name="heroicons:map-pin" class="mt-1 h-5 w-5 shrink-0 text-[#397b62]" />
            <div class="min-w-0"><p class="text-xs text-[#7b8d83]">公司地址</p><p class="mt-2 text-sm font-medium leading-6 text-[#24483a]">{{ companyAddress || '上海市浦东新区' }}</p></div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { getArticleBySlug } from '~/api/article';
import { useCompanyInfo } from '~/composables/useCompanyInfo.js';

const { companyAddress, companyTel, companyEmail } = useCompanyInfo();
const { data: articleData, pending, error } = await useAsyncData('cta-section', async () => {
  try {
    return await getArticleBySlug('index-contact') || {};
  } catch (err) {
    console.error('获取CTA区域数据失败:', err);
    return {};
  }
}, { server: true });

const sectionData = computed(() => ({
  title: articleData.value?.title || '准备好开启绿色能源之旅了吗？',
  subtitle: articleData.value?.subtitle || '联系我们',
  summary: articleData.value?.summary || '联系我们的专业团队，了解更多关于新能源解决方案的信息，让我们一起为可持续发展贡献力量'
}));
</script>
