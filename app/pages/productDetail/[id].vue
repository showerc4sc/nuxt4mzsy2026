<template>
  <div class="api-product-page min-h-screen bg-[#f8faf9]">
    <!-- 加载状态 -->
    <div v-if="loading" aria-label="正在加载产品详情" aria-busy="true">
      <section class="border-b border-[#e0e8e3] bg-white pb-12 pt-32 sm:pb-16 sm:pt-36">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl animate-pulse">
            <div class="h-4 w-24 rounded-sm bg-[#dfe8e2]"></div>
            <div class="mt-6 h-12 w-2/3 rounded-sm bg-[#dfe8e2]"></div>
            <div class="mt-5 h-5 w-1/2 rounded-sm bg-[#e8eeea]"></div>
          </div>
        </div>
      </section>

      <!-- 产品内容区域骨架屏 -->
      <section class="py-12 sm:py-16 lg:py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
            <div>
              <div class="aspect-square animate-pulse rounded-2xl bg-[#e5ede8]"></div>
              <div class="mt-4 grid grid-cols-4 gap-3">
                <div v-for="i in 4" :key="i" class="aspect-square animate-pulse rounded-lg bg-[#e5ede8]"></div>
              </div>
            </div>
            <div class="space-y-7 pt-2">
              <div class="h-7 w-36 animate-pulse rounded-sm bg-[#dfe8e2]"></div>
              <div v-for="i in 3" :key="i" class="space-y-3 border-b border-[#e1e9e4] pb-6">
                <div class="h-5 w-1/3 animate-pulse rounded-sm bg-[#dfe8e2]"></div>
                <div class="h-4 w-full animate-pulse rounded-sm bg-[#e8eeea]"></div>
                <div class="h-4 w-2/3 animate-pulse rounded-sm bg-[#e8eeea]"></div>
              </div>
              <div class="h-32 animate-pulse rounded-xl bg-[#dfe8e2]"></div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error || !productInfo" class="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div class="state-panel w-full max-w-2xl px-6 py-12 text-center sm:px-12 sm:py-16">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8ece9] text-[#b65e50]">
          <Icon name="heroicons:exclamation-triangle" class="h-8 w-8" />
        </div>
        <h2 class="mt-6 text-2xl font-semibold tracking-tight text-[#102b25]">加载失败</h2>
        <p class="mt-3 text-base leading-7 text-[#718179]">无法加载产品详情，请稍后重试。</p>
        <NuxtLink
          to="/products"
          class="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#102b25] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#159a76] active:translate-y-px"
        >
          <Icon name="heroicons:arrow-left" class="h-4 w-4" />
          返回产品列表
        </NuxtLink>
      </div>
    </div>

    <!-- 正常内容 -->
    <div v-else>
      <!-- 面包屑导航 -->
      <section class="border-b border-[#e1e9e4] bg-white pt-24">
        <div class="container mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol class="flex min-w-0 items-center gap-2 text-sm sm:gap-3">
              <li class="shrink-0">
                <NuxtLink to="/" class="flex items-center gap-1.5 text-[#74847c] transition-colors hover:text-[#159a76]">
                  <Icon name="heroicons:home" class="h-4 w-4" />
                  <span class="hidden sm:inline">首页</span>
                </NuxtLink>
              </li>
              <li class="flex shrink-0 items-center gap-2 sm:gap-3">
                <Icon name="heroicons:chevron-right" class="h-3.5 w-3.5 text-[#a8b5ae]" />
                <NuxtLink to="/products" class="text-[#74847c] transition-colors hover:text-[#159a76]">产品列表</NuxtLink>
              </li>
              <li aria-current="page" class="flex min-w-0 items-center gap-2 sm:gap-3">
                <Icon name="heroicons:chevron-right" class="h-3.5 w-3.5 shrink-0 text-[#a8b5ae]" />
                <span class="truncate font-medium text-[#294b3e]">{{ product?.name || '产品详情' }}</span>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <!-- 页面标题 -->
      <section class="border-b border-[#e1e9e4] bg-white py-12 sm:py-16 lg:py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-4xl">
            <div class="flex items-center gap-2 text-sm font-medium tracking-[0.08em] text-[#159a76]">
              <Icon name="heroicons:cube" class="h-4 w-4" />
              <span>{{ product.category }}</span>
            </div>
            <h1 class="mt-5 text-3xl font-semibold leading-[1.2] tracking-[-0.04em] text-[#102b25] sm:text-4xl lg:text-[3.25rem]">
              {{ product.name }}
            </h1>
            <p class="mt-6 max-w-3xl text-base leading-8 text-[#65776e] sm:text-lg sm:leading-9">
              {{ product.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- 页面内容容器 -->
      <div class="relative z-10">
        <!-- 产品详情内容 -->
        <section class="bg-[#f8faf9] py-12 sm:py-16 lg:py-20">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="sr-only">产品详细信息</h2>
            <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
              <!-- 产品图片 -->
              <div class="reveal min-w-0">
                <!-- 主图 -->
                <div class="product-gallery group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-[#dfe8e2] bg-white">
                  <img
                    :src="currentImageUrl"
                    :alt="product.name"
                    class="h-full w-full object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] sm:p-10"
                    onerror="this.src='https://picsum.photos/seed/mzsy-product-detail/800/800.jpg'"
                  />
                  <!-- 图片切换指示器 -->
                  <div v-if="product.images && product.images.length > 1" class="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-lg bg-white/90 p-2 shadow-sm">
                    <button
                      v-for="(img, index) in product.images"
                      :key="index"
                      type="button"
                      :aria-label="`查看第 ${index + 1} 张产品图片`"
                      :aria-pressed="currentImageIndex === index"
                      @click="currentImageIndex = index"
                      class="h-1.5 rounded-sm transition-all duration-300"
                      :class="currentImageIndex === index ? 'w-7 bg-[#159a76]' : 'w-4 bg-[#c4d2ca] hover:bg-[#7da893]'"
                    ></button>
                  </div>
                </div>

                <!-- 产品图片缩略图 -->
                <div v-if="product.images && product.images.length > 0" class="mt-4 grid grid-cols-4 gap-3" aria-label="产品图片选择">
                  <button
                    v-for="(img, index) in product.images"
                    :key="index"
                    type="button"
                    class="aspect-square overflow-hidden rounded-lg border bg-white p-1 transition-all duration-300"
                    :class="currentImageIndex === index ? 'border-[#159a76]' : 'border-[#dfe8e2] hover:border-[#8fb6a4]'"
                    :aria-label="`查看产品图片 ${index + 1}`"
                    :aria-pressed="currentImageIndex === index"
                    @click="currentImageIndex = index"
                  >
                    <img
                      :src="img"
                      :alt="`${product.name} ${index + 1}`"
                      class="h-full w-full rounded-md object-cover"
                      onerror="this.src='https://picsum.photos/seed/mzsy-product-thumb/200/200.jpg'"
                    />
                  </button>
                </div>
              </div>

              <!-- 产品信息 -->
              <div class="reveal reveal-delay-1 min-w-0">
                <!-- 产品特点 -->
                <div v-if="product.attrList && product.attrList.length > 0">
                  <div class="mb-2 flex items-center gap-3">
                    <Icon name="heroicons:sparkles" class="h-5 w-5 text-[#159a76]" />
                    <h2 class="text-xl font-semibold tracking-tight text-[#183d31]">产品特点</h2>
                  </div>
                  <div>
                    <div
                      v-for="(attr, index) in product.attrList"
                      :key="attr._index"
                      class="flex items-start gap-4 border-b border-[#dfe8e2] py-6 first:pt-5"
                    >
                      <span class="mt-0.5 shrink-0 font-mono text-sm font-medium tabular-nums text-[#159a76]">{{ String(index + 1).padStart(2, '0') }}</span>
                      <div class="min-w-0 flex-1">
                        <h3 class="text-base font-semibold leading-7 text-[#203e33]">{{ attr.attrName }}</h3>
                        <p class="mt-1.5 text-sm leading-7 text-[#6c7e75]">{{ attr.attrValue }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 应用场景 -->
                <div v-if="product.keywords && product.keywords.length > 0" class="mt-8">
                  <div class="mb-4 flex items-center gap-3">
                    <Icon name="heroicons:map-pin" class="h-5 w-5 text-[#159a76]" />
                    <h2 class="text-xl font-semibold tracking-tight text-[#183d31]">应用场景</h2>
                  </div>
                  <div class="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
                    <span v-for="keyword in product.keywords" :key="keyword" class="inline-flex items-center gap-2 text-sm leading-6 text-[#49665a]">
                      <Icon name="heroicons:check" class="h-4 w-4 shrink-0 text-[#159a76]" />
                      {{ keyword }}
                    </span>
                  </div>
                </div>

                <!-- 联系咨询 -->
                <div class="mt-9 rounded-xl bg-[#102b25] p-6 sm:p-7">
                  <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-white">需要了解更多？</h3>
                      <p class="mt-2 text-sm leading-6 text-white/65">我们的专业团队随时为您服务</p>
                    </div>
                    <NuxtLink
                      to="/contact"
                      class="group inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#123c30] transition-colors duration-300 hover:bg-[#dff2e9] active:translate-y-px"
                    >
                      <Icon name="heroicons:chat-bubble-left-right" class="h-4 w-4" />
                      <span>咨询产品</span>
                      <Icon name="heroicons:arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 产品参数 -->
        <section v-if="product.content" class="border-t border-[#e1e9e4] bg-white py-16 sm:py-20 lg:py-24">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:gap-14">
              <div class="reveal">
                <p class="mb-3 text-xs font-semibold tracking-[0.16em] text-[#159a76]">技术信息</p>
                <h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#102b25] sm:text-4xl">产品参数</h2>
                <p class="mt-4 max-w-xs text-sm leading-7 text-[#73837b]">详细的技术参数和性能指标，助您全面了解产品。</p>
              </div>

              <div class="reveal reveal-delay-1 min-w-0 rounded-xl border border-[#dfe8e2] bg-[#fbfcfb] p-5 sm:p-8 lg:p-10">
                <div class="product-content max-w-none" v-html="product.content"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getArticleById } from '~/api/article';

// 滚动入场动效
useReveal();

/**
 * 产品详情页面
 * 展示产品的详细信息、规格参数、应用场景
 */

// 获取路由参数
const route = useRoute();
const productId = route.params.id;

// 使用API获取产品详情
const { data: productInfo, pending: loading, error } = await useAsyncData(
  `product-detail-${productId}`,
  async () => {
    try {
      console.log('获取产品详情, ID:', productId);
      const response = await getArticleById(productId);
      console.log('产品详情数据:', response);
      return response || null;
    } catch (err) {
      console.error('获取产品详情失败:', err);
      return null;
    }
  },
  {
    server: true
  }
);

// 转换产品数据格式
const product = computed(() => {
  if (!productInfo.value) {
    return null;
  }

  // 处理封面图片
  let coverUrl = productInfo.value.cover || '';
  if (coverUrl) {
    coverUrl = coverUrl.replace(/`/g, '').trim();
  }

  // 处理图片数组
  const images = (productInfo.value.images || []).map(img => {
    return typeof img === 'string' ? img.replace(/`/g, '').trim() : img;
  });

  return {
    id: productInfo.value._id,
    name: productInfo.value.title,
    description: productInfo.value.subtitle || productInfo.value.summary || '',
    image: coverUrl || 'https://picsum.photos/seed/mzsy-product-detail/800/800.jpg',
    images: images,
    category: productInfo.value.category_name || '产品',
    content: productInfo.value.content || '',
    attrList: productInfo.value.attrList || [],
    keywords: productInfo.value.keywords || []
  };
});

// 当前图片索引
const currentImageIndex = ref(0);

// 当前显示的图片URL
const currentImageUrl = computed(() => {
  if (!product.value) return '';
  // 优先使用 images 数组，如果没有则使用 cover 图片
  if (product.value.images && product.value.images.length > 0) {
    return product.value.images[currentImageIndex.value] || product.value.image;
  }
  return product.value.image;
});

// 设置页面元数据
useHead({
  title: () => `${product.value?.name || '产品详情'} - 淼泽松源（上海）科技发展有限公司`,
  meta: [
    { name: 'description', content: () => product.value?.description || '淼泽松源产品详情' }
  ]
});
</script>

<style scoped>
.product-gallery {
  background-image: radial-gradient(circle at 50% 42%, #ffffff 20%, #f0f5f2 100%);
}

.state-panel {
  border: 1px solid #dfe8e2;
  border-radius: 1rem;
  background: #fff;
}

/* 产品参数正文：适配接口返回的不同 HTML 结构 */
.product-content {
  color: #536a5f;
  font-size: 1rem;
  line-height: 1.9;
  overflow-wrap: anywhere;
}

.product-content :deep(h1),
.product-content :deep(h2),
.product-content :deep(h3),
.product-content :deep(h4) {
  color: #183d31;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.4;
  text-wrap: balance;
}

.product-content :deep(h1),
.product-content :deep(h2) {
  padding-bottom: 0.85rem;
  margin: 2.5rem 0 1.25rem;
  border-bottom: 1px solid #dfe8e2;
  font-size: clamp(1.375rem, 2.5vw, 1.75rem);
}

.product-content :deep(h3) {
  margin: 2rem 0 0.85rem;
  font-size: clamp(1.125rem, 2vw, 1.375rem);
}

.product-content :deep(h4) {
  margin: 1.75rem 0 0.75rem;
  font-size: 1.0625rem;
}

.product-content :deep(> :first-child) {
  margin-top: 0;
}

.product-content :deep(p) {
  margin: 0 0 1.25rem;
}

.product-content :deep(strong) {
  color: #294b3e;
  font-weight: 600;
}

.product-content :deep(a) {
  color: #117d60;
  text-decoration: underline;
  text-decoration-color: #9ec9b7;
  text-underline-offset: 0.2em;
}

.product-content :deep(ul),
.product-content :deep(ol) {
  margin: 0 0 1.5rem;
  padding-left: 1.35rem;
}

.product-content :deep(ul) {
  list-style: disc;
}

.product-content :deep(ol) {
  list-style: decimal;
}

.product-content :deep(li) {
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;
}

.product-content :deep(li::marker) {
  color: #159a76;
}

.product-content :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 2rem auto;
  border: 1px solid #e1e9e4;
  border-radius: 0.75rem;
  background: #fff;
}

.product-content :deep(figure) {
  margin: 2rem 0;
}

.product-content :deep(figcaption) {
  margin-top: 0.75rem;
  color: #7a8b82;
  font-size: 0.875rem;
  text-align: center;
}

.product-content :deep(blockquote) {
  margin: 1.75rem 0;
  padding: 1.25rem 1.5rem;
  border: 1px solid #d9e7df;
  border-radius: 0.75rem;
  background: #eef5f1;
  color: #49665a;
}

.product-content :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.product-content :deep(table) {
  display: block;
  width: 100%;
  margin: 1.75rem 0;
  border-collapse: collapse;
  overflow-x: auto;
  font-size: 0.875rem;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.product-content :deep(th),
.product-content :deep(td) {
  min-width: 7rem;
  padding: 0.85rem 1rem;
  border: 1px solid #dfe8e2;
  text-align: left;
  vertical-align: top;
}

.product-content :deep(th) {
  background: #eaf3ee;
  color: #294b3e;
  font-weight: 600;
}

.product-content :deep(td) {
  background: #fff;
  font-variant-numeric: tabular-nums;
}

.product-content :deep(hr) {
  margin: 2.5rem 0;
  border: 0;
  border-top: 1px solid #dfe8e2;
}

.product-content :deep(pre) {
  max-width: 100%;
  padding: 1.25rem;
  border-radius: 0.75rem;
  background: #102b25;
  color: #e3f0e9;
  overflow-x: auto;
}

@media (max-width: 639px) {
  .product-content {
    font-size: 0.9375rem;
    line-height: 1.85;
  }

  .product-content :deep(h1),
  .product-content :deep(h2) {
    margin-top: 2rem;
  }

  .product-content :deep(img) {
    margin: 1.5rem auto;
    border-radius: 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-gallery img {
    transition: none;
  }

  .product-gallery:hover img {
    transform: none;
  }
}
</style>
