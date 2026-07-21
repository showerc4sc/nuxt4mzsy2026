<template>
  <div>
    <!-- 页面头部 -->
    <PageTitle slug="partners" />

    <!-- 合作领域 -->
    <PartnersCooperationFields slug="partner-1" />

    <!-- 合作伙伴列表 -->
    <PartnersPartnerCompanies slug="partner-2" />

    <!-- 合作成果 -->
    <PartnersCooperationAchievements slug="partner-3" />

    <!-- 合作联系 -->
    <section class="py-32 md:py-40 bg-white border-t border-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="reveal max-w-2xl mx-auto text-center">
          <h3 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">商务合作</h3>
          <p class="text-lg font-light text-gray-600 mb-12 leading-relaxed">
            欢迎整车厂、能源企业、物流运营商等洽谈合作
          </p>
          <NuxtLink to="/contact"
            class="group inline-flex items-center gap-3 rounded-full bg-eco-800 pl-7 pr-2 py-3 text-base font-semibold text-white shadow-[0_8px_32px_rgba(22,101,52,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 active:scale-[0.98]">
            <span>立即咨询</span>
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
              <Icon name="heroicons:arrow-right" class="w-4 h-4" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 滚动入场动效
useReveal();

// 设置页面元数据
useHead({
  title: '合作伙伴 - 淼泽松源（上海）科技发展有限公司',
  meta: [
    { name: 'description', content: '淼泽松源与多家知名企业和机构建立战略合作伙伴关系，共同推动新能源技术创新和产业化发展。' }
  ]
});
</script>
