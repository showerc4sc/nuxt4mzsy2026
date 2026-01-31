<template>
  <div>
    <!-- 加载状态 -->
    <div v-if="loading" class="min-h-screen bg-gray-50">
      <!-- 页面标题区域骨架屏 -->
      <section class="relative pt-40 pb-24 bg-gradient-to-br from-eco-900 to-primary-900">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto animate-pulse">
            <div class="flex items-center gap-2 mb-4">
              <div class="h-6 bg-white/20 rounded-full w-20"></div>
              <div class="h-4 bg-white/20 rounded w-24"></div>
            </div>
            <div class="h-10 bg-white/20 rounded w-3/4 mb-4"></div>
            <div class="h-6 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>
      </section>

      <!-- 文章内容区域骨架屏 -->
      <section class="py-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto space-y-8">
            <div class="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div class="bg-white rounded-2xl shadow-lg p-8 space-y-4 animate-pulse">
              <div class="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-24"></div>
                  <div class="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error || !articleInfo" class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">加载失败</h2>
        <p class="text-gray-500 mb-6">无法加载文章详情，请稍后重试</p>
        <NuxtLink to="/news"
          class="inline-flex items-center gap-2 px-6 py-3 bg-eco-600 text-white rounded-lg hover:bg-eco-700 transition-colors duration-300 font-medium">
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          返回新闻列表
        </NuxtLink>
      </div>
    </div>

    <!-- 正常内容 -->
    <div v-else>
      <!-- 页面标题区域 -->
      <section class="relative pt-40 pb-24 text-white overflow-hidden"
        style="background-image: url('https://picsum.photos/seed/mzsy-news-detail/1920/1080.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
        <!-- 深色遮罩层 -->
        <div class="absolute inset-0 bg-gradient-to-br from-eco-900/85 to-primary-900/80"></div>
        <!-- 装饰性光晕 -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"></div>
          <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
        </div>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 mb-4">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                getCategoryColor(articleData.category)
              ]">
                {{ articleData.category }}
              </span>
              <span class="text-white/70 text-sm">
                {{ articleData.date }}
              </span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {{ articleData.title }}
            </h1>
            <p class="text-xl opacity-90">
              {{ articleData.summary }}
            </p>
          </div>
        </div>
      </section>

      <!-- 文章内容区域 -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <!-- 文章封面图 -->
            <div class="mb-12 rounded-2xl overflow-hidden shadow-xl">
              <img :src="articleData.image" :alt="articleData.title"
                class="w-full h-auto object-cover"
                onerror="this.src='https://picsum.photos/seed/news/1200/600.jpg'" />
            </div>

            <!-- 文章正文 -->
            <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div class="prose prose-lg max-w-none">
                <!-- 作者信息 -->
                <div class="flex items-center gap-4 pb-6 border-b border-gray-200 mb-8">
                  <div class="w-12 h-12 bg-eco-100 rounded-full flex items-center justify-center">
                    <Icon name="heroicons:user" class="w-6 h-6 text-eco-600" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ articleData.author || '淼泽松源' }}</div>
                    <div class="text-sm text-gray-500">{{ articleData.date }}</div>
                  </div>
                </div>

                <!-- 文章内容 -->
                <div class="article-content" v-html="articleData.content"></div>
              </div>
            </div>

            <!-- 返回按钮 -->
            <div class="mt-12">
              <NuxtLink to="/news"
                class="inline-flex items-center gap-2 px-6 py-3 bg-eco-600 text-white rounded-lg hover:bg-eco-700 transition-colors duration-300 font-medium">
                <Icon name="heroicons:arrow-left" class="w-5 h-5" />
                返回新闻列表
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { getArticleById } from '~/api/article';

/**
 * 获取分类颜色
 * @param {string} category - 分类名称
 * @returns {string} 返回分类对应的颜色类名
 */
const getCategoryColor = (category) => {
  const colorMap = {
    '公司新闻': 'bg-eco-100 text-eco-700',
    '现场考察': 'bg-blue-100 text-blue-700',
    '媒体报道': 'bg-purple-100 text-purple-700',
    '行业新闻': 'bg-orange-100 text-orange-700',
    '技术动态': 'bg-teal-100 text-teal-700',
    '展会动态': 'bg-pink-100 text-pink-700'
  };
  return colorMap[category] || 'bg-gray-100 text-gray-700';
};

// 获取路由参数
const route = useRoute();
const newsId = route.params.id;

// 使用API获取文章详情
const { data: articleInfo, pending: loading, error } = await useAsyncData(
  `news-detail-${newsId}`,
  async () => {
    try {
      console.log('获取文章详情, ID:', newsId);
      const response = await getArticleById(newsId);
      console.log('文章详情数据:', response);
      return response || null;
    } catch (err) {
      console.error('获取文章详情失败:', err);
      return null;
    }
  },
  {
    server: true
  }
);

// 转换文章数据格式
const articleData = computed(() => {
  if (!articleInfo.value) {
    return {
      id: newsId,
      title: '加载中...',
      summary: '',
      content: '',
      image: '',
      category: '',
      date: '',
      author: '淼泽松源'
    };
  }

  // 处理封面图片
  let coverUrl = articleInfo.value.cover || '';
  if (coverUrl) {
    coverUrl = coverUrl.replace(/`/g, '').trim();
  }

  return {
    id: articleInfo.value._id,
    title: articleInfo.value.title,
    summary: articleInfo.value.subtitle || articleInfo.value.summary || '',
    content: articleInfo.value.content || '',
    image: coverUrl || 'https://picsum.photos/seed/news/1200/600.jpg',
    category: articleInfo.value.category_name || '新闻',
    date: articleInfo.value._add_time_str || '',
    author: articleInfo.value.author || '淼泽松源'
  };
});

// 设置页面标题
useHead({
  title: computed(() => `${articleData.value.title} - 淼泽松源`),
  meta: [
    { name: 'description', content: computed(() => articleData.value.summary) }
  ]
});
</script>

<style scoped>
.article-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.article-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #374151;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.75;
  color: #4b5563;
}

.article-content :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  color: #4b5563;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.75;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}
</style>
