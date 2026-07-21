<template>
  <div>
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
      <section class="py-32 md:py-40 bg-gradient-to-br from-eco-800 via-eco-900 to-slate-900 text-white relative overflow-hidden">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 opacity-40 pointer-events-none" style="background-image: radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.06), transparent 40%);"></div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div class="reveal max-w-3xl mx-auto">
            <div class="inline-flex items-center text-sm font-medium text-eco-300 mb-6">
              <span class="mr-3 h-px w-8 bg-eco-400"></span>
              携手共创绿色未来
              <span class="ml-3 h-px w-8 bg-eco-400"></span>
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">加入我们的清洁能源事业</h2>
            <p class="text-lg md:text-xl font-light mb-12 opacity-90 leading-relaxed">
              与淼泽松源携手，共同推动新能源技术的发展与应用，为可持续发展贡献力量
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/contact"
                class="group inline-flex items-center gap-3 rounded-full bg-eco-800 pl-7 pr-2 py-3 text-base font-semibold text-white shadow-[0_8px_32px_rgba(22,101,52,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 active:scale-[0.98]"
              >
                <Icon name="heroicons:chat-bubble-left-right" class="h-5 w-5" />
                <span>立即咨询</span>
                <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <Icon name="heroicons:arrow-right" class="h-4 w-4" />
                </span>
              </NuxtLink>
              <NuxtLink
                to="/products"
                class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/50 hover:bg-white/10 active:scale-[0.98]"
              >
                <Icon name="heroicons:cube-transparent" class="h-5 w-5" />
                探索产品
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