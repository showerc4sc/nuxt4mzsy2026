<template>
  <section class="relative overflow-hidden bg-white py-20 md:py-28">
    <div class="site-container">
      <div v-if="pending" class="grid gap-8 lg:grid-cols-2" aria-label="产品加载中">
        <div class="skeleton aspect-[4/3] rounded-2xl"></div>
        <div class="space-y-5 py-6">
          <div class="skeleton h-5 w-28 rounded"></div>
          <div class="skeleton h-12 w-4/5 rounded"></div>
          <div class="skeleton h-24 rounded"></div>
          <div class="skeleton h-40 rounded-xl"></div>
        </div>
      </div>

      <template v-else>
        <div class="reveal mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="eyebrow">PRODUCTS & SOLUTIONS</p>
            <h2 class="section-heading">{{ categoryData?.title || '产品展示' }}</h2>
            <p class="section-copy">{{ categoryData?.subtitle || '我们提供全方位的新能源产品，满足不同场景的应用需求' }}</p>
          </div>
          <NuxtLink to="/products" class="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-[#276c56]">
            全部产品
            <Icon name="heroicons:arrow-up-right" class="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </NuxtLink>
        </div>

        <div v-if="productsData.length" class="reveal reveal-delay-1" v-cloak>
          <div class="overflow-hidden rounded-2xl border border-[#dfe7e2] bg-[#f7faf8]">
            <div class="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <article v-for="(product, index) in productsData" :key="product.id" class="grid w-full shrink-0 lg:grid-cols-12">
                <div class="relative min-h-72 overflow-hidden bg-[#e4ece7] sm:min-h-96 lg:col-span-7 lg:min-h-[570px]">
                  <img :src="product.image" :alt="product.name" class="absolute inset-0 h-full w-full object-cover" loading="lazy" onerror="this.src='https://picsum.photos/seed/mzsy-product/800/600.jpg'" />
                  <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c2c23]/45 to-transparent"></div>
                  <span class="absolute bottom-5 left-5 rounded-md bg-[#0c2c23]/75 px-2.5 py-1 font-mono text-xs tracking-widest text-white backdrop-blur-sm">{{ String(index + 1).padStart(2, '0') }} / {{ String(productsData.length).padStart(2, '0') }}</span>
                </div>

                <div class="flex flex-col p-6 sm:p-9 lg:col-span-5 lg:p-11">
                  <div class="flex items-center justify-between gap-4">
                    <span class="text-xs font-semibold text-[#32715a]">{{ product.category }}</span>
                    <span class="font-mono text-[10px] tracking-[0.12em] text-[#8b9a92]">{{ product.series || 'MZ系列' }}</span>
                  </div>
                  <h3 class="mt-5 text-2xl font-semibold leading-tight tracking-tight text-[#15392e] md:text-3xl">{{ product.name }}</h3>
                  <p class="mt-4 text-sm leading-7 text-[#60736a] md:text-base">{{ product.description }}</p>

                  <dl v-if="Object.keys(product.specifications).length" class="mt-7 border-t border-[#dce5df] pt-5">
                    <dt class="mb-3 text-xs font-semibold text-[#74877d]">技术规格</dt>
                    <div class="space-y-3">
                      <div v-for="(value, key) in product.specifications" :key="key" class="flex items-baseline justify-between gap-4 text-sm">
                        <dd class="text-[#73847b]">{{ key }}</dd>
                        <dd class="text-right font-mono font-medium tabular-nums text-[#25483b]">{{ value }}</dd>
                      </div>
                    </div>
                  </dl>

                  <div v-if="product.features?.length" class="mt-6 flex flex-wrap gap-2">
                    <span v-for="feature in product.features" :key="feature" class="tech-label">{{ feature }}</span>
                  </div>

                  <NuxtLink :to="`/productDetail/${product.id}`" class="btn-primary group mt-8 w-fit lg:mt-auto">
                    了解产品详情
                    <span class="btn-icon bg-white/10"><Icon name="heroicons:arrow-right" class="h-4 w-4" /></span>
                  </NuxtLink>
                </div>
              </article>
            </div>
          </div>

          <div v-if="productsData.length > 1" class="mt-6 flex items-center justify-between">
            <div class="flex gap-2">
              <button v-for="(_, index) in productsData" :key="index" type="button" class="h-1.5 rounded-full transition-all duration-300" :class="currentSlide === index ? 'w-9 bg-[#26765d]' : 'w-4 bg-[#d1ddd6] hover:bg-[#93aa9d]'" :aria-label="`切换到第${index + 1}个产品`" :aria-current="currentSlide === index ? 'true' : undefined" @click="currentSlide = index"></button>
            </div>
            <div class="flex gap-2">
              <button type="button" class="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d5e1da] bg-white text-[#385b4d] transition-colors hover:bg-[#edf5f0]" aria-label="上一个产品" @click="prevSlide"><Icon name="heroicons:arrow-left" class="h-4 w-4" /></button>
              <button type="button" class="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d5e1da] bg-white text-[#385b4d] transition-colors hover:bg-[#edf5f0]" aria-label="下一个产品" @click="nextSlide"><Icon name="heroicons:arrow-right" class="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        <div v-else class="rounded-2xl border border-dashed border-[#cbdad1] py-20 text-center">
          <Icon name="heroicons:cube" class="mx-auto h-9 w-9 text-[#8aab9b]" />
          <p class="mt-4 font-semibold text-[#28493c]">产品内容正在更新</p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { getCategoryBySlug } from '~/api/category';
import { getArticleListByCategorySlug } from '~/api/article';

const { data: categoryData, pending } = await useAsyncData('category-products', () =>
  getCategoryBySlug('products'), {
  transform: (response) => response || null
});

const { data: productResponse } = await useAsyncData('products-articles', () =>
  getArticleListByCategorySlug({ category_slug: 'products', recursive: true, limit: 10 }), {
  transform: (response) => response || { rows: [], total: 0 }
});

const productsData = computed(() => {
  if (!productResponse.value?.rows) return [];
  return productResponse.value.rows.map((product) => {
    const coverUrl = product.cover ? product.cover.replace(/`/g, '').trim() : '';
    let specifications = {};
    if (product.attrList && Array.isArray(product.attrList)) {
      specifications = product.attrList.reduce((acc, item) => {
        if (item.attrName && item.attrValue) acc[item.attrName] = item.attrValue;
        return acc;
      }, {});
    }
    let features = [];
    if (product.keywords) {
      if (typeof product.keywords === 'string') {
        features = product.keywords.split(/[,;|，；|]/).map((k) => k.trim()).filter((k) => k);
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
      specifications,
      features
    };
  });
});

const currentSlide = ref(0);
const nextSlide = () => {
  if (!productsData.value.length) return;
  currentSlide.value = (currentSlide.value + 1) % productsData.value.length;
};
const prevSlide = () => {
  if (!productsData.value.length) return;
  currentSlide.value = currentSlide.value === 0 ? productsData.value.length - 1 : currentSlide.value - 1;
};

let slideInterval = null;
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) slideInterval = setInterval(nextSlide, 5000);
});
onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
});
</script>
