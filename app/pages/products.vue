<template>
  <div class="products-page">
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
      <section class="bg-[#f7faf8] py-16 sm:py-20 lg:py-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <!-- 加载状态 -->
          <div v-if="pending" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" aria-label="正在加载产品" aria-busy="true">
            <article v-for="i in 6" :key="i" class="product-card overflow-hidden">
              <div class="aspect-[4/3] animate-pulse bg-[#e7eeea]"></div>
              <div class="space-y-5 p-6 sm:p-7">
                <div class="h-3 w-20 animate-pulse rounded-sm bg-[#e7eeea]"></div>
                <div class="space-y-3">
                  <div class="h-7 w-4/5 animate-pulse rounded-sm bg-[#e7eeea]"></div>
                  <div class="h-4 w-full animate-pulse rounded-sm bg-[#edf2ef]"></div>
                  <div class="h-4 w-2/3 animate-pulse rounded-sm bg-[#edf2ef]"></div>
                </div>
                <div class="grid grid-cols-2 gap-x-5 gap-y-4 border-y border-[#e4ebe7] py-5">
                  <div v-for="n in 4" :key="n" class="space-y-2">
                    <div class="h-3 w-12 animate-pulse rounded-sm bg-[#edf2ef]"></div>
                    <div class="h-4 w-20 animate-pulse rounded-sm bg-[#e7eeea]"></div>
                  </div>
                </div>
                <div class="flex gap-3 pt-1">
                  <div class="h-11 flex-1 animate-pulse rounded-lg bg-[#e7eeea]"></div>
                  <div class="h-11 flex-1 animate-pulse rounded-lg bg-[#edf2ef]"></div>
                </div>
              </div>
            </article>
          </div>

          <!-- 产品卡片列表 -->
          <div v-else-if="productList.length > 0" class="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <article
              v-for="(product, index) in productList"
              :key="product.id"
              class="reveal product-card group flex h-full flex-col overflow-hidden"
              :class="`reveal-delay-${Math.min(index + 1, 5)}`"
            >
              <!-- 产品图片 -->
              <div class="product-image-wrap relative aspect-[4/3] shrink-0 overflow-hidden bg-[#edf3ef]">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                  onerror="this.src='https://picsum.photos/seed/products/800/500.jpg'"
                />
                <span class="absolute left-5 top-5 rounded-md border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-medium tracking-wide text-[#285f4e] shadow-sm">
                  {{ product.category }}
                </span>
              </div>

              <!-- 产品信息 -->
              <div class="flex flex-1 flex-col p-6 sm:p-7">
                <h3 class="min-h-[3.5rem] text-xl font-semibold leading-7 tracking-[-0.02em] text-[#102b25] sm:text-[1.375rem]">
                  {{ product.name }}
                </h3>
                <p class="mt-3 min-h-[3.25rem] text-sm leading-[1.85] text-[#65766f] line-clamp-2">
                  {{ product.description }}
                </p>

                <!-- 产品规格 -->
                <div class="mt-6 flex-1 border-y border-[#e3ebe6] py-5">
                  <template v-if="product.specifications && Object.keys(product.specifications).length > 0">
                    <h4 class="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-[#72837b]">
                      <Icon name="heroicons:adjustments-horizontal" class="h-4 w-4 text-[#159a76]" />
                      主要规格
                    </h4>
                    <dl class="grid grid-cols-2 gap-x-5 gap-y-4">
                      <div v-for="(value, key) in product.specifications" :key="key" class="min-w-0">
                        <dt class="mb-1 truncate text-xs leading-5 text-[#829089]" :title="key">{{ key }}</dt>
                        <dd class="break-words text-sm font-semibold leading-6 text-[#263f36]" :title="String(value)">{{ value }}</dd>
                      </div>
                    </dl>
                  </template>
                </div>

                <!-- 操作按钮 -->
                <div class="mt-6 grid grid-cols-2 gap-3">
                  <NuxtLink
                    :to="`/productDetail/${product.id}`"
                    class="group/link inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#102b25] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#159a76] active:translate-y-px"
                  >
                    查看详情
                    <Icon name="heroicons:arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </NuxtLink>
                  <button
                    type="button"
                    @click="inquireProduct(product)"
                    class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#d6e1da] bg-white px-4 py-2.5 text-sm font-semibold text-[#29483d] transition-colors duration-300 hover:border-[#8db9a6] hover:bg-[#f0f7f3] active:translate-y-px"
                  >
                    产品咨询
                  </button>
                </div>
              </div>
            </article>
          </div>

          <!-- 无结果提示 -->
          <div v-else class="state-panel px-6 py-16 text-center sm:py-20">
            <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf3ee] text-[#568372]">
              <Icon name="heroicons:cube" class="h-8 w-8" />
            </div>
            <h3 class="text-xl font-semibold tracking-tight text-[#102b25]">暂无产品</h3>
            <p class="mt-3 text-sm leading-7 text-[#718179]">该分类下暂时没有产品内容，您可以浏览其他产品分类。</p>
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

<style scoped>
.product-card {
  border: 1px solid #dfe8e2;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 16px 40px -32px rgb(16 43 37 / 0.35);
  transition: border-color 300ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.product-card:hover {
  border-color: #b6cec1;
  box-shadow: 0 24px 50px -34px rgb(16 43 37 / 0.38);
  transform: translateY(-4px);
}

.product-image-wrap::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  box-shadow: inset 0 -30px 45px -40px rgb(16 43 37 / 0.45);
}

.state-panel {
  border: 1px solid #dfe8e2;
  border-radius: 1rem;
  background: #fff;
}

@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-card img {
    transition: none;
  }

  .product-card:hover,
  .product-card:hover img {
    transform: none;
  }
}
</style>
