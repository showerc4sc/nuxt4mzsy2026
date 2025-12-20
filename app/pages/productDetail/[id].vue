<template>
  <div>
    <!-- 页面标题 -->
     <section class="relative pt-40 pb-24 bg-gradient-to-r from-eco-500 to-primary-600 text-white">
       <div class="container mx-auto px-4 sm:px-6 lg:px-8">
         <h1 class="text-4xl md:text-5xl font-bold mb-6">产品详情</h1>
         <p class="text-xl max-w-3xl">
           了解淼泽松源新能源产品的详细规格与特点
         </p>
       </div>
     </section>

    <!-- 面包屑导航 -->
    <section class="py-6 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="text-gray-700 hover:text-eco-600">
                首页
              </NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                <NuxtLink to="/products" class="ml-1 text-gray-700 hover:text-eco-600 md:ml-2">
                  产品列表
                </NuxtLink>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                <span class="ml-1 text-gray-500 md:ml-2">{{ product?.name || '产品详情' }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </section>

    <!-- 页面内容容器 -->
    <div class="relative z-10">

    <!-- 加载状态 -->
    <section v-if="!productsData" class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600"></div>
        <p class="mt-4 text-gray-600">正在加载产品信息...</p>
      </div>
    </section>

    <!-- 产品详情内容 -->
    <section v-else-if="product" class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="sr-only">产品详细信息</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- 产品图片 -->
          <div class="space-y-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover"
                onerror="this.src='https://picsum.photos/seed/mzsy-product-detail/800/800.jpg'"
              />
            </div>
            <div class="grid grid-cols-4 gap-2">
              <div 
                v-for="i in 4" 
                :key="i"
                class="aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-eco-500 transition-all"
                @click="currentImageIndex = i - 1"
              >
                <img 
                  :src="product.image" 
                  :alt="`${product.name} ${i}`"
                  class="w-full h-full object-cover"
                  onerror="this.src='https://picsum.photos/seed/mzsy-product-thumb/200/200.jpg'"
                />
              </div>
            </div>
          </div>
          
          <!-- 产品信息 -->
          <div class="space-y-6">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 bg-eco-100 text-eco-700 rounded-full text-sm font-medium">
                  {{ product.category }}
                </span>
                <div class="flex text-yellow-400">
                  <Icon name="heroicons:star" class="w-5 h-5 fill-current" />
                  <Icon name="heroicons:star" class="w-5 h-5 fill-current" />
                  <Icon name="heroicons:star" class="w-5 h-5 fill-current" />
                  <Icon name="heroicons:star" class="w-5 h-5 fill-current" />
                  <Icon name="heroicons:star" class="w-5 h-5 fill-current" />
                </div>
              </div>
              
              <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
              <p class="text-lg text-gray-600 leading-relaxed">{{ product.description }}</p>
            </div>
            
            <!-- 产品规格 -->
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">产品规格</h2>
              <div class="bg-gray-50 rounded-lg p-6">
                <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    v-for="(value, key) in product.specifications"
                    :key="key"
                    class="flex justify-between py-3 border-b border-gray-200 last:border-0"
                  >
                    <dt class="text-gray-500">{{ key }}</dt>
                    <dd class="font-medium text-gray-900">{{ value }}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <!-- 产品说明 -->
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">产品说明</h2>
              <div class="bg-blue-50 rounded-lg p-6">
                <p class="text-gray-700 leading-relaxed">
                  {{ product.productDescription || '本产品采用先进技术制造，具有高效、可靠、环保等特点。经过严格的质量控制，确保在各种环境下都能稳定运行。产品符合国际标准，已通过多项认证，为客户提供可靠的质量保证。' }}
                </p>
              </div>
            </div>
            
            <!-- 产品特点 -->
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">产品特点</h2>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-6 h-6 bg-eco-100 rounded-full flex items-center justify-center mt-0.5">
                    <span class="text-eco-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">高效节能</h3>
                    <p class="text-gray-600 text-sm">采用先进的能源转换技术，大幅提高能源利用效率，降低运行成本。</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-6 h-6 bg-eco-100 rounded-full flex items-center justify-center mt-0.5">
                    <span class="text-eco-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">稳定可靠</h3>
                    <p class="text-gray-600 text-sm">经过严格测试和验证，确保在各种复杂环境下都能稳定运行，使用寿命长。</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-6 h-6 bg-eco-100 rounded-full flex items-center justify-center mt-0.5">
                    <span class="text-eco-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">智能控制</h3>
                    <p class="text-gray-600 text-sm">配备智能控制系统，可实现远程监控和自动化管理，提高操作便利性。</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-6 h-6 bg-eco-100 rounded-full flex items-center justify-center mt-0.5">
                    <span class="text-eco-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">环保安全</h3>
                    <p class="text-gray-600 text-sm">符合国际环保标准，无污染排放，安全可靠，对环境友好。</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 应用场景 -->
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">应用场景</h2>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="scene in applicationScenes"
                  :key="scene"
                  class="px-3 py-2 bg-eco-50 text-eco-700 rounded-md text-sm"
                >
                  {{ scene }}
                </span>
              </div>
            </div>
            
            <!-- 联系咨询 -->
            <div class="border-t border-gray-200 pt-6">
              <div class="flex flex-col sm:flex-row gap-4">
                <NuxtLink
                  to="/contact"
                  class="group relative px-6 py-4 bg-gradient-to-r from-eco-600 to-eco-500 text-white font-semibold rounded-xl hover:from-eco-700 hover:to-eco-600 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center font-display"
                >
                  <span class="relative z-10">咨询产品</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 产品参数 -->
    <section v-if="product" class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">产品参数</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            详细的技术参数和性能指标
          </p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg overflow-hidden p-8">
          <div class="flex justify-center">
            <div class="w-full max-w-3xl">
              <img 
                :src="product.specImage || `https://picsum.photos/seed/${product.id}-specs/1000/600.jpg`" 
                :alt="`${product.name}参数图`"
                class="w-full h-auto rounded-lg shadow-md"
                onerror="this.src='https://picsum.photos/seed/mzsy-product-specs/1000/600.jpg'"
              />
              <p class="text-center text-sm text-gray-500 mt-4">{{ product.name }} 技术参数图</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 相关产品推荐 -->
    <section v-if="relatedProducts && relatedProducts.length > 0" class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">相关产品推荐</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            您可能还感兴趣的其他产品
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div class="aspect-video bg-gray-100">
              <img 
                :src="relatedProduct.image" 
                :alt="relatedProduct.name"
                class="w-full h-full object-cover"
                onerror="this.src='https://picsum.photos/seed/mzsy-related-product/400/300.jpg'"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-eco-600 font-medium">{{ relatedProduct.category }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ relatedProduct.name }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ relatedProduct.description }}</p>
              <NuxtLink
                :to="`/productDetail/${relatedProduct.id}`"
                class="group relative inline-flex items-center px-4 py-2 text-eco-600 font-semibold hover:text-eco-700 transition-all duration-300 font-display"
              >
                <span class="relative z-10">查看详情</span>
                <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-eco-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 产品不存在提示 -->
    <section v-else-if="productsData.value && productsData.value.length > 0" class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-4">产品未找到</h2>
        <p class="text-lg text-gray-600 mb-4">抱歉，您查找的产品不存在或已被移除。</p>
        <p class="text-sm text-gray-500 mb-8">产品ID: {{ productId }} (类型: {{ typeof productId }})</p>
        <div class="mb-8">
          <p class="text-sm text-gray-500 mb-2">可用产品ID列表:</p>
          <div class="flex flex-wrap justify-center gap-2">
            <span
              v-for="p in productsData.value"
              :key="p.id"
              class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              ID: {{ p.id }} ({{ typeof p.id }})
            </span>
          </div>
        </div>
        <NuxtLink
          to="/products"
          class="group relative px-6 py-3 bg-gradient-to-r from-eco-600 to-eco-500 text-white font-semibold rounded-xl hover:from-eco-700 hover:to-eco-600 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-display"
        >
          <span class="relative z-10">返回产品列表</span>
          <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NuxtLink>
      </div>
    </section>
    
    <!-- 数据加载错误 -->
    <section v-else class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Icon name="heroicons:exclamation-circle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-4">数据加载错误</h2>
        <p class="text-lg text-gray-600 mb-8">抱歉，产品数据加载失败，请稍后再试。</p>
        <NuxtLink
          to="/products"
          class="group relative px-6 py-3 bg-gradient-to-r from-eco-600 to-eco-500 text-white font-semibold rounded-xl hover:from-eco-700 hover:to-eco-600 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-display"
        >
          <span class="relative z-10">返回产品列表</span>
          <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NuxtLink>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
/**
 * 产品详情页面
 * 展示产品的详细信息、规格参数、应用场景和相关产品推荐
 */

// 获取路由参数
const route = useRoute();
const productId = route.params.id; // 保持为字符串
console.log('路由参数:', route.params, 'ID:', productId, 'ID类型:', typeof productId);

// 获取产品数据
const { data: productsData } = await useAsyncData('products', async () => {
  const companyJson = await import('~/data/company.json');
  console.log('加载的产品数据:', companyJson.default.products);
  return companyJson.default.products;
});

// 检查是否获取到了产品数据
if (!productsData.value) {
  console.error('未能获取产品数据');
} else {
  console.log('成功获取产品数据，数量:', productsData.value.length);
}

// 获取当前产品
const product = computed(() => {
  if (!productsData.value) return null;
  console.log('产品ID:', productId, '类型:', typeof productId, '产品列表:', productsData.value);
  
  // 尝试多种匹配方式
  let foundProduct = null;
  
  // 1. 直接字符串匹配
  foundProduct = productsData.value.find(p => String(p.id) === String(productId));
  console.log('字符串匹配结果:', foundProduct);
  
  // 2. 如果没找到，尝试数字匹配
  if (!foundProduct) {
    const numId = Number(productId);
    if (!isNaN(numId)) {
      foundProduct = productsData.value.find(p => p.id === numId);
      console.log('数字匹配结果:', foundProduct);
    }
  }
  
  // 3. 如果还是没找到，尝试宽松匹配
  if (!foundProduct) {
    foundProduct = productsData.value.find(p => p.id == productId);
    console.log('宽松匹配结果:', foundProduct);
  }
  
  console.log('最终找到的产品:', foundProduct);
  return foundProduct;
});

// 获取应用场景
const applicationScenes = computed(() => {
  if (!product.value || !product.value.specifications.应用场景) {
    return [];
  }
  return product.value.specifications.应用场景.split('、');
});

// 获取相关产品（排除当前产品）
const relatedProducts = computed(() => {
  if (!productsData.value) return [];
  return productsData.value
    .filter(p => String(p.id) !== String(productId))
    .slice(0, 3); // 最多显示3个相关产品
});

// 当前图片索引
const currentImageIndex = ref(0);

// 设置页面元数据
useHead({
  title: () => `${product.value?.name || '产品详情'} - 淼泽松源（上海）科技发展有限公司`,
  meta: [
    { name: 'description', content: () => product.value?.description || '淼泽松源产品详情' }
  ]
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>