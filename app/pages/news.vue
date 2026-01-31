<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- 页面标题 -->
    <PageTitle slug="news" />

    <!-- 页面内容容器 -->
    <div class="relative z-10">
      <!-- 新闻分类切换组件 -->
      <NewsCategoryTabs
        v-model="currentCategory"
        slug="news"
        @change="onCategoryChange"
      />

      <!-- 新闻列表 -->
      <section class="py-16 relative overflow-hidden">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-20 left-0 w-72 h-72 bg-eco-100/50 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 right-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="max-w-5xl mx-auto">
            <!-- 加载状态 -->
            <div v-if="pending" class="space-y-6">
              <div v-for="i in 3" :key="i" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div class="flex flex-col md:flex-row">
                  <div class="md:w-2/5 h-56 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
                  <div class="flex-1 p-6 space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="h-6 bg-gray-200 rounded-full w-24"></div>
                      <div class="h-4 bg-gray-200 rounded w-28"></div>
                    </div>
                    <div class="h-7 bg-gray-200 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-200 rounded w-full"></div>
                    <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div class="pt-2">
                      <div class="h-5 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 新闻卡片列表 -->
            <div v-else-if="currentNews.length > 0" class="space-y-8">
              <NuxtLink
                v-for="(news, index) in currentNews"
                :key="news.id"
                :to="`/newsDetail/${news.id}`"
                class="group block relative"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <!-- 卡片容器 -->
                <div class="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  <!-- 悬停边框光效 -->
                  <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%);">
                  </div>

                  <div class="flex flex-col md:flex-row relative z-10">
                    <!-- 新闻图片 -->
                    <div class="md:w-2/5 h-56 md:h-64 overflow-hidden relative">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img
                        :src="news.image"
                        :alt="news.title"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        onerror="this.src='https://picsum.photos/seed/news/800/500.jpg'"
                      />
                      <!-- 图片角标 -->
                      <div class="absolute top-4 left-4 z-20">
                        <span :class="[
                          'px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm',
                          getCategoryBadgeStyle(news.category)
                        ]">
                          {{ news.category }}
                        </span>
                      </div>
                    </div>

                    <!-- 新闻内容 -->
                    <div class="flex-1 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <!-- 日期 -->
                        <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Icon name="heroicons:calendar" class="w-4 h-4" />
                          <span>{{ news.date }}</span>
                        </div>

                        <!-- 标题 -->
                        <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-eco-600 transition-colors duration-300 line-clamp-2 leading-tight">
                          {{ news.title }}
                        </h3>

                        <!-- 摘要 -->
                        <p class="text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                          {{ news.summary }}
                        </p>
                      </div>

                      <!-- 底部操作区 -->
                      <div class="flex items-center justify-between">
                        <div class="flex items-center text-eco-600 font-semibold group-hover:text-eco-700 transition-all duration-300">
                          <span class="relative">
                            阅读更多
                            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-eco-600 group-hover:w-full transition-all duration-300"></span>
                          </span>
                          <Icon name="heroicons:arrow-right"
                            class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>

                        <!-- 装饰点 -->
                        <div class="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span class="w-2 h-2 rounded-full bg-eco-400"></span>
                          <span class="w-2 h-2 rounded-full bg-eco-300"></span>
                          <span class="w-2 h-2 rounded-full bg-eco-200"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- 空状态 -->
            <div v-else class="text-center py-20">
              <div class="relative inline-block mb-8">
                <div class="w-28 h-28 bg-gradient-to-br from-eco-100 to-teal-100 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="heroicons:newspaper" class="w-14 h-14 text-eco-400" />
                </div>
                <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:sparkles" class="w-4 h-4 text-yellow-600" />
                </div>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">暂无新闻</h3>
              <p class="text-gray-500 max-w-md mx-auto">该分类下暂时没有新闻内容，请选择其他分类或稍后再来查看</p>
            </div>

            <!-- 分页 -->
            <div v-if="totalPages > 1" class="mt-16 flex justify-center items-center gap-3">
              <button
                @click="currentPage > 1 && currentPage--"
                :disabled="currentPage === 1"
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                :class="currentPage === 1
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-gray-700 hover:bg-eco-50 hover:text-eco-600 shadow-md hover:shadow-lg border border-gray-200'"
              >
                <Icon name="heroicons:chevron-left" class="w-5 h-5" />
                上一页
              </button>

              <div class="flex items-center gap-2">
                <button
                  v-for="page in displayedPages"
                  :key="page"
                  @click="currentPage = page"
                  class="w-11 h-11 rounded-xl font-medium transition-all duration-300"
                  :class="currentPage === page
                    ? 'bg-gradient-to-br from-eco-600 to-teal-600 text-white shadow-lg shadow-eco-500/30 scale-105'
                    : 'bg-white text-gray-700 hover:bg-eco-50 hover:text-eco-600 shadow-md border border-gray-200'"
                >
                  {{ page }}
                </button>
              </div>

              <button
                @click="currentPage < totalPages && currentPage++"
                :disabled="currentPage === totalPages"
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                :class="currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-gray-700 hover:bg-eco-50 hover:text-eco-600 shadow-md hover:shadow-lg border border-gray-200'"
              >
                下一页
                <Icon name="heroicons:chevron-right" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
/**
 * 新闻中心页面
 */

import { getArticleListByCategorySlug } from '~/api/article';

// 当前选中的分类信息
const currentCategory = ref('');
const currentCategorySlug = ref('news'); // 默认使用 'news'

// 当前页码
const currentPage = ref(1);

// 每页显示的新闻数量
const pageSize = ref(6);

// 分类切换处理
const onCategoryChange = (category) => {
  console.log('切换到分类:', category);
  // 更新当前分类的 slug
  currentCategorySlug.value = category.slug || 'news';
  // 重置页码
  currentPage.value = 1;
  // 重新获取新闻数据
  refreshNews();
};

// 使用API获取新闻列表
const { data: articleData, pending, refresh: refreshNews } = await useAsyncData(
  'news-list',
  async () => {
    try {
      const params = {
        category_slug: currentCategorySlug.value,
        recursive: true,
        page: currentPage.value,
        limit: pageSize.value
      };
      console.log('获取新闻列表参数:', params);
      const response = await getArticleListByCategorySlug(params);
      console.log('新闻列表数据:', response);
      return response || { rows: [], total: 0, categoryInfo: null };
    } catch (err) {
      console.error('获取新闻列表失败:', err);
      return { rows: [], total: 0, categoryInfo: null };
    }
  },
  {
    server: true,
    watch: [currentPage, currentCategorySlug]
  }
);

// 转换新闻数据格式
const newsData = computed(() => {
  if (!articleData.value?.rows) return [];
  
  return articleData.value.rows.map(article => {
    // 处理封面图片
    let coverUrl = article.cover || '';
    if (coverUrl) {
      coverUrl = coverUrl.replace(/`/g, '').trim();
    }
    
    return {
      id: article._id,
      title: article.title,
      summary: article.subtitle || article.summary || '',
      image: coverUrl || 'https://picsum.photos/seed/news/800/500.jpg',
      category: article.category_info?.title || '新闻',
      date: article._add_time_str || '',
      content: article.content || ''
    };
  });
});

// 总数量
const totalNews = computed(() => articleData.value?.total || 0);

// 当前页显示的新闻（直接使用API返回的数据）
const currentNews = computed(() => {
  return newsData.value;
});

// 总页数
const totalPages = computed(() => {
  // 使用API返回的总数
  if (totalNews.value > 0) {
    return Math.ceil(totalNews.value / pageSize.value);
  }
  return 0;
});

// 获取分类徽章样式（增强版）
const getCategoryBadgeStyle = (category) => {
  const styleMap = {
    '公司新闻': 'bg-gradient-to-r from-eco-500 to-eco-600 text-white',
    '现场考察': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
    '媒体报道': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
    '行业新闻': 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
    '技术动态': 'bg-gradient-to-r from-teal-500 to-teal-600 text-white',
    '展会动态': 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
  };
  return styleMap[category] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
};

// 计算要显示的分页按钮（最多显示5个）
const displayedPages = computed(() => {
  const pages = [];
  const maxVisible = 5;

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages.value, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return pages;
});

// 设置页面标题
useHead({
  title: '新闻中心 - 淼泽松源',
  meta: [
    { name: 'description', content: '了解淼泽松源最新的公司动态和行业资讯' }
  ]
});
</script>
