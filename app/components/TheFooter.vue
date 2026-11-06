<template>
  <footer class="relative overflow-hidden bg-[#0d2822] text-white">
    <div class="pointer-events-none absolute inset-0 opacity-30" style="background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 64px 64px;"></div>
    <div class="site-container relative">
      <div class="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-5">
          <NuxtLink to="/" class="inline-flex items-center gap-3 rounded-lg">
            <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1">
              <img src="/images/logo.png" alt="淼泽松源" class="h-full w-full object-contain" />
            </span>
            <span>
              <span class="block text-xl font-bold">{{ company.name }}</span>
              <span class="mt-1 block text-[10px] tracking-[0.2em] text-white/45">MIAOZE SONGYUAN</span>
            </span>
          </NuxtLink>
          <p class="mt-7 max-w-md text-sm leading-7 text-white/60 md:text-base md:leading-8">{{ company.description }}</p>
          <NuxtLink to="/contact" class="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#a4d9c3]">
            与我们洽谈合作
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="heroicons:arrow-up-right" class="h-4 w-4" />
            </span>
          </NuxtLink>
        </div>

        <div class="lg:col-span-2 lg:col-start-7">
          <h2 class="text-sm font-semibold text-white">快速链接</h2>
          <ul class="mt-6 space-y-4">
            <li v-for="item in navigationItems" :key="item.name">
              <NuxtLink :to="item.path" class="text-sm text-white/60 transition-colors hover:text-white">{{ item.name }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4 lg:col-start-9">
          <h2 class="text-sm font-semibold text-white">联系方式</h2>
          <address class="mt-6 space-y-5 not-italic">
            <div class="flex items-start gap-3 text-sm leading-6 text-white/60">
              <Icon name="heroicons:map-pin" class="mt-1 h-4 w-4 shrink-0 text-[#8cc9b0]" />
              <span>{{ contactData.address }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-white/60">
              <Icon name="heroicons:phone" class="h-4 w-4 shrink-0 text-[#8cc9b0]" />
              <span class="font-mono tabular-nums">{{ contactData.phone }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-white/60">
              <Icon name="heroicons:envelope" class="h-4 w-4 shrink-0 text-[#8cc9b0]" />
              <span class="break-all">{{ contactData.email }}</span>
            </div>
          </address>
        </div>
      </div>

      <div class="flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ currentYear }} {{ company.name }}. 保留所有权利</p>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="w-fit transition-colors hover:text-white/80">沪ICP备2026003102号-1</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useCompanyInfo } from '~/composables/useCompanyInfo.js';

const currentYear = new Date().getFullYear();
const { companyName, companySummary, companyAddress, companyTel, companyEmail } = useCompanyInfo();

const company = computed(() => ({
  name: companyName.value || '淼泽松源',
  description: companySummary.value || '淼泽松源（上海）科技发展有限公司，聚焦甲醇新能源、风能等核心技术研发，同步开展能源储存及设备销售、租赁等多元业态。'
}));

const navigationItems = [
  { name: '首页', path: '/' },
  { name: '产品列表', path: '/products' },
  { name: '合作伙伴', path: '/partners' },
  { name: '联系我们', path: '/contact' }
];

const contactData = computed(() => ({
  address: companyAddress.value || '上海市浦东新区',
  phone: companyTel.value || '021-12345678',
  email: companyEmail.value || 'contact@example.com'
}));
</script>
