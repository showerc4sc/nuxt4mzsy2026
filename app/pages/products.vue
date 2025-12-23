<template>
  <div>
    <!-- 页面头部 -->
    <section class="relative pt-40 pb-24 text-white overflow-hidden" style="background-image: url('https://picsum.photos/seed/mzsy-products/1920/1080.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
      <!-- 深色遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-br from-eco-900/85 to-primary-900/80"></div>
      <!-- 装饰性光晕 -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">产品列表</h1>
        <p class="text-xl max-w-3xl">
          我们提供全面的新能源产品和解决方案，满足不同行业和场景的能源需求
        </p>
      </div>
    </section>

    <!-- 页面内容容器 -->
    <div class="relative z-10">

    <!-- 分类筛选 -->
    <section class="py-8 bg-gray-50 sticky top-16 z-40 shadow-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-4 py-2 rounded-full font-semibold transition-all duration-300 font-display',
              selectedCategory === category
                ? 'bg-gradient-to-r from-eco-600 to-eco-500 text-white shadow-md transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- 产品列表 -->
    <section class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <!-- 产品图片 -->
            <div class="aspect-video bg-gradient-to-br from-eco-100 to-primary-100 flex items-center justify-center">
              <Icon name="heroicons:cube" class="w-16 h-16 text-eco-600" />
            </div>
            
            <!-- 产品信息 -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-eco-600 bg-eco-50 px-2 py-1 rounded">
                  {{ product.category }}
                </span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ product.name }}</h3>
              <p class="text-gray-600 mb-4">{{ product.description }}</p>
              
              <!-- 产品规格 -->
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">主要规格</h4>
                <dl class="grid grid-cols-2 gap-2 text-sm">
                  <div
                    v-for="(value, key) in product.specifications"
                    :key="key"
                    class="flex"
                  >
                    <dt class="text-gray-500 mr-2">{{ key }}:</dt>
                    <dd class="text-gray-900">{{ value }}</dd>
                  </div>
                </dl>
              </div>
              
              <!-- 操作按钮 -->
              <div class="flex gap-2">
                <NuxtLink
                  :to="`/productDetail/${product.id}`"
                  class="flex-1 px-4 py-2 bg-eco-600 text-white font-medium rounded-lg hover:bg-eco-700 transition-colors duration-200 text-center"
                >
                  查看详情
                </NuxtLink>
                <button
                  @click="inquireProduct(product)"
                  class="flex-1 px-4 py-2 border border-eco-600 text-eco-600 font-medium rounded-lg hover:bg-eco-50 transition-colors duration-200"
                >
                  产品咨询
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 无结果提示 -->
        <div v-if="filteredProducts.length === 0" class="text-center py-12">
          <Icon name="heroicons:inbox" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-medium text-gray-900 mb-2">暂无相关产品</h3>
          <p class="text-gray-600">请尝试选择其他分类</p>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: '产品列表 - 淼泽松源（上海）科技发展有限公司',
  meta: [
    { name: 'description', content: '淼泽松源提供全面的新能源产品和解决方案，包括甲醇能源、风能、能源储存和设备租赁等多种产品。' }
  ]
});

// 获取产品数据
const { data: productsData } = await useAsyncData('products', async () => {
  const companyJson = await import('~/data/company.json');
  return companyJson.default.products;
});

// 获取所有产品分类
const categories = computed(() => {
  if (!productsData.value) return ['全部'];
  const uniqueCategories = ['全部', ...new Set(productsData.value.map(product => product.category))];
  return uniqueCategories;
});

// 当前选中的分类
const selectedCategory = ref('全部');

// 筛选后的产品
const filteredProducts = computed(() => {
  if (!productsData.value) return [];
  if (selectedCategory.value === '全部') return productsData.value;
  return productsData.value.filter(product => product.category === selectedCategory.value);
});

// 产品咨询
const inquireProduct = (product) => {
  // 跳转到联系页面，并传递产品信息
  navigateTo({
    path: '/contact',
    query: {
      product: product.name,
      category: product.category
    }
  });
};
</script>