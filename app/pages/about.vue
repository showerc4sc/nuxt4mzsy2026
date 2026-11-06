<template>
  <div class="bg-[#f5f8f6] text-[#102b25]">
    <!-- 页面标题 -->
    <PageTitle slug="about" />

    <!-- 页面内容容器 -->
    <div class="relative z-10">

      <!-- 企业概览 -->
      <AboutCompanyOverview slug="about-1" />

      <!-- 管理层简介 -->
      <AboutManagementTeam />

      <!-- 经营范围 -->
      <AboutBusinessScope slug="about-2" />

      <!-- 企业理念与愿景 -->
      <AboutCompanyVision slug="about-3" />

      <!-- 我们的优势 -->
      <AboutCompanyAdvantages slug="about-4" />

      <!-- 行动号召 -->
      <section class="relative overflow-hidden border-t border-[#102b25]/10 bg-[#e9f0ec] py-20 sm:py-24 lg:py-28">
        <div class="pointer-events-none absolute bottom-0 right-0 hidden h-full w-1/3 lg:block" aria-hidden="true">
          <div class="absolute inset-y-0 right-[16%] w-px bg-[#102b25]/[0.06]"></div>
          <div class="absolute inset-y-0 right-[48%] w-px bg-[#102b25]/[0.06]"></div>
          <div class="absolute bottom-[20%] left-0 h-px w-full bg-[#102b25]/[0.06]"></div>
        </div>
        <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
            <div class="reveal lg:col-span-7">
              <p class="mb-5 text-sm font-medium tracking-[0.12em] text-[#137457]">携手共创绿色未来</p>
              <h2 class="max-w-2xl text-3xl font-semibold leading-[1.25] tracking-[-0.035em] text-[#102b25] sm:text-4xl lg:text-[2.75rem]">
                加入我们的清洁能源事业
              </h2>
              <p class="mt-6 max-w-xl text-base leading-8 text-[#425c53]">
                与淼泽松源携手，共同推动新能源技术的发展与应用，为可持续发展贡献力量
              </p>
            </div>
            <div class="reveal reveal-delay-1 flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <NuxtLink
                to="/contact"
                class="group inline-flex min-h-12 items-center justify-between gap-8 whitespace-nowrap rounded-sm bg-[#102b25] px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#159a76] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#159a76] active:translate-y-px"
              >
                <span>立即咨询</span>
                <Icon name="heroicons:arrow-up-right" class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </NuxtLink>
              <NuxtLink
                to="/products"
                class="group inline-flex min-h-12 items-center justify-between gap-8 whitespace-nowrap rounded-sm border border-[#102b25]/20 px-6 py-3 text-sm font-semibold text-[#102b25] transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#159a76]/40 hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#159a76] active:translate-y-px"
              >
                <span>探索产品</span>
                <Icon name="heroicons:arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
/**
 * 关于我们页面
 * 展示淼泽松源的企业概览、经营范围、经营理念、企业愿景、企业使命、企业价值观和企业优势
 */

// 滚动入场动效
useReveal();

// 设置页面元数据
useHead({
  title: '关于我们 - 淼泽松源（上海）科技发展有限公司',
  meta: [
    { name: 'description', content: '了解淼泽松源的企业概览、经营范围、经营理念、企业愿景、企业使命、企业价值观和企业优势。' }
  ]
});
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1.5rem;
}
</style>