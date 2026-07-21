<template>
  <section class="relative overflow-hidden bg-gray-50 py-32 md:py-40">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center py-20">
        <div class="h-12 w-12 animate-spin rounded-full border-2 border-eco-300 border-t-eco-800"></div>
      </div>

      <!-- 标题区域 -->
      <div v-else class="reveal mb-20 max-w-3xl">
        <h2 class="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          {{ categoryData?.title || '产品展示' }}
        </h2>
        <p class="mt-5 text-lg font-light leading-relaxed text-gray-600 md:text-xl">
          {{ categoryData?.subtitle || '我们提供全方位的新能源产品，满足不同场景的应用需求' }}
        </p>
      </div>

      <div v-if="!pending" class="reveal reveal-delay-1 relative mx-auto max-w-6xl">
        <!-- 轮播容器：Double-Bezel -->
        <div class="overflow-hidden bezel" v-cloak>
          <div class="bezel-inner overflow-hidden">
            <div
              class="flex transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <!-- 轮播项 -->
              <div
                v-for="product in productsData"
                :key="product.id"
                class="grid w-full flex-shrink-0 grid-cols-1 lg:grid-cols-5"
              >
                <!-- 左侧 3/5：产品大图 -->
                <div class="relative h-80 overflow-hidden bg-gray-100 lg:col-span-3 lg:h-[520px]">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="h-full w-full object-cover"
                    onerror="this.src='https://picsum.photos/seed/mzsy-product/800/600.jpg'"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <span
                    class="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-eco-900 shadow-sm backdrop-blur-sm"
                  >
                    <Icon name="heroicons:tag" class="mr-1.5 h-3.5 w-3.5" />
                    {{ product.category }}
                  </span>
                </div>

                <!-- 右侧 2/5：产品介绍 -->
                <div class="flex flex-col justify-center bg-white p-8 lg:col-span-2 lg:p-12">
                  <span class="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-eco-800">
                    {{ product.series || 'MZ系列' }}
                  </span>
                  <h3 class="mb-4 text-2xl font-bold leading-tight text-gray-900 lg:text-3xl">
                    {{ product.name }}
                  </h3>
                  <p class="mb-8 leading-relaxed text-gray-600">{{ product.description }}</p>

                  <!-- 技术规格 -->
                  <dl class="mb-8 space-y-3" v-if="Object.keys(product.specifications).length">
                    <dt class="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">技术规格</dt>
                    <div
                      v-for="(value, key) in product.specifications"
                      :key="key"
                      class="flex items-baseline justify-between gap-4 border-b border-gray-100 pb-2 last:border-0"
                    >
                      <dd class="text-sm text-gray-500">{{ key }}</dd>
                      <dd class="text-right font-mono text-sm font-medium tabular-nums text-gray-900">{{ value }}</dd>
                    </div>
                  </dl>

                  <!-- 产品特点 -->
                  <div v-if="product.features && product.features.length" class="mb-8">
                    <div class="mb-3 flex flex-wrap gap-2">
                      <span
                        v-for="feature in product.features"
                        :key="feature"
                        class="rounded-full bg-eco-50 px-3 py-1 text-xs font-medium text-eco-800"
                      >
                        {{ feature }}
                      </span>
                    </div>
                  </div>

                  <!-- CTA：Button-in-Button -->
                  <NuxtLink
                    :to="`/productDetail/${product.id}`"
                    class="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-eco-800 pl-6 pr-2 py-2.5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(22,101,52,0.2)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-eco-400 focus-visible:ring-offset-2"
                  >
                    <span>了解产品详情</span>
                    <span class="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                      <Icon name="heroicons:arrow-right" class="h-3.5 w-3.5" />
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 轮播控制：圆角胶囊 -->
        <button
          @click="prevSlide"
          class="group absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 hover:bg-white active:scale-95 lg:left-5"
          aria-label="上一个产品"
        >
          <Icon name="heroicons:chevron-left" class="h-5 w-5" />
        </button>

        <button
          @click="nextSlide"
          class="group absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 hover:bg-white active:scale-95 lg:right-5"
          aria-label="下一个产品"
        >
          <Icon name="heroicons:chevron-right" class="h-5 w-5" />
        </button>

        <!-- 轮播指示器 -->
        <div class="mt-8 flex justify-center gap-2">
          <button
            v-for="(_, index) in productsData"
            :key="index"
            @click="currentSlide = index"
            class="h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            :class="
              currentSlide === index
                ? 'w-10 bg-eco-800'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            "
            :aria-label="`切换到第${index + 1}个产品`"
          ></button>
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
import { getArticleListByCategorySlug } from '~/api/article';

/**
 * 根据slug获取栏目信息
 */
const { data: categoryData, pending } = await useAsyncData('category-products', () =>
  getCategoryBySlug('products'), {
  transform: (response) => {
    return response || null;
  }
});

/**
 * 根据栏目slug获取产品列表
 */
const { data: productResponse } = await useAsyncData(
  'products-articles',
  () =>
    getArticleListByCategorySlug({
      category_slug: 'products',
      recursive: true,
      limit: 10
    }),
  {
    transform: (response) => {
      return response || { rows: [], total: 0 };
    }
  }
);

/**
 * 转换产品数据格式
 */
const productsData = computed(() => {
  if (!productResponse.value?.rows) return [];

  return productResponse.value.rows.map((product) => {
    // 处理cover字段，去除可能存在的反引号和空格
    const coverUrl = product.cover ? product.cover.replace(/`/g, '').trim() : '';

    // 解析 attrList 为技术规格对象
    let specifications = {};
    if (product.attrList && Array.isArray(product.attrList)) {
      specifications = product.attrList.reduce((acc, item) => {
        if (item.attrName && item.attrValue) {
          acc[item.attrName] = item.attrValue;
        }
        return acc;
      }, {});
    }

    // 解析 keywords 为产品特点数组
    let features = [];
    if (product.keywords) {
      if (typeof product.keywords === 'string') {
        features = product.keywords
          .split(/[,;|，；|]/)
          .map((k) => k.trim())
          .filter((k) => k);
      } else if (Array.isArray(product.keywords)) {
        features = product.keywords;
      }
    }

    return {
      id: product._id,
      name: product.title,
      description: product.summary || product.subtitle || '',
      image: coverUrl || 'https://picsum.photos/seed/mzsy-product/800/600.jpg',
      category: product.category_info?.title || '产品系列',
      series: product.series || 'MZ系列',
      subtitle: product.subtitle,
      specifications: specifications,
      features: features
    };
  });
});

// 轮播控制
const currentSlide = ref(0);

/**
 * 切换到下一个产品
 */
const nextSlide = () => {
  if (!productsData.value.length) return;
  currentSlide.value = (currentSlide.value + 1) % productsData.value.length;
};

/**
 * 切换到上一个产品
 */
const prevSlide = () => {
  if (!productsData.value.length) return;
  currentSlide.value =
    currentSlide.value === 0 ? productsData.value.length - 1 : currentSlide.value - 1;
};

// 自动轮播
let slideInterval = null;

/**
 * 组件挂载后启动自动轮播
 */
onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000);
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
