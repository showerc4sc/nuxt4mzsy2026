<template>
  <section class="relative overflow-hidden bg-white py-32 md:py-40">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center py-20">
        <div class="h-12 w-12 animate-spin rounded-full border-2 border-eco-300 border-t-eco-800"></div>
      </div>

      <!-- 标题区域 -->
      <div v-else class="reveal mb-20 max-w-3xl">
        <h2 class="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          {{ categoryData?.title || '新闻动态' }}
        </h2>
        <p class="mt-5 text-lg font-light leading-relaxed text-gray-600 md:text-xl">
          {{ categoryData?.subtitle || '了解我们的最新动态与行业资讯' }}
        </p>
      </div>

      <div v-if="!pending" class="reveal reveal-delay-1 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- 左侧：新闻大图轮播 -->
        <div class="lg:col-span-2" v-cloak>
          <div class="relative h-[440px] overflow-hidden rounded-[1.75rem] bg-gray-100 lg:h-[520px]">
            <div class="relative h-full overflow-hidden">
              <div
                class="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                :style="{ transform: `translateX(-${newsSlide * 100}%)` }"
              >
                <NuxtLink
                  v-for="news in featuredNews"
                  :key="news.id"
                  :to="`/newsDetail/${news.id}`"
                  class="relative block h-full w-full flex-shrink-0"
                >
                  <img
                    :src="news.image"
                    :alt="news.title"
                    class="h-full w-full object-cover"
                    onerror="this.src='https://picsum.photos/seed/news/800/500.jpg'"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                  <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div class="mb-4 flex items-center gap-3">
                      <span class="rounded-full bg-eco-700 px-3 py-1 text-xs font-medium">
                        {{ news.category_title || '公司新闻' }}
                      </span>
                      <span class="inline-flex items-center rounded-full bg-black/30 px-3 py-1 text-xs">
                        <Icon name="heroicons:calendar" class="mr-1 h-3.5 w-3.5" />
                        {{ news.date }}
                      </span>
                    </div>
                    <h3 class="mb-2 line-clamp-2 text-2xl font-bold md:text-3xl">{{ news.title }}</h3>
                    <p class="line-clamp-2 text-base leading-relaxed text-gray-200">{{ news.summary }}</p>
                  </div>
                </NuxtLink>
              </div>

              <!-- 轮播控制按钮：圆角胶囊 -->
              <button
                @click="prevNewsSlide"
                class="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 hover:bg-white active:scale-95"
                aria-label="上一条"
              >
                <Icon name="heroicons:chevron-left" class="h-5 w-5" />
              </button>
              <button
                @click="nextNewsSlide"
                class="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 hover:bg-white active:scale-95"
                aria-label="下一条"
              >
                <Icon name="heroicons:chevron-right" class="h-5 w-5" />
              </button>

              <!-- 轮播指示器 -->
              <div class="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                <button
                  v-for="(_, index) in featuredNews"
                  :key="index"
                  @click="newsSlide = index"
                  class="h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  :class="newsSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'"
                  :aria-label="`切换到第${index + 1}条`"
                ></button>
              </div>

              <!-- 图片计数器 -->
              <div class="absolute right-5 top-5 z-20 rounded-full bg-black/50 px-3 py-1 font-mono text-xs font-medium tabular-nums text-white backdrop-blur-sm">
                <span class="text-eco-300">{{ newsSlide + 1 }}</span> / {{ featuredNews.length }}
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：公司新闻列表（Double-Bezel） -->
        <div class="lg:col-span-1">
          <div class="bezel h-[440px] lg:h-[520px]">
            <div class="bezel-inner flex h-full flex-col overflow-hidden">
              <!-- 标题和更多 -->
              <div class="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <h3 class="flex items-center text-lg font-bold text-gray-900">
                  <span class="mr-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-eco-50 text-eco-800">
                    <Icon name="heroicons:newspaper" class="h-5 w-5" />
                  </span>
                  公司新闻
                </h3>
                <NuxtLink
                  to="/news"
                  class="group inline-flex items-center rounded-full px-2.5 py-1 text-sm font-medium text-eco-800 transition-colors hover:bg-eco-50"
                >
                  更多
                  <Icon
                    name="heroicons:arrow-right"
                    class="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </NuxtLink>
              </div>

              <!-- 新闻列表 -->
              <div class="flex-1 divide-y divide-gray-100 overflow-y-auto pr-1">
                <NuxtLink
                  v-for="(news, index) in companyNews"
                  :key="news.id"
                  :to="`/newsDetail/${news.id}`"
                  class="group block px-6 py-4 transition-colors hover:bg-eco-50/40"
                  :class="{ 'bg-eco-50/40': index === 0 }"
                >
                  <h4 class="line-clamp-2 text-sm font-medium leading-snug text-gray-800 transition-colors group-hover:text-eco-900">
                    {{ news.title }}
                  </h4>
                  <div class="mt-2 flex items-center justify-between">
                    <p class="line-clamp-1 flex-1 pr-3 text-xs text-gray-400">{{ news.summary }}</p>
                    <span class="shrink-0 rounded-full bg-gray-50 px-2 py-0.5 font-mono text-xs tabular-nums text-gray-400">{{ news.date }}</span>
                  </div>
                </NuxtLink>
              </div>

              <!-- 底部 -->
              <div class="border-t border-gray-100 px-6 py-4">
                <div class="flex items-center justify-center text-xs text-gray-400">
                  <Icon name="heroicons:information-circle" class="mr-1 h-3.5 w-3.5 text-eco-600" />
                  共 {{ companyNews.length }} 条新闻
                </div>
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
const { data: categoryData, pending } = await useAsyncData('category-news', () =>
  getCategoryBySlug('news'), {
  transform: (response) => {
    return response || null;
  }
});

/**
 * 根据栏目slug获取文章列表（包含子栏目）
 */
const { data: articleResponse } = await useAsyncData(
  'news-articles',
  () =>
    getArticleListByCategorySlug({
      category_slug: 'news',
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
 * 转换文章数据格式
 */
const newsData = computed(() => {
  if (!articleResponse.value?.rows) return [];

  return articleResponse.value.rows.map((article) => {
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

const nextNewsSlide = () => {
  if (!featuredNews.value.length) return;
  newsSlide.value = (newsSlide.value + 1) % featuredNews.value.length;
};

const prevNewsSlide = () => {
  if (!featuredNews.value.length) return;
  newsSlide.value = newsSlide.value === 0 ? featuredNews.value.length - 1 : newsSlide.value - 1;
};

// 自动轮播
let newsSlideInterval = null;

onMounted(() => {
  newsSlideInterval = setInterval(nextNewsSlide, 7000);
});

onUnmounted(() => {
  if (newsSlideInterval) {
    clearInterval(newsSlideInterval);
  }
});
</script>

<style scoped>
/* 组件特定样式 */
</style>
