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
      <section class="py-32 md:py-40 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <!-- 加载状态 -->
          <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="i in 6" :key="i" class="bezel">
              <div class="bezel-inner overflow-hidden">
                <div class="aspect-video bg-gray-200 animate-pulse"></div>
                <div class="p-6 space-y-4">
                  <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                  <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div class="flex gap-2 pt-2">
                    <div class="h-10 bg-gray-200 rounded-full flex-1"></div>
                    <div class="h-10 bg-gray-200 rounded-full flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 产品卡片列表：Double-Bezel -->
          <div v-else-if="productList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(product, index) in productList" :key="product.id"
              class="reveal bezel group"
              :class="`reveal-delay-${Math.min(index + 1, 5)}`"
            >
              <div class="bezel-inner overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                <!-- 产品图片 -->
                <div class="aspect-video overflow-hidden">
                  <img :src="product.image" :alt="product.name"
                    class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    onerror="this.src='https://picsum.photos/seed/products/800/500.jpg'" />
                </div>

                <!-- 产品信息 -->
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-eco-800 bg-eco-50 px-3 py-1 rounded-full">
                      {{ product.category }}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">{{ product.name }}</h3>
                  <p class="text-gray-600 mb-4 line-clamp-2 font-light leading-relaxed">{{ product.description }}</p>

                  <!-- 产品规格 -->
                  <div v-if="product.specifications && Object.keys(product.specifications).length > 0" class="mb-4">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">主要规格</h4>
                    <dl class="grid grid-cols-2 gap-2 text-sm">
                      <div v-for="(value, key) in product.specifications" :key="key" class="flex">
                        <dt class="text-gray-500 mr-2">{{ key }}:</dt>
                        <dd class="text-gray-900 font-medium">{{ value }}</dd>
                      </div>
                    </dl>
                  </div>

                  <!-- 操作按钮 -->
                  <div class="flex gap-2">
                    <NuxtLink :to="`/productDetail/${product.id}`"
                      class="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-eco-800 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 active:scale-[0.98]">
                      查看详情
                      <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                    </NuxtLink>
                    <button @click="inquireProduct(product)"
                      class="flex-1 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-eco-300 hover:bg-eco-50 active:scale-[0.98]">
                      产品咨询
                    </button>
                  </div>
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

// 滚动入场动效
useReveal();

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