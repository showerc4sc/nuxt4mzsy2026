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
    <section class="py-16 bg-white border-t border-gray-200">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h3 class="text-xl font-bold text-gray-900 mb-4">商务合作</h3>
          <p class="text-gray-600 mb-8">
            欢迎整车厂、能源企业、物流运营商等洽谈合作
          </p>
          <NuxtLink to="/contact"
            class="inline-flex items-center px-6 py-3 bg-eco-600 text-white font-medium rounded-lg hover:bg-eco-700 transition-colors duration-200">
            联系我们
            <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: '合作伙伴 - 淼泽松源（上海）科技发展有限公司',
  meta: [
    { name: 'description', content: '淼泽松源与多家知名企业和机构建立战略合作伙伴关系，共同推动新能源技术创新和产业化发展。' }
  ]
});
</script>
