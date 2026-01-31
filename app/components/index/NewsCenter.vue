<template>
  <section class="news-section py-20 bg-white relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600"></div>
      </div>

      <!-- 标题区域 -->
      <div v-else class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-eco-50 border border-eco-100 text-eco-700 rounded-full text-sm font-medium mb-4">
          <Icon name="heroicons:megaphone" class="w-4 h-4 mr-2" />
          新闻动态
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          <span class="text-gradient-animate">{{ categoryData?.title || '新闻动态' }}</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ categoryData?.subtitle || '了解我们的最新动态与行业资讯' }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左侧：新闻大图轮播 -->
        <div class="lg:col-span-2">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 h-[500px] group card-shine" v-cloak>
            <!-- 轮播容器 -->
            <div class="relative h-full overflow-hidden">
              <div class="flex h-full transition-transform duration-700 ease-out"
                :style="{ transform: `translateX(-${newsSlide * 100}%)` }">
                <!-- 轮播项 -->
                <NuxtLink v-for="(news, index) in featuredNews" :key="news.id" :to="`/newsDetail/${news.id}`"
                  class="w-full flex-shrink-0 relative h-full block img-zoom">
                  <!-- 新闻图片 -->
                  <img :src="news.image" :alt="news.title" class="w-full h-full object-cover"
                    onerror="this.src='https://picsum.photos/seed/news/800/500.jpg'" />

                  <!-- 渐变遮罩 -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  <!-- 新闻信息 -->
                  <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div class="flex items-center space-x-3 mb-4">
                      <span class="px-4 py-1.5 bg-eco-500 rounded-full text-sm font-medium shadow-lg">
                        {{ news.category_title || '公司新闻' }}
                      </span>
                      <span class="flex items-center text-sm text-gray-300 bg-black/30 px-3 py-1.5 rounded-full">
                        <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                        {{ news.date }}
                      </span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold mb-3 line-clamp-2 group-hover:text-eco-200 transition-colors">
                      {{ news.title }}
                    </h3>
                    <p class="text-gray-200 line-clamp-2 text-base leading-relaxed">
                      {{ news.summary }}
                    </p>
                  </div>
                </NuxtLink>
              </div>

              <!-- 轮播控制按钮 -->
              <button @click="prevNewsSlide"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 z-20 hover:scale-110 opacity-0 group-hover:opacity-100">
                <Icon name="heroicons:chevron-left" class="w-5 h-5" />
              </button>

              <button @click="nextNewsSlide"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 z-20 hover:scale-110 opacity-0 group-hover:opacity-100">
                <Icon name="heroicons:chevron-right" class="w-5 h-5" />
              </button>

              <!-- 轮播指示器 -->
              <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                <button v-for="(_, index) in featuredNews" :key="index" @click="newsSlide = index"
                  class="transition-all duration-300"
                  :class="newsSlide === index ? 'w-10 h-2.5 bg-white rounded-full shadow-lg' : 'w-2.5 h-2.5 bg-white/50 rounded-full hover:bg-white/80'"
                  :aria-label="`切换到第${index + 1}条`">
                </button>
              </div>

              <!-- 图片计数器 -->
              <div class="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium z-20">
                <span class="text-eco-400">{{ newsSlide + 1 }}</span> / {{ featuredNews.length }}
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：公司新闻列表 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-xl p-6 h-[500px] flex flex-col border border-gray-100 hover-shadow-lift transition-all duration-300">
            <!-- 标题和更多按钮 -->
            <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 class="text-xl font-bold text-gray-900 flex items-center">
                <div class="w-10 h-10 bg-eco-100 rounded-xl flex items-center justify-center mr-3">
                  <Icon name="heroicons:newspaper" class="w-5 h-5 text-eco-600" />
                </div>
                公司新闻
              </h3>
              <NuxtLink to="/news"
                class="text-eco-600 hover:text-eco-700 text-sm font-medium flex items-center group px-3 py-1.5 rounded-lg hover:bg-eco-50 transition-all">
                更多
                <Icon name="heroicons:arrow-right"
                  class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </NuxtLink>
            </div>

            <!-- 新闻列表 -->
            <div class="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-thin">
              <NuxtLink v-for="(news, index) in companyNews" :key="news.id" :to="`/newsDetail/${news.id}`"
                class="group cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-eco-50 hover:to-transparent rounded-xl p-3 block border border-transparent hover:border-eco-100"
                :class="{ 'bg-eco-50/50 border-eco-100': index === 0 }">
                <div class="flex items-start justify-between">
                  <!-- 左侧：新闻序号和名称 -->
                  <div class="flex flex-1 pr-3">
                    <span class="flex-shrink-0 w-6 h-6 bg-gray-100 text-gray-500 rounded-lg flex items-center justify-center text-xs font-bold mr-3 group-hover:bg-eco-500 group-hover:text-white transition-all">
                      {{ index + 1 }}
                    </span>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm text-gray-800 font-medium group-hover:text-eco-700 transition-colors line-clamp-2 leading-snug">
                        {{ news.title }}
                      </h4>
                      <p class="text-xs text-gray-400 mt-1 line-clamp-1">
                        {{ news.summary }}
                      </p>
                    </div>
                  </div>
                  <!-- 右侧：发布时间 -->
                  <div class="text-right flex-shrink-0 ml-2">
                    <span class="text-xs text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
                      {{ news.date }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- 底部装饰 -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="flex items-center justify-center text-sm text-gray-500">
                <Icon name="heroicons:information-circle" class="w-4 h-4 mr-1 text-eco-500" />
                共 {{ companyNews.length }} 条新闻
              </div>
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
