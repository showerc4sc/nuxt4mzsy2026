<template>
  <div class="min-h-screen bg-[#f8faf9] text-[#102b25]">
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
      <section class="py-14 sm:py-20 lg:py-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-6xl">
            <div class="mb-8 flex items-end justify-between gap-4 border-b border-[#cfdad5] pb-5 sm:mb-10">
              <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">新闻动态</h2>
              <p v-if="!pending && totalNews > 0" class="shrink-0 text-sm text-[#61716c]">
                共 <span class="font-mono tabular-nums text-[#159a76]">{{ totalNews }}</span> 篇
              </p>
            </div>

            <!-- 加载状态 -->
            <div v-if="pending" class="divide-y divide-[#dce5e1]" aria-label="正在加载新闻">
              <div v-for="i in 4" :key="i" class="flex animate-pulse gap-5 py-7 sm:gap-8 sm:py-8">
                <div class="hidden w-28 shrink-0 space-y-3 sm:block">
                  <div class="h-3 w-20 rounded bg-[#dce5e1]"></div>
                  <div class="h-3 w-14 rounded bg-[#e7eeeb]"></div>
                </div>
                <div class="min-w-0 flex-1 space-y-4">
                  <div class="h-3 w-16 rounded bg-[#e7eeeb]"></div>
                  <div class="h-6 w-3/4 rounded bg-[#dce5e1]"></div>
                  <div class="h-4 w-full rounded bg-[#e7eeeb]"></div>
                  <div class="h-4 w-2/3 rounded bg-[#e7eeeb]"></div>
                </div>
                <div class="hidden h-32 w-48 shrink-0 rounded-md bg-[#e7eeeb] md:block"></div>
              </div>
            </div>

            <!-- 编辑式新闻列表 -->
            <div v-else-if="currentNews.length > 0" class="divide-y divide-[#dce5e1]">
              <NuxtLink
                v-for="(news, index) in currentNews"
                :key="news.id"
                :to="`/newsDetail/${news.id}`"
                class="reveal group -mx-3 flex flex-col gap-5 px-3 py-7 transition-colors duration-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#159a76] sm:-mx-5 sm:flex-row sm:gap-8 sm:px-5 sm:py-9"
                :class="`reveal-delay-${Math.min((index % 3) + 1, 5)}`"
              >
                <!-- 日期 -->
                <div class="flex shrink-0 items-center justify-between gap-3 sm:w-28 sm:flex-col sm:items-start sm:justify-start sm:gap-3 sm:pt-1">
                  <time class="font-mono text-xs tabular-nums tracking-wide text-[#61716c] sm:text-sm">{{ news.date }}</time>
                  <span class="text-xs font-medium tracking-wide text-[#159a76]">{{ news.category }}</span>
                </div>

                <!-- 新闻内容 -->
                <div class="min-w-0 flex-1">
                  <h3 class="text-balance text-xl font-semibold leading-snug tracking-tight text-[#102b25] transition-colors duration-300 group-hover:text-[#159a76] sm:text-2xl">
                    {{ news.title }}
                  </h3>
                  <p class="mt-3 line-clamp-2 max-w-3xl text-sm leading-7 text-[#61716c] sm:text-[15px]">
                    {{ news.summary }}
                  </p>
                  <span class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#102b25]">
                    阅读更多
                    <Icon name="heroicons:arrow-right" class="h-4 w-4 text-[#159a76] transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

                <!-- 新闻图片 -->
                <div class="order-first h-48 overflow-hidden rounded-md bg-[#e7eeeb] sm:order-none sm:h-32 sm:w-44 sm:shrink-0 lg:w-52">
                  <img
                    :src="news.image"
                    :alt="news.title"
                    class="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                    loading="lazy"
                    onerror="this.src='https://picsum.photos/seed/news/800/500.jpg'"
                  />
                </div>
              </NuxtLink>
            </div>

            <!-- 空状态 -->
            <div v-else class="border-y border-[#dce5e1] px-5 py-20 text-center sm:py-24" role="status">
              <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-md bg-[#edf3f0]">
                <Icon name="heroicons:newspaper" class="h-8 w-8 text-[#159a76]" />
              </div>
              <h3 class="text-xl font-semibold text-[#102b25]">暂无新闻</h3>
              <p class="mx-auto mt-3 max-w-md text-sm leading-7 text-[#61716c]">该分类下暂时没有新闻内容，请选择其他分类或稍后再来查看</p>
            </div>

            <!-- 分页 -->
            <nav v-if="totalPages > 1" class="mt-12 flex flex-wrap items-center justify-center gap-2 sm:mt-16" aria-label="新闻分页">
              <button
                type="button"
                @click="currentPage > 1 && currentPage--"
                :disabled="currentPage === 1"
                aria-label="上一页"
                class="mr-2 inline-flex h-10 items-center gap-1.5 rounded-md border border-[#cfdad5] bg-white px-3 text-sm font-medium text-[#102b25] transition-colors duration-300 hover:border-[#159a76] hover:text-[#159a76] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159a76] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-[#dce5e1] disabled:bg-transparent disabled:text-[#91a09a] sm:px-4"
              >
                <Icon name="heroicons:chevron-left" class="h-4 w-4" />
                上一页
              </button>

              <button
                v-for="page in displayedPages"
                :key="page"
                type="button"
                @click="currentPage = page"
                :aria-label="`第 ${page} 页`"
                :aria-current="currentPage === page ? 'page' : undefined"
                class="h-10 w-10 rounded-md border text-sm font-medium tabular-nums transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159a76] focus-visible:ring-offset-2"
                :class="currentPage === page
                  ? 'border-[#102b25] bg-[#102b25] text-white'
                  : 'border-[#cfdad5] bg-white text-[#42554e] hover:border-[#159a76] hover:text-[#159a76]'"
              >
                {{ page }}
              </button>

              <button
                type="button"
                @click="currentPage < totalPages && currentPage++"
                :disabled="currentPage === totalPages"
                aria-label="下一页"
                class="ml-2 inline-flex h-10 items-center gap-1.5 rounded-md border border-[#cfdad5] bg-white px-3 text-sm font-medium text-[#102b25] transition-colors duration-300 hover:border-[#159a76] hover:text-[#159a76] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159a76] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-[#dce5e1] disabled:bg-transparent disabled:text-[#91a09a] sm:px-4"
              >
                下一页
                <Icon name="heroicons:chevron-right" class="h-4 w-4" />
              </button>
            </nav>
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

// 滚动入场动效
useReveal();

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
