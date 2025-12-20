<template>
  <div>
    <!-- 页面标题 -->
    <section class="relative pt-40 pb-24 bg-gradient-to-br from-eco-600 to-primary-800 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          了解淼泽松源的企业理念与发展愿景
        </p>
      </div>
    </section>

    <!-- 页面内容容器 -->
    <div class="relative z-10">

    <!-- 企业概览 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span class="w-12 h-12 bg-eco-100 rounded-lg flex items-center justify-center mr-4">
              <Icon name="heroicons:building-office" class="w-6 h-6 text-eco-600" />
            </span>
            企业概览
          </h2>
          <div class="prose prose-lg text-gray-600 leading-relaxed">
            <p>
              淼泽松源（上海）科技发展有限公司，5000万注册资本为基石，强势布局新能源赛道，精准定位"新能源行业综合服务整合商"。公司聚焦甲醇新能源、风能等核心技术研发，同步开展能源储存及设备销售、租赁等多元业态，构建 "技术 + 设备 + 场景"产业生态闭环。
            </p>
            <p>
              在客户覆盖上，直接渗透石油钻井工程、工业园区、船舶动力、重型机车及交通辅助电源等工业场景，间接深度绑定中石油一类重点合作企业等产业链顶端伙伴，形成"终端需求 + 巨头供应链"的双轨客户矩阵。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 经营范围 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span class="w-12 h-12 bg-eco-100 rounded-lg flex items-center justify-center mr-4">
              <Icon name="heroicons:clipboard-document-list" class="w-6 h-6 text-eco-600" />
            </span>
            经营范围
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="heroicons:light-bulb" class="w-5 h-5 text-eco-500 mr-2" />
                技术服务
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>新能源技术开发</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>新能源技术服务</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>新能源技术咨询</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>新能源技术交流及转让</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="heroicons:cog" class="w-5 h-5 text-eco-500 mr-2" />
                设备销售与租赁
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>新能源机器设备销售及租赁</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>新能源原动设备销售</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>发电机及发电机组销售</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>海陆风力发电机组销售</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="heroicons:cube" class="w-5 h-5 text-eco-500 mr-2" />
                产品销售
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>石油制品销售</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>煤炭及制品销售</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>船舶销售</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>电力电子元器件销售</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="heroicons:computer-desktop" class="w-5 h-5 text-eco-500 mr-2" />
                技术与贸易
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>计算机软硬件及辅助设备批发</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>计算机软硬件及辅助设备零售</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>货物进出口</span>
                </li>
                <li class="flex items-start">
                  <Icon name="heroicons:check-circle" class="w-4 h-4 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>技术进出口</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 企业理念与愿景 -->
    <section class="py-16 relative overflow-hidden" style="background-image: url('https://picsum.photos/seed/mzsy-vision/1920/1080.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
      <!-- 深色遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/80"></div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-white mb-8 flex items-center">
            <span class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4">
              <Icon name="heroicons:light-bulb" class="w-6 h-6 text-eco-400" />
            </span>
            企业理念与愿景
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
                <Icon name="heroicons:heart" class="w-5 h-5 text-eco-400 mr-2" />
                经营理念
              </h3>
              <p class="text-gray-300 text-lg">为客户创造价值 为员工创造平台</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
                <Icon name="heroicons:flag" class="w-5 h-5 text-primary-400 mr-2" />
                企业愿景
              </h3>
              <p class="text-gray-300 text-lg">打造一流的新能源设备供应商，为清洁能源可持续发展贡献力量</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
                <Icon name="heroicons:rocket-launch" class="w-5 h-5 text-eco-400 mr-2" />
                企业使命
              </h3>
              <p class="text-gray-300 text-lg">为清洁能源持续贡献力量</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
                <Icon name="heroicons:star" class="w-5 h-5 text-primary-400 mr-2" />
                企业价值观
              </h3>
              <div class="flex flex-wrap gap-3 mt-2">
                <span class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium border border-white/30">务实</span>
                <span class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium border border-white/30">高效</span>
                <span class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium border border-white/30">担当</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 我们的优势 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span class="w-12 h-12 bg-eco-100 rounded-lg flex items-center justify-center mr-4">
              <Icon name="heroicons:trophy" class="w-6 h-6 text-eco-600" />
            </span>
            我们的优势
          </h2>
          
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-eco-500">
              <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="heroicons:handshake" class="w-6 h-6 text-eco-600 mr-3" />
                国有企业缔结深度战略同盟
              </h3>
              <p class="text-gray-700 text-lg mb-4">重磅投资合约落笔定音，3年/1000台/60亿</p>
              <p class="text-gray-600">与国有企业建立深度战略合作关系，签订重磅投资合约，为公司的长期发展提供坚实保障。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
              <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="heroicons:cube-transparent" class="w-6 h-6 text-primary-600 mr-3" />
                产品供应体系超级生态矩阵
              </h3>
              <p class="text-gray-700 text-lg mb-4">千需万求皆能精准适配，领先制造商/设备定制特供/战略合作</p>
              <p class="text-gray-600">构建全方位产品供应生态矩阵，无论客户需求多么多样，都能精准匹配最佳解决方案，与领先制造商深度合作，提供设备定制特供服务。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-eco-500">
              <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="heroicons:shield-check" class="w-6 h-6 text-eco-600 mr-3" />
                专业团队7×24小时无死角值守
              </h3>
              <p class="text-gray-700 text-lg mb-4">全天候硬核护航，技术团队+总部服务团队+24小时待命</p>
              <p class="text-gray-600">组建专业技术团队与服务团队，实现7×24小时全天候无死角服务保障，确保客户在任何时间都能获得及时、专业的支持。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 行动号召 -->
    <section class="py-16 bg-gradient-to-r from-eco-600 to-primary-700 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">加入我们的清洁能源事业</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          与淼泽松源携手，共同推动新能源技术的发展与应用
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/contact"
            class="px-8 py-3 bg-white text-eco-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            联系我们
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-eco-600 transition-colors duration-200"
          >
            查看产品
          </NuxtLink>
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