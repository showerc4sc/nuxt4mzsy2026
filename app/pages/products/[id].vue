<template>
  <div class="static-product-page min-h-screen bg-[#f8faf9]">
    <!-- 面包屑导航 -->
    <section class="border-b border-[#e1e9e4] bg-white pt-24">
      <div class="container mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol class="flex min-w-0 items-center gap-2 text-sm sm:gap-3">
            <li class="shrink-0">
              <NuxtLink to="/" class="text-[#74847c] transition-colors hover:text-[#159a76]">首页</NuxtLink>
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

    <!-- 加载状态 -->
    <section v-if="!productsData" class="py-12 sm:py-16 lg:py-20" aria-label="正在加载产品信息" aria-busy="true">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
          <div>
            <div class="aspect-square animate-pulse rounded-2xl bg-[#e6ede9]"></div>
            <div class="mt-4 grid grid-cols-4 gap-3">
              <div v-for="i in 4" :key="i" class="aspect-square animate-pulse rounded-lg bg-[#e6ede9]"></div>
            </div>
          </div>
          <div class="space-y-7 pt-2">
            <div class="h-4 w-24 animate-pulse rounded-sm bg-[#dfe8e2]"></div>
            <div class="space-y-4">
              <div class="h-12 w-4/5 animate-pulse rounded-sm bg-[#dfe8e2]"></div>
              <div class="h-5 w-full animate-pulse rounded-sm bg-[#e8eeea]"></div>
              <div class="h-5 w-2/3 animate-pulse rounded-sm bg-[#e8eeea]"></div>
            </div>
            <div class="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-[#e1e9e4] py-7">
              <div v-for="i in 4" :key="i" class="space-y-3">
                <div class="h-3 w-16 animate-pulse rounded-sm bg-[#e8eeea]"></div>
                <div class="h-5 w-24 animate-pulse rounded-sm bg-[#dfe8e2]"></div>
              </div>
            </div>
            <div class="h-12 w-64 animate-pulse rounded-lg bg-[#dfe8e2]"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品详情内容 -->
    <section v-else-if="product" class="py-12 sm:py-16 lg:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="sr-only">产品详细信息</h2>
        <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
          <!-- 产品图片 -->
          <div class="reveal min-w-0">
            <div class="product-gallery flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-[#dfe8e2] bg-white">
              <img
                :src="product.image"
                :alt="product.name"
                class="h-full w-full object-contain p-6 sm:p-10"
                onerror="this.src='https://picsum.photos/seed/mzsy-product-detail/800/800.jpg'"
              />
            </div>
            <div class="mt-4 grid grid-cols-4 gap-3" aria-label="产品图片选择">
              <button
                v-for="i in 4"
                :key="i"
                type="button"
                class="aspect-square overflow-hidden rounded-lg border bg-white p-1 transition-all duration-300"
                :class="currentImageIndex === i - 1 ? 'border-[#159a76]' : 'border-[#dfe8e2] hover:border-[#8fb6a4]'"
                :aria-label="`查看产品图片 ${i}`"
                :aria-pressed="currentImageIndex === i - 1"
                @click="currentImageIndex = i - 1"
              >
                <img
                  :src="product.image"
                  :alt="`${product.name} ${i}`"
                  class="h-full w-full rounded-md object-cover"
                  onerror="this.src='https://picsum.photos/seed/mzsy-product-thumb/200/200.jpg'"
                />
              </button>
            </div>
          </div>

          <!-- 产品信息 -->
          <div class="reveal reveal-delay-1 min-w-0 lg:pt-2">
            <div class="text-sm font-medium tracking-[0.08em] text-[#159a76]">{{ product.category }}</div>
            <h1 class="mt-4 text-3xl font-semibold leading-[1.22] tracking-[-0.035em] text-[#102b25] sm:text-4xl lg:text-[2.75rem]">
              {{ product.name }}
            </h1>
            <p class="mt-5 max-w-xl text-base leading-8 text-[#65776e]">{{ product.description }}</p>

            <!-- 产品规格 -->
            <div class="mt-8 border-y border-[#dfe8e2] py-7">
              <h2 class="mb-5 flex items-center gap-2 text-base font-semibold text-[#183d31]">
                <Icon name="heroicons:adjustments-horizontal" class="h-5 w-5 text-[#159a76]" />
                产品规格
              </h2>
              <dl class="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                <div v-for="(value, key) in product.specifications" :key="key" class="min-w-0">
                  <dt class="text-xs leading-5 text-[#829088]">{{ key }}</dt>
                  <dd class="mt-1 break-words text-sm font-semibold leading-6 text-[#263f36]">{{ value }}</dd>
                </div>
              </dl>
            </div>

            <!-- 应用场景 -->
            <div v-if="applicationScenes.length > 0" class="mt-7">
              <h2 class="mb-4 text-base font-semibold text-[#183d31]">应用场景</h2>
              <div class="flex flex-wrap gap-x-5 gap-y-3">
                <span v-for="scene in applicationScenes" :key="scene" class="inline-flex items-center gap-2 text-sm text-[#49665a]">
                  <Icon name="heroicons:check" class="h-4 w-4 text-[#159a76]" />
                  {{ scene }}
                </span>
              </div>
            </div>

            <!-- 联系咨询 -->
            <div class="mt-9 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="/contact"
                class="group inline-flex min-h-12 items-center justify-center gap-5 rounded-lg bg-[#102b25] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#159a76] active:translate-y-px sm:justify-between"
              >
                <span>咨询产品</span>
                <Icon name="heroicons:arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </NuxtLink>
              <button
                type="button"
                @click="downloadSpec"
                class="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d5e1da] bg-white px-6 py-3 text-sm font-semibold text-[#294b3e] transition-colors duration-300 hover:border-[#8fb6a4] hover:bg-[#eff6f2] active:translate-y-px"
              >
                <Icon name="heroicons:arrow-down-tray" class="h-4 w-4" />
                下载规格书
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 相关产品推荐 -->
    <section v-if="product && relatedProducts && relatedProducts.length > 0" class="border-t border-[#e1e9e4] bg-white py-16 sm:py-20 lg:py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="reveal mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="mb-3 text-xs font-semibold tracking-[0.16em] text-[#159a76]">更多产品</p>
            <h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#102b25] sm:text-4xl">相关产品推荐</h2>
          </div>
          <p class="text-sm leading-7 text-[#73837b]">您可能还感兴趣的其他产品</p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <article
            v-for="(relatedProduct, index) in relatedProducts"
            :key="relatedProduct.id"
            class="reveal related-card group flex h-full flex-col overflow-hidden"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="aspect-[4/3] overflow-hidden bg-[#edf3ef]">
              <img
                :src="relatedProduct.image"
                :alt="relatedProduct.name"
                class="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                onerror="this.src='https://picsum.photos/seed/mzsy-related-product/400/300.jpg'"
              />
            </div>
            <div class="flex flex-1 flex-col p-6">
              <span class="text-xs font-medium tracking-wide text-[#159a76]">{{ relatedProduct.category }}</span>
              <h3 class="mt-3 text-lg font-semibold leading-7 text-[#18372e]">{{ relatedProduct.name }}</h3>
              <p class="mt-2 flex-1 text-sm leading-7 text-[#718179] line-clamp-2">{{ relatedProduct.description }}</p>
              <NuxtLink
                :to="`/productDetail/${relatedProduct.id}`"
                class="mt-6 inline-flex items-center gap-2 self-start border-t border-[#dfe8e2] pt-4 text-sm font-semibold text-[#176f5a] transition-colors hover:text-[#159a76]"
              >
                查看详情
                <Icon name="heroicons:arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 产品不存在提示 -->
    <section v-else-if="productsData.value && productsData.value.length > 0" class="px-4 py-20 sm:py-28">
      <div class="state-panel container mx-auto max-w-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f3f0e5] text-[#a48336]">
          <Icon name="heroicons:exclamation-triangle" class="h-8 w-8" />
        </div>
        <h2 class="mt-6 text-2xl font-semibold tracking-tight text-[#102b25]">产品未找到</h2>
        <p class="mt-3 text-base leading-7 text-[#718179]">抱歉，您查找的产品不存在或已被移除。</p>
        <div class="mx-auto mt-8 max-w-xl rounded-lg bg-[#f3f6f4] p-5 text-left">
          <p class="text-xs leading-6 text-[#7c8b83]">产品ID: {{ productId }} (类型: {{ typeof productId }})</p>
          <p class="mt-3 text-xs font-medium text-[#60736a]">可用产品ID列表:</p>
          <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="p in productsData.value" :key="p.id" class="rounded bg-white px-2 py-1 font-mono text-xs text-[#60736a]">
              ID: {{ p.id }} ({{ typeof p.id }})
            </span>
          </div>
        </div>
        <NuxtLink to="/products" class="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#102b25] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#159a76]">
          <Icon name="heroicons:arrow-left" class="h-4 w-4" />
          返回产品列表
        </NuxtLink>
      </div>
    </section>

    <!-- 数据加载错误 -->
    <section v-else class="px-4 py-20 sm:py-28">
      <div class="state-panel container mx-auto max-w-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8ece9] text-[#b65e50]">
          <Icon name="heroicons:exclamation-circle" class="h-8 w-8" />
        </div>
        <h2 class="mt-6 text-2xl font-semibold tracking-tight text-[#102b25]">数据加载错误</h2>
        <p class="mt-3 text-base leading-7 text-[#718179]">抱歉，产品数据加载失败，请稍后再试。</p>
        <NuxtLink to="/products" class="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#102b25] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#159a76]">
          <Icon name="heroicons:arrow-left" class="h-4 w-4" />
          返回产品列表
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
.product-gallery {
  background-image: radial-gradient(circle at 50% 42%, #ffffff 20%, #f0f5f2 100%);
}

.related-card,
.state-panel {
  border: 1px solid #dfe8e2;
  border-radius: 1rem;
  background: #fff;
}

.related-card {
  transition: border-color 300ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.related-card:hover {
  border-color: #aec9bb;
  transform: translateY(-3px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .related-card,
  .related-card img {
    transition: none;
  }

  .related-card:hover,
  .related-card:hover img {
    transform: none;
  }
}
</style>
