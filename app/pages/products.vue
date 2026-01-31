<template>
  <div>
    <!-- 页面头部 -->
    <PageTitle slug="products" />

    <!-- 页面内容容器 -->
    <div class="relative z-10">
      <!-- 产品分类切换组件 -->
      <NewsCategoryTabs
        v-model="currentCategory"
        slug="products"
        @change="onCategoryChange"
      />

      <!-- 产品列表 -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <!-- 加载状态 -->
          <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div class="aspect-video bg-gray-200"></div>
              <div class="p-6 space-y-4">
                <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                <div class="flex gap-2 pt-2">
                  <div class="h-10 bg-gray-200 rounded flex-1"></div>
                  <div class="h-10 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 产品卡片列表 -->
          <div v-else-if="productList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="product in productList" :key="product.id"
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <!-- 产品图片 -->
              <div class="aspect-video overflow-hidden">
                <img :src="product.image" :alt="product.name"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onerror="this.src='https://picsum.photos/seed/products/800/500.jpg'" />
              </div>

              <!-- 产品信息 -->
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-eco-600 bg-eco-50 px-2 py-1 rounded">
                    {{ product.category }}
                  </span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ product.name }}</h3>
                <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>

                <!-- 产品规格 -->
                <div v-if="product.specifications && Object.keys(product.specifications).length > 0" class="mb-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-2">主要规格</h4>
                  <dl class="grid grid-cols-2 gap-2 text-sm">
                    <div v-for="(value, key) in product.specifications" :key="key" class="flex">
                      <dt class="text-gray-500 mr-2">{{ key }}:</dt>
                      <dd class="text-gray-900">{{ value }}</dd>
                    </div>
                  </dl>
                </div>

                <!-- 操作按钮 -->
                <div class="flex gap-2">
                  <NuxtLink :to="`/productDetail/${product.id}`"
                    class="flex-1 px-4 py-2 bg-eco-600 text-white font-medium rounded-lg hover:bg-eco-700 transition-colors duration-200 text-center">
                    查看详情
                  </NuxtLink>
                  <button @click="inquireProduct(product)"
                    class="flex-1 px-4 py-2 border border-eco-600 text-eco-600 font-medium rounded-lg hover:bg-eco-50 transition-colors duration-200">
                    产品咨询
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 无结果提示 -->
          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="heroicons:cube" class="w-12 h-12 text-gray-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">暂无产品</h3>
            <p class="text-gray-500">该分类下暂时没有产品内容</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { getArticleListByCategorySlug } from '~/api/article';

// 设置页面元数据
useHead({
  title: '产品列表 - 淼泽松源（上海）科技发展有限公司',
  meta: [
    { name: 'description', content: '淼泽松源提供全面的新能源产品和解决方案，包括甲醇能源、风能、能源储存和设备租赁等多种产品。' }
  ]
});

// 当前选中的分类信息
const currentCategory = ref('');
const currentCategorySlug = ref('products'); // 默认使用 'products'

// 分类切换处理
const onCategoryChange = (category) => {
  console.log('切换到分类:', category);
  // 更新当前分类的 slug
  currentCategorySlug.value = category.slug || 'products';
  // 重新获取产品数据
  refreshProducts();
};

// 使用API获取产品列表
const { data: articleData, pending, refresh: refreshProducts } = await useAsyncData(
  'products-list',
  async () => {
    try {
      const params = {
        category_slug: currentCategorySlug.value,
        recursive: true,
        page: 1,
        limit: 999
      };
      console.log('获取产品列表参数:', params);
      const response = await getArticleListByCategorySlug(params);
      console.log('产品列表数据:', response);
      return response || { rows: [], total: 0, categoryInfo: null };
    } catch (err) {
      console.error('获取产品列表失败:', err);
      return { rows: [], total: 0, categoryInfo: null };
    }
  },
  {
    server: true,
    watch: [currentCategorySlug]
  }
);

// 转换产品数据格式
const productList = computed(() => {
  if (!articleData.value?.rows) return [];

  return articleData.value.rows.map(article => {
    // 处理封面图片
    let coverUrl = article.cover || '';
    if (coverUrl) {
      coverUrl = coverUrl.replace(/`/g, '').trim();
    }

    return {
      id: article._id,
      name: article.title,
      description: article.subtitle || article.summary || '',
      image: coverUrl || 'https://picsum.photos/seed/products/800/500.jpg',
      category: article.category_info?.title || '产品',
      content: article.content || '',
      specifications: article.specifications || {}
    };
  });
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