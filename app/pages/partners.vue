<template>
  <div>
    <!-- 页面头部 -->
    <PageTitle slug="partners" />

    <!-- 页面内容容器 -->
    <div class="relative z-10">

      <!-- 合作伙伴介绍 -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">携手共创绿色未来</h2>
            <p class="text-lg text-gray-600">
              淼泽松源与多家知名企业和机构建立战略合作伙伴关系，通过资源共享、优势互补，
              共同推动新能源技术创新和产业化发展，为全球可持续发展贡献力量。
            </p>
          </div>

          <!-- 合作伙伴分类 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div class="text-center">
              <div class="w-16 h-16 bg-eco-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:academic-cap" class="w-8 h-8 text-eco-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">学术合作</h3>
              <p class="text-gray-600">与顶尖高校和研究机构合作，推动前沿技术研发</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:handshake" class="w-8 h-8 text-primary-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">战略伙伴</h3>
              <p class="text-gray-600">与行业领军企业建立战略合作，共同开拓市场</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:cog" class="w-8 h-8 text-yellow-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">产业联盟</h3>
              <p class="text-gray-600">加入产业联盟，共同制定行业标准和发展方向</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 合作伙伴列表 -->
      <section class="py-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">我们的合作伙伴</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="partner in partnersData" :key="partner.id"
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon name="heroicons:building-office" class="w-8 h-8 text-gray-600" />
                  </div>
                  <span class="text-sm font-medium text-eco-600 bg-eco-50 px-3 py-1 rounded-full">
                    {{ partner.type }}
                  </span>
                </div>

                <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ partner.name }}</h3>
                <p class="text-gray-600 mb-4">{{ partner.description }}</p>

                <div class="flex items-center text-eco-600 font-medium hover:text-eco-700 cursor-pointer">
                  了解更多
                  <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 合作优势 -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">合作优势</h2>
            <p class="text-lg text-gray-600">
              通过强强联合，我们为合作伙伴创造更大的价值
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-eco-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:light-bulb" class="w-8 h-8 text-eco-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">技术创新</h3>
              <p class="text-gray-600">共享研发成果，加速技术迭代</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:globe-asia-australia" class="w-8 h-8 text-primary-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">市场拓展</h3>
              <p class="text-gray-600">共享市场资源，扩大业务范围</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:currency-dollar" class="w-8 h-8 text-yellow-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">成本优化</h3>
              <p class="text-gray-600">规模效应降低运营成本</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heroicons:shield-check" class="w-8 h-8 text-purple-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">风险共担</h3>
              <p class="text-gray-600">共同应对市场挑战</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 合作邀请 -->
      <section class="py-20 eco-gradient">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            期待与您携手合作
          </h2>
          <p class="text-xl text-white opacity-90 mb-10 max-w-2xl mx-auto">
            如果您对新能源技术发展充满热情，欢迎与我们联系，共同开创绿色能源的美好未来
          </p>
          <NuxtLink to="/contact"
            class="px-8 py-3 bg-white text-eco-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
            联系我们
          </NuxtLink>
        </div>
      </section>
    </div>
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

// 直接导入JSON数据
const { data: partnersData } = await useAsyncData('partners', async () => {
  const companyJson = await import('~/data/company.json');
  return companyJson.default.partners;
});
</script>