<template>
  <section class="news-section py-16 bg-white relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600"></div>
      </div>

      <!-- 标题区域 -->
      <div v-else class="text-center mb-12 flex flex-col items-center">
        <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-4">
          新闻动态
        </div>
        <h2 class="block text-3xl md:text-4xl font-bold text-gray-900 mb-4 w-full">
          {{ categoryData?.title || '新闻动态' }}

        </h2>
        <p class="block text-lg text-gray-600 max-w-2xl mx-auto w-full">
          {{ categoryData?.subtitle || '新闻中心' }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左侧：新闻大图轮播 -->
        <div class="lg:col-span-2">
          <div class="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 h-[500px]" v-cloak>
            <!-- 轮播容器 -->
            <div class="relative h-full overflow-hidden">
              <div class="flex h-full transition-transform duration-700 ease-out"
                :style="{ transform: `translateX(-${newsSlide * 100}%)` }">
                <!-- 轮播项 -->
                <NuxtLink v-for="(news, index) in featuredNews" :key="news.id" :to="`/newsDetail/${news.id}`"
                  class="w-full flex-shrink-0 relative h-full block">
                  <!-- 新闻图片 -->
                  <img :src="news.image" :alt="news.title" class="w-full h-full object-cover"
                    onerror="this.src='https://picsum.photos/seed/news/800/500.jpg'" />

                  <!-- 渐变遮罩 -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <!-- 新闻信息 -->
                  <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div class="flex items-center space-x-2 mb-3">
                      <span class="px-3 py-1 bg-eco-600 rounded-full text-sm font-medium">
                        {{ news.category_title || '公司新闻' }}
                      </span>
                      <span class="text-sm text-gray-300">
                        {{ news.date }}
                      </span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold mb-2 line-clamp-2">
                      {{ news.title }}
                    </h3>
                    <p class="text-gray-200 line-clamp-2">
                      {{ news.summary }}
                    </p>
                  </div>
                </NuxtLink>
              </div>

              <!-- 轮播控制按钮 -->
              <button @click="prevNewsSlide"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-20 hover:scale-110"
                aria-label="上一条">
                <Icon name="heroicons:chevron-left" class="w-5 h-5" />
              </button>

              <button @click="nextNewsSlide"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-20 hover:scale-110"
                aria-label="下一条">
                <Icon name="heroicons:chevron-right" class="w-5 h-5" />
              </button>

              <!-- 轮播指示器 -->
              <div class="absolute bottom-4 right-4 flex space-x-2 z-20">
                <button v-for="(_, index) in featuredNews" :key="index" @click="newsSlide = index"
                  class="transition-all duration-300"
                  :class="newsSlide === index ? 'w-8 h-2 bg-white rounded-full' : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'"
                  :aria-label="`切换到第${index + 1}条`">
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：公司新闻列表 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-xl p-6 h-[500px] flex flex-col">
            <!-- 标题和更多按钮 -->
            <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 class="text-xl font-bold text-gray-900 flex items-center">
                <Icon name="heroicons:newspaper" class="w-5 h-5 mr-2 text-eco-600" />
                公司新闻
              </h3>
              <NuxtLink to="/news"
                class="text-eco-600 hover:text-eco-700 text-sm font-medium flex items-center group transition-colors duration-200">
                更多
                <Icon name="heroicons:arrow-right"
                  class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </NuxtLink>
            </div>

            <!-- 新闻列表 -->
            <div class="flex-1 space-y-1 pr-2">
              <NuxtLink v-for="news in companyNews" :key="news.id" :to="`/newsDetail/${news.id}`"
                class="group cursor-pointer transition-all duration-200 hover:bg-gray-50 rounded-lg p-2 block">
                <div class="flex items-start justify-between">
                  <!-- 左侧：新闻名称 -->
                  <div class="flex-1 pr-3">
                    <h4
                      class="text-sm text-gray-900 font-medium group-hover:text-eco-600 transition-colors duration-200 line-clamp-2">
                      {{ news.title }}
                    </h4>
                    <p class="text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {{ news.summary }}
                    </p>
                  </div>
                  <!-- 右侧：发布时间 -->
                  <div class="text-right flex-shrink-0">
                    <span class="text-xs text-gray-400 whitespace-nowrap">
                      {{ news.date }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 新闻中心组件
 * 显示新闻大图轮播和公司新闻列表
 */

// 导入API
import { getCategoryBySlug } from '~/api/category';
import { getArticleListByCategorySlug } from '~/api/article';

/**
 * 根据slug获取栏目信息
 */
const { data: categoryData, pending } = await useAsyncData(
  'category-news',
  () => getCategoryBySlug('news'),
  {
    transform: (response) => {
      console.log('栏目数据:', response);
      return response || null;
    }
  }
);

/**
 * 根据栏目slug获取文章列表（包含子栏目）
 */
const { data: articleResponse } = await useAsyncData(
  'news-articles',
  () => getArticleListByCategorySlug({
    category_slug: 'news',
    recursive: true,
    limit: 10
  }),
  {
    transform: (response) => {
      console.log('文章数据:', response);
      return response || { rows: [], total: 0 };
    }
  }
);

/**
 * 转换文章数据格式
 */
const newsData = computed(() => {
  if (!articleResponse.value?.rows) return [];

  return articleResponse.value.rows.map(article => {
    // 处理cover字段，去除可能存在的反引号和空格
    const coverUrl = article.cover ? article.cover.replace(/`/g, '').trim() : '';

    return {
      id: article._id,
      title: article.title,
      summary: article.summary || article.subtitle || '',
      image: coverUrl || 'https://picsum.photos/seed/news/800/500.jpg',
      category: article.category_info?.title || '公司新闻',
      date: article._add_time_str || '',
      featured: article.is_home || false,
      author: article.author || '淼泽松源',
      content: article.content || '',
      category_title: article.category_title || '公司新闻'
    };
  });
});

// 精选新闻（用于轮播，取前4条）
const featuredNews = computed(() => {
  return newsData.value.slice(0, 4);
});

// 公司新闻列表（所有新闻）
const companyNews = computed(() => {
  return newsData.value;
});

// 新闻轮播控制
const newsSlide = ref(0);

/**
 * 切换到下一条新闻
 */
const nextNewsSlide = () => {
  if (!featuredNews.value.length) return;
  newsSlide.value = (newsSlide.value + 1) % featuredNews.value.length;
};

/**
 * 切换到上一条新闻
 */
const prevNewsSlide = () => {
  if (!featuredNews.value.length) return;
  newsSlide.value = newsSlide.value === 0 ? featuredNews.value.length - 1 : newsSlide.value - 1;
};

// 自动轮播
let newsSlideInterval = null;

/**
 * 组件挂载后启动自动轮播
 */
onMounted(() => {
  newsSlideInterval = setInterval(nextNewsSlide, 7000); // 每7秒自动切换新闻轮播
});

/**
 * 组件卸载时清理定时器
 */
onUnmounted(() => {
  if (newsSlideInterval) {
    clearInterval(newsSlideInterval);
  }
});
</script>

<style scoped>
/* 组件特定样式 */
</style>
