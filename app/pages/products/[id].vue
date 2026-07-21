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
    <section v-else-if="product" class="py-32 md:py-40 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="sr-only">产品详细信息</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- 产品图片：Double-Bezel -->
          <div class="reveal space-y-4">
            <div class="bezel">
              <div class="bezel-inner aspect-square bg-gray-100 overflow-hidden">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                  onerror="this.src='https://picsum.photos/seed/mzsy-product-detail/800/800.jpg'"
                />
              </div>
            </div>
            <div class="grid grid-cols-4 gap-2">
              <div
                v-for="i in 4"
                :key="i"
                class="aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-eco-500 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
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

          <!-- 产品信息：Double-Bezel -->
          <div class="reveal reveal-delay-1 space-y-6">
            <div class="bezel">
              <div class="bezel-inner p-6">
                <div class="flex items-center gap-3 mb-4">
                  <span class="px-3 py-1 bg-eco-50 text-eco-800 rounded-full text-sm font-medium">
                    {{ product.category }}
                  </span>
                </div>

                <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-4">{{ product.name }}</h1>
                <p class="text-lg text-gray-600 font-light leading-relaxed">{{ product.description }}</p>
              </div>
            </div>

            <!-- 产品规格 -->
            <div class="bezel">
              <div class="bezel-inner p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">产品规格</h2>
                <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    v-for="(value, key) in product.specifications"
                    :key="key"
                    class="flex justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <dt class="text-gray-500">{{ key }}</dt>
                    <dd class="font-medium text-gray-900">{{ value }}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <!-- 应用场景 -->
            <div class="bezel">
              <div class="bezel-inner p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">应用场景</h2>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="scene in applicationScenes"
                    :key="scene"
                    class="px-3 py-2 bg-eco-50 text-eco-800 rounded-full text-sm"
                  >
                    {{ scene }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 联系咨询：Button-in-Button -->
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink
                to="/contact"
                class="group inline-flex items-center gap-3 rounded-full bg-eco-800 pl-6 pr-2 py-3 text-base font-semibold text-white shadow-[0_8px_32px_rgba(22,101,52,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-eco-400"
              >
                <span>咨询产品</span>
                <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <Icon name="heroicons:arrow-right" class="h-4 w-4" />
                </span>
              </NuxtLink>
              <button
                @click="downloadSpec"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-900 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-eco-300 hover:bg-eco-50 active:scale-[0.98]"
              >
                下载规格书
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 相关产品推荐：Double-Bezel -->
    <section v-if="relatedProducts && relatedProducts.length > 0" class="py-32 md:py-40 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="reveal mb-12 max-w-3xl">
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">相关产品推荐</h2>
          <p class="text-lg text-gray-600 font-light leading-relaxed">
            您可能还感兴趣的其他产品
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(relatedProduct, index) in relatedProducts"
            :key="relatedProduct.id"
            class="reveal bezel group"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="bezel-inner overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
              <div class="aspect-video bg-gray-100">
                <img
                  :src="relatedProduct.image"
                  :alt="relatedProduct.name"
                  class="w-full h-full object-cover"
                  onerror="this.src='https://picsum.photos/seed/mzsy-related-product/400/300.jpg'"
                />
              </div>
              <div class="p-6">
                <span class="text-sm text-eco-800 font-medium bg-eco-50 px-3 py-1 rounded-full">{{ relatedProduct.category }}</span>
                <h3 class="text-lg font-bold text-gray-900 mt-3 mb-2">{{ relatedProduct.name }}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2 font-light">{{ relatedProduct.description }}</p>
                <NuxtLink
                  :to="`/productDetail/${relatedProduct.id}`"
                  class="group/link inline-flex items-center gap-2 text-eco-800 font-semibold text-sm transition-colors duration-300 hover:text-eco-900"
                >
                  查看详情
                  <Icon name="heroicons:arrow-right" class="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品不存在提示 -->
    <section v-else-if="productsData.value && productsData.value.length > 0" class="py-32 md:py-40 bg-white">
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
          class="group inline-flex items-center gap-3 rounded-full bg-eco-800 pl-6 pr-2 py-3 text-base font-semibold text-white shadow-[0_8px_32px_rgba(22,101,52,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 active:scale-[0.98]"
        >
          <span>返回产品列表</span>
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
            <Icon name="heroicons:arrow-right" class="h-4 w-4" />
          </span>
        </NuxtLink>
      </div>
    </section>

    <!-- 数据加载错误 -->
    <section v-else class="py-32 md:py-40 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Icon name="heroicons:exclamation-circle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-4">数据加载错误</h2>
        <p class="text-lg text-gray-600 mb-8">抱歉，产品数据加载失败，请稍后再试。</p>
        <NuxtLink
          to="/products"
          class="group inline-flex items-center gap-3 rounded-full bg-eco-800 pl-6 pr-2 py-3 text-base font-semibold text-white shadow-[0_8px_32px_rgba(22,101,52,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 active:scale-[0.98]"
        >
          <span>返回产品列表</span>
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
            <Icon name="heroicons:arrow-right" class="h-4 w-4" />
          </span>
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

// 滚动入场动效
useReveal();

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