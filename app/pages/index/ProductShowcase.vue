<template>
  <section
    class="product-section py-20 bg-gradient-to-br from-eco-50 to-white relative overflow-hidden animate-background-shift">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-5">
      <div class="parallax-element absolute top-1/4 right-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"
        data-speed="0.25"></div>
      <div class="parallax-element absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
        data-speed="0.15"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600"></div>
      </div>

      <!-- 标题区域 -->
      <div v-else class="text-center mb-16 flex flex-col items-center">
        <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-4">
          {{ categoryData?.title || '我们的产品' }}
        </div>
        <h2 class="block text-3xl md:text-4xl font-bold text-gray-900 mb-4 w-full">
          {{ categoryData?.title || '产品展示' }}
        </h2>
        <p class="block text-lg text-gray-600 max-w-2xl mx-auto w-full">
          {{ categoryData?.subtitle || '我们提供全方位的新能源产品，满足不同场景的应用需求' }}
        </p>
      </div>

      <div class="relative max-w-7xl mx-auto">
        <!-- 轮播容器 -->
        <div class="overflow-hidden rounded-2xl shadow-2xl bg-white">
          <div class="flex transition-transform duration-700 ease-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }" v-cloak>
            <!-- 轮播项 -->
            <div v-for="(product, index) in productsData" :key="product.id"
              class="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-3 bg-white">
              <!-- 左侧2/3：产品大图 -->
              <div class="lg:col-span-2 bg-gray-100 h-96 lg:h-auto relative overflow-hidden group">
                <img :src="product.image" :alt="product.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onerror="this.src='https://picsum.photos/seed/mzsy-product/800/600.jpg'" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                </div>
                <div
                  class="absolute top-6 left-6 bg-eco-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center space-x-2">
                  <Icon name="heroicons:tag" class="w-4 h-4" />
                  <span>{{ product.category }}123</span>
                </div>
                <!-- 图片上的悬浮信息 -->
                <div
                  class="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div class="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                    <p class="text-sm font-medium">{{ product.subtitle || '行业领先技术，卓越性能表现' }}</p>
                  </div>
                </div>
              </div>

              <!-- 右侧1/3：产品介绍 -->
              <div class="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                <div class="mb-2">
                  <span class="text-eco-600 font-medium text-sm uppercase tracking-wider">{{ product.series ||
                    'MZ系列' }}</span>
                </div>
                <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">{{ product.name }}
                </h3>
                <p class="text-gray-600 mb-8 leading-relaxed">{{ product.description }}</p>

                <!-- 产品规格 -->
                <div class="bg-white rounded-xl p-6 shadow-sm mb-8 border border-gray-100">
                  <h4 class="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                    <Icon name="heroicons:clipboard-document-list" class="w-4 h-4 mr-2 text-eco-600" />
                    技术规格
                  </h4>
                  <div class="space-y-3">
                    <div v-for="(value, key) in product.specifications" :key="key"
                      class="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                      <span class="text-gray-500 text-sm">{{ key }}:</span>
                      <span class="font-medium text-gray-900 text-sm bg-eco-50 px-2 py-1 rounded">{{ value
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- 产品特点 -->
                <div class="mb-8">
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Icon name="heroicons:star" class="w-4 h-4 mr-2 text-eco-600" />
                    产品特点
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="feature in product.features || ['高效节能', '稳定可靠', '智能控制']" :key="feature"
                      class="px-3 py-1 bg-eco-100 text-eco-700 rounded-full text-xs font-medium">
                      {{ feature }}
                    </span>
                  </div>
                </div>

                <NuxtLink :to="`/productDetail/${product.id}`"
                  class="group inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-eco-500 to-eco-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden font-display mouse-follow"
                  data-speed="0.05" data-max-distance="20">
                  <span class="relative z-10">了解产品详情</span>
                  <Icon name="heroicons:arrow-right"
                    class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-eco-600 to-eco-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- 轮播控制 -->
        <button @click="prevSlide"
          class="group absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 z-20"
          aria-label="上一个产品">
          <Icon name="heroicons:chevron-left"
            class="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
        </button>

        <button @click="nextSlide"
          class="group absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 z-20"
          aria-label="下一个产品">
          <Icon name="heroicons:chevron-right"
            class="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <!-- 轮播指示器 -->
        <div class="flex justify-center mt-8 space-x-2">
          <button v-for="(_, index) in productsData" :key="index" @click="currentSlide = index"
            class="h-3 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'w-10 bg-gradient-to-r from-eco-500 to-eco-600 shadow-lg' : 'w-3 bg-gray-300 hover:bg-gray-400'"
            :aria-label="`切换到第${index + 1}个产品`"></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 产品展示组件
 * 显示产品轮播和详细信息
 */

// 导入API
import { getCategoryBySlug } from '~/api/category';

/**
 * 根据slug获取栏目信息
 */
const { data: categoryData, pending } = await useAsyncData(
  'category-products',
  () => getCategoryBySlug('products'),
  {
    server: false,
    transform: (response) => {
      console.log('产品栏目数据:', response);
      return response || null;
    }
  }
);

// 直接导入JSON数据
const { data: productsData } = await useAsyncData('products', async () => {
  const companyJson = await import('~/data/company.json');
  return companyJson.default.products;
});

// 轮播控制
const currentSlide = ref(0);

/**
 * 切换到下一个产品
 */
const nextSlide = () => {
  if (!productsData.value) return;
  currentSlide.value = (currentSlide.value + 1) % productsData.value.length;
};

/**
 * 切换到上一个产品
 */
const prevSlide = () => {
  if (!productsData.value) return;
  currentSlide.value = currentSlide.value === 0 ? productsData.value.length - 1 : currentSlide.value - 1;
};

// 自动轮播
let slideInterval = null;

/**
 * 组件挂载后启动自动轮播
 */
onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000); // 每5秒自动切换产品轮播
});

/**
 * 组件卸载时清理定时器
 */
onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});
</script>

<style scoped>
/* 组件特定样式 */
</style>
