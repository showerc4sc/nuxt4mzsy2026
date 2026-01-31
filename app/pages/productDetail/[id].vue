<template>
  <div>
    <!-- 加载状态 -->
    <div v-if="loading" class="min-h-screen bg-gray-50">
      <!-- 页面标题区域骨架屏 -->
      <section class="relative pt-32 pb-20 bg-gradient-to-br from-eco-800 to-teal-700">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto animate-pulse">
            <div class="h-6 bg-white/20 rounded w-24 mb-4"></div>
            <div class="h-12 bg-white/20 rounded w-2/3 mb-4"></div>
            <div class="h-6 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>
      </section>

      <!-- 产品内容区域骨架屏 -->
      <section class="py-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="space-y-4">
              <div class="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
              <div class="grid grid-cols-4 gap-3">
                <div v-for="i in 4" :key="i" class="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div class="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error || !productInfo" class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">加载失败</h2>
        <p class="text-gray-500 mb-6">无法加载产品详情，请稍后重试</p>
        <NuxtLink to="/products"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-eco-600 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          返回产品列表
        </NuxtLink>
      </div>
    </div>

    <!-- 正常内容 -->
    <div v-else class="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <!-- 页面标题 -->
      <section class="relative pt-28 pb-16 text-white overflow-hidden">
        <!-- 动态渐变背景 -->
        <div class="absolute inset-0 bg-gradient-to-br from-eco-800 via-eco-700 to-teal-700"></div>
        <!-- 装饰图案 -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
        </div>
        <!-- 光晕装饰 -->
        <div class="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div class="absolute bottom-0 left-0 w-1/2 h-full opacity-20">
          <div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="max-w-4xl">
            <!-- 产品分类标签 -->
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Icon name="heroicons:cube" class="w-4 h-4 text-eco-200" />
              <span class="text-sm font-medium">{{ product.category }}</span>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {{ product.name }}
            </h1>
            <p class="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
              {{ product.description }}
            </p>
          </div>
        </div>

      </section>

      <!-- 面包屑导航 -->
      <section class="py-4 bg-gray-50/50 backdrop-blur-sm border-b border-gray-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NuxtLink to="/" class="text-gray-500 hover:text-eco-600 transition-colors flex items-center gap-1">
                  <Icon name="heroicons:home" class="w-4 h-4" />
                  <span class="hidden sm:inline">首页</span>
                </NuxtLink>
              </li>
              <li>
                <div class="flex items-center">
                  <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-300" />
                  <NuxtLink to="/products" class="ml-1 text-gray-500 hover:text-eco-600 transition-colors md:ml-2">
                    产品列表
                  </NuxtLink>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-300" />
                  <span class="ml-1 text-eco-600 font-medium md:ml-2 truncate max-w-[150px] sm:max-w-xs">{{ product?.name || '产品详情' }}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <!-- 页面内容容器 -->
      <div class="relative z-10">
        <!-- 产品详情内容 -->
        <section class="py-16 relative overflow-hidden">
          <!-- 背景装饰 -->
          <div class="absolute top-0 left-0 w-72 h-72 bg-eco-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 class="sr-only">产品详细信息</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <!-- 产品图片 -->
              <div class="space-y-6">
                <!-- 主图 -->
                <div class="relative group">
                  <div class="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                    <img :src="currentImageUrl" :alt="product.name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onerror="this.src='https://picsum.photos/seed/mzsy-product-detail/800/800.jpg'" />
                  </div>
                  <!-- 图片切换指示器 -->
                  <div v-if="product.images && product.images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    <button v-for="(img, index) in product.images" :key="index"
                      @click="currentImageIndex = index"
                      class="w-2 h-2 rounded-full transition-all duration-300"
                      :class="currentImageIndex === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'">
                    </button>
                  </div>
                </div>

                <!-- 产品图片缩略图 -->
                <div v-if="product.images && product.images.length > 0" class="grid grid-cols-4 gap-3">
                  <div v-for="(img, index) in product.images" :key="index"
                    class="aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ring-2"
                    :class="currentImageIndex === index ? 'ring-eco-500 shadow-lg' : 'ring-transparent hover:ring-gray-200'"
                    @click="currentImageIndex = index">
                    <img :src="img" :alt="`${product.name} ${index + 1}`"
                      class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onerror="this.src='https://picsum.photos/seed/mzsy-product-thumb/200/200.jpg'" />
                  </div>
                </div>
              </div>

              <!-- 产品信息 -->
              <div class="space-y-8">
                <!-- 标题区域 -->
                <div class="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-100">
                  <div class="flex items-center gap-3 mb-4">
                    <span class="px-4 py-1.5 bg-gradient-to-r from-eco-500 to-teal-500 text-white rounded-full text-sm font-semibold shadow-md">
                      {{ product.category }}
                    </span>
                    <div class="flex text-yellow-400">
                      <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-5 h-5 fill-current" />
                    </div>
                  </div>

                  <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{{ product.name }}</h1>
                  <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
                </div>

                <!-- 产品特点 -->
                <div v-if="product.attrList && product.attrList.length > 0" class="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-100">
                  <div class="flex items-center gap-2 mb-5">
                    <div class="w-10 h-10 bg-gradient-to-br from-eco-100 to-teal-100 rounded-xl flex items-center justify-center">
                      <Icon name="heroicons:sparkles" class="w-5 h-5 text-eco-600" />
                    </div>
                    <h2 class="text-xl font-bold text-gray-900">产品特点</h2>
                  </div>
                  <div class="space-y-4">
                    <div v-for="(attr, index) in product.attrList" :key="attr._index"
                      class="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-gray-50">
                      <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-eco-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                        <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
                      </div>
                      <div class="flex-1">
                        <h3 class="font-bold text-gray-900 mb-1">{{ attr.attrName }}</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">{{ attr.attrValue }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 应用场景 -->
                <div v-if="product.keywords && product.keywords.length > 0" class="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-100">
                  <div class="flex items-center gap-2 mb-5">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <Icon name="heroicons:map-pin" class="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 class="text-xl font-bold text-gray-900">应用场景</h2>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="keyword in product.keywords" :key="keyword"
                      class="px-4 py-2 bg-gradient-to-r from-eco-50 to-teal-50 text-eco-700 rounded-xl text-sm font-medium border border-eco-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                      {{ keyword }}
                    </span>
                  </div>
                </div>

                <!-- 联系咨询 -->
                <div class="bg-gradient-to-br from-eco-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                  <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 class="text-lg font-bold mb-1">需要了解更多？</h3>
                      <p class="text-white/80 text-sm">我们的专业团队随时为您服务</p>
                    </div>
                    <NuxtLink to="/contact"
                      class="group flex items-center gap-2 px-6 py-3 bg-white text-eco-600 font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                      <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5" />
                      <span>咨询产品</span>
                      <Icon name="heroicons:arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 产品参数 -->
        <section v-if="product.content" class="py-20 relative overflow-hidden">
          <!-- 背景 -->
          <div class="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
          <div class="absolute top-0 left-1/4 w-96 h-96 bg-eco-100/50 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl"></div>

          <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-12">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-eco-100 rounded-full mb-4">
                <Icon name="heroicons:document-text" class="w-4 h-4 text-eco-600" />
                <span class="text-sm font-semibold text-eco-700">详细参数</span>
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">产品参数</h2>
              <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                详细的技术参数和性能指标，助您全面了解产品
              </p>
            </div>

            <div class="bg-white rounded-3xl shadow-xl ring-1 ring-gray-100 overflow-hidden">
              <div class="p-8 md:p-12">
                <div class="prose prose-lg max-w-none product-content" v-html="product.content"></div>
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 产品参数内容样式 */
.product-content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  color: #1f2937;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.product-content :deep(h3) {
  font-size: 1.375rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #374151;
}

.product-content :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.8;
  color: #4b5563;
}

.product-content :deep(ul) {
  list-style-type: none;
  margin-left: 0;
  margin-bottom: 1.5rem;
  padding-left: 0;
}

.product-content :deep(li) {
  margin-bottom: 0.75rem;
  line-height: 1.8;
  color: #4b5563;
  padding-left: 1.5rem;
  position: relative;
}

.product-content :deep(li)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #10b981, #14b8a6);
  border-radius: 50%;
}

.product-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 2rem 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.product-content :deep(br) {
  display: block;
  margin: 0.5rem 0;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
