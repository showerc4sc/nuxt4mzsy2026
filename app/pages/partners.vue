<template>
  <div class="bg-[#f5f8f6] text-[#102b25]">
    <!-- 页面头部 -->
    <PageTitle slug="partners" />

    <!-- 合作领域 -->
    <PartnersCooperationFields slug="partner-1" />

    <!-- 合作伙伴列表 -->
    <PartnersPartnerCompanies slug="partner-2" />

    <!-- 合作成果 -->
    <PartnersCooperationAchievements slug="partner-3" />

    <!-- 合作联系 -->
    <section class="border-t border-[#102b25]/10 bg-[#e9f0ec] py-20 sm:py-24 lg:py-28">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div class="reveal lg:col-span-7">
            <p class="mb-5 text-sm font-medium tracking-[0.12em] text-[#137457]">开放协作，长期共赢</p>
            <h2 class="text-3xl font-semibold tracking-[-0.035em] text-[#102b25] sm:text-4xl">商务合作</h2>
            <p class="mt-6 max-w-xl text-base leading-8 text-[#425c53]">
              欢迎整车厂、能源企业、物流运营商等洽谈合作
            </p>
          </div>
          <div class="reveal reveal-delay-1 lg:col-span-5 lg:flex lg:justify-end">
            <NuxtLink
              to="/contact"
              class="group inline-flex min-h-12 w-full items-center justify-between gap-8 whitespace-nowrap rounded-sm bg-[#102b25] px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#159a76] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#159a76] active:translate-y-px sm:w-auto"
            >
              <span>立即咨询</span>
              <Icon name="heroicons:arrow-up-right" class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </NuxtLink>
          </div>
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
