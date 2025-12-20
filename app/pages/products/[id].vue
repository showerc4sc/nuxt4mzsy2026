<template>
  <div>
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
                  class="group relative flex-1 px-6 py-4 bg-gradient-to-r from-eco-600 to-eco-500 text-white font-semibold rounded-xl hover:from-eco-700 hover:to-eco-600 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center font-display"
                >
                  <span class="relative z-10">咨询产品</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </NuxtLink>
                <button
                  @click="downloadSpec"
                  class="group relative flex-1 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-eco-500 hover:text-eco-600 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-display"
                >
                  <span class="relative z-10">下载规格书</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-eco-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
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
                class="group relative inline-flex items-center px-4 py-2 text-eco-600 font-semibold hover:text-white rounded-lg transition-all duration-300 font-display"
              >
                <span class="relative z-10 flex items-center">
                  查看详情
                  <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-eco-600 to-eco-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          class="group relative px-8 py-4 bg-gradient-to-r from-eco-600 to-eco-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden font-display"
        >
          <span class="relative z-10">返回产品列表</span>
          <div class="absolute inset-0 bg-gradient-to-r from-eco-700 to-eco-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          class="group relative px-8 py-4 bg-gradient-to-r from-eco-600 to-eco-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden font-display"
        >
          <span class="relative z-10">返回产品列表</span>
          <div class="absolute inset-0 bg-gradient-to-r from-eco-700 to-eco-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NuxtLink>
      </div>
    </section>
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

// 下载规格书
const downloadSpec = () => {
  // 这里可以实现实际的下载功能
  alert('规格书下载功能将在后续版本中提供');
};

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