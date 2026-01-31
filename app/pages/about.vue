<template>
  <div>
    <!-- 页面标题 -->
    <PageTitle slug="about" />

    <!-- 页面内容容器 -->
    <div class="relative z-10">

    <!-- 企业概览 -->
    <AboutCompanyOverview slug="about-1" />

    <!-- 经营范围 -->
    <AboutBusinessScope slug="about-2" />

    <!-- 企业理念与愿景 -->
    <AboutCompanyVision slug="about-3" />

    <!-- 我们的优势 -->
    <AboutCompanyAdvantages slug="about-4" />

    <!-- 行动号召 -->
    <section class="py-20 bg-gradient-to-br from-eco-600 via-eco-700 to-blue-700 text-white relative overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="max-w-3xl mx-auto">
          <div class="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 border border-white/20">
            <Icon name="heroicons:sparkles" class="w-4 h-4 mr-2" />
            携手共创绿色未来
          </div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6">加入我们的清洁能源事业</h2>
          <p class="text-xl mb-10 opacity-90 leading-relaxed">
            与淼泽松源携手，共同推动新能源技术的发展与应用，为可持续发展贡献力量
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/contact"
              class="group px-8 py-4 bg-white text-eco-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2" />
              联系我们
              <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            <NuxtLink
              to="/products"
              class="group px-8 py-4 bg-white/10 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-eco-600 transition-all duration-300 flex items-center justify-center"
            >
              <Icon name="heroicons:cube-transparent" class="w-5 h-5 mr-2" />
              查看产品
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