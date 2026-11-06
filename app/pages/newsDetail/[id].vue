<template>
  <div class="min-h-screen bg-[#f8faf9] text-[#102b25]">
    <!-- 加载状态 -->
    <div v-if="loading" aria-label="正在加载文章详情">
      <section class="border-b border-[#dce5e1] bg-[#f1f5f3] pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-4xl animate-pulse">
            <div class="mb-6 flex items-center gap-4">
              <div class="h-4 w-20 rounded bg-[#d5e1dc]"></div>
              <div class="h-4 w-28 rounded bg-[#e0e8e4]"></div>
            </div>
            <div class="h-11 w-11/12 rounded bg-[#d5e1dc]"></div>
            <div class="mt-4 h-11 w-2/3 rounded bg-[#d5e1dc]"></div>
            <div class="mt-8 h-5 w-full rounded bg-[#e0e8e4]"></div>
          </div>
        </div>
      </section>

      <section class="py-12 sm:py-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-4xl animate-pulse">
            <div class="aspect-[16/8] rounded-md bg-[#e0e8e4]"></div>
            <div class="mx-auto mt-14 max-w-[44rem] space-y-5">
              <div class="h-4 w-full rounded bg-[#e0e8e4]"></div>
              <div class="h-4 w-full rounded bg-[#e0e8e4]"></div>
              <div class="h-4 w-5/6 rounded bg-[#e0e8e4]"></div>
              <div class="h-4 w-full rounded bg-[#e0e8e4]"></div>
              <div class="h-4 w-2/3 rounded bg-[#e0e8e4]"></div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error || !articleInfo" class="flex min-h-[70vh] items-center justify-center px-5 py-24">
      <div class="w-full max-w-lg border-y border-[#dce5e1] py-14 text-center" role="alert">
        <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-md bg-[#f6ecea]">
          <Icon name="heroicons:exclamation-triangle" class="h-8 w-8 text-[#a55348]" />
        </div>
        <h1 class="text-2xl font-semibold tracking-tight text-[#102b25]">加载失败</h1>
        <p class="mt-3 text-sm leading-7 text-[#61716c]">无法加载文章详情，请稍后重试</p>
        <NuxtLink
          to="/news"
          class="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-[#102b25] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#159a76] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159a76] focus-visible:ring-offset-2 active:translate-y-px"
        >
          <Icon name="heroicons:arrow-left" class="h-4 w-4" />
          返回新闻列表
        </NuxtLink>
      </div>
    </div>

    <!-- 正常内容 -->
    <article v-else>
      <!-- 文章标题 -->
      <header class="border-b border-[#dce5e1] bg-[#f1f5f3] pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="reveal mx-auto max-w-4xl">
            <NuxtLink
              to="/news"
              class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#52665e] transition-colors duration-300 hover:text-[#159a76] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159a76] focus-visible:ring-offset-4"
            >
              <Icon name="heroicons:arrow-left" class="h-4 w-4" />
              返回新闻列表
            </NuxtLink>
            <div class="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span class="font-medium tracking-wide text-[#159a76]">{{ articleData.category }}</span>
              <time class="font-mono text-xs tabular-nums tracking-wide text-[#61716c] sm:text-sm">{{ articleData.date }}</time>
            </div>
            <h1 class="text-balance text-3xl font-semibold leading-tight tracking-tight text-[#102b25] sm:text-4xl lg:text-5xl">
              {{ articleData.title }}
            </h1>
            <p v-if="articleData.summary" class="mt-7 max-w-3xl text-base leading-8 text-[#52665e] sm:text-lg">
              {{ articleData.summary }}
            </p>
          </div>
        </div>
      </header>

      <!-- 文章内容区域 -->
      <section class="py-12 sm:py-16 lg:py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-4xl">
            <!-- 文章封面图 -->
            <figure v-if="articleData.image" class="reveal mb-12 overflow-hidden rounded-md bg-[#e7eeeb] sm:mb-16">
              <img
                :src="articleData.image"
                :alt="articleData.title"
                class="h-auto max-h-[36rem] w-full object-cover"
              />
            </figure>

            <div class="reveal reveal-delay-1 mx-auto max-w-[44rem]">
              <!-- 作者信息 -->
              <div class="mb-10 flex items-center gap-3 border-b border-[#dce5e1] pb-6 sm:mb-12">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e6f0ec]">
                  <Icon name="heroicons:user" class="h-5 w-5 text-[#159a76]" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-[#102b25]">{{ articleData.author || '淼泽松源' }}</div>
                  <time class="mt-0.5 block font-mono text-xs tabular-nums text-[#61716c]">{{ articleData.date }}</time>
                </div>
              </div>

              <!-- 文章内容 -->
              <div v-if="articleData.content" class="article-content" v-html="articleData.content"></div>
              <div v-else class="border-y border-[#dce5e1] py-12 text-center" role="status">
                <Icon name="heroicons:document-text" class="mx-auto h-8 w-8 text-[#159a76]" />
                <p class="mt-4 text-sm text-[#61716c]">暂无正文内容</p>
              </div>
            </div>

            <!-- 返回按钮 -->
            <div class="reveal reveal-delay-2 mx-auto mt-14 max-w-[44rem] border-t border-[#dce5e1] pt-8 sm:mt-20">
              <NuxtLink
                to="/news"
                class="group inline-flex min-h-11 items-center gap-2 rounded-md border border-[#b9c9c2] bg-white px-5 py-3 text-sm font-semibold text-[#102b25] transition-colors duration-300 hover:border-[#159a76] hover:text-[#159a76] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159a76] focus-visible:ring-offset-2 active:translate-y-px"
              >
                <Icon name="heroicons:arrow-left" class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                返回新闻列表
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
import { getArticleById } from '~/api/article';

// 滚动入场动效
useReveal();

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
    image: coverUrl,
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
.article-content {
  color: #354b43;
  font-size: 1.0625rem;
  line-height: 2;
  overflow-wrap: break-word;
  text-rendering: optimizeLegibility;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4) {
  color: #102b25;
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.45;
  text-wrap: balance;
}

.article-content :deep(h1) {
  font-size: 1.75rem;
  margin: 3rem 0 1.25rem;
}

.article-content :deep(h2) {
  font-size: 1.5rem;
  margin: 2.75rem 0 1.125rem;
}

.article-content :deep(h3) {
  font-size: 1.25rem;
  margin: 2.25rem 0 1rem;
}

.article-content :deep(h4) {
  font-size: 1.125rem;
  margin: 2rem 0 0.875rem;
}

.article-content :deep(p) {
  margin: 0 0 1.5rem;
  text-wrap: pretty;
}

.article-content :deep(a) {
  color: #12805f;
  text-decoration: underline;
  text-decoration-color: rgb(21 154 118 / 0.4);
  text-underline-offset: 0.25em;
}

.article-content :deep(a:hover) {
  text-decoration-color: currentColor;
}

.article-content :deep(strong) {
  color: #102b25;
  font-weight: 600;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 0 0 1.75rem;
  padding-left: 1.5rem;
}

.article-content :deep(ul) {
  list-style-type: disc;
}

.article-content :deep(ol) {
  list-style-type: decimal;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;
}

.article-content :deep(li::marker) {
  color: #159a76;
}

.article-content :deep(img) {
  display: block;
  height: auto;
  margin: 2.25rem auto;
  max-width: 100%;
  border-radius: 0.375rem;
}

.article-content :deep(figure) {
  margin: 2.25rem 0;
}

.article-content :deep(figcaption) {
  margin-top: 0.75rem;
  color: #61716c;
  font-size: 0.875rem;
  line-height: 1.75;
  text-align: center;
}

.article-content :deep(blockquote) {
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  border-radius: 0.375rem;
  background: #edf3f0;
  color: #40564d;
}

.article-content :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.article-content :deep(hr) {
  margin: 3rem 0;
  border: 0;
  border-top: 1px solid #dce5e1;
}

.article-content :deep(table) {
  display: block;
  width: 100%;
  margin: 2rem 0;
  overflow-x: auto;
  border-collapse: collapse;
  font-size: 0.9375rem;
  -webkit-overflow-scrolling: touch;
}

.article-content :deep(th),
.article-content :deep(td) {
  min-width: 7rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #dce5e1;
  text-align: left;
}

.article-content :deep(th) {
  background: #edf3f0;
  color: #102b25;
  font-weight: 600;
}

.article-content :deep(pre) {
  margin: 2rem 0;
  padding: 1.25rem;
  overflow-x: auto;
  border-radius: 0.375rem;
  background: #102b25;
  color: #e8f0ec;
  font-size: 0.875rem;
  line-height: 1.75;
}

.article-content :deep(iframe),
.article-content :deep(video) {
  max-width: 100%;
}

.article-content :deep(> :first-child) {
  margin-top: 0;
}

.article-content :deep(> :last-child) {
  margin-bottom: 0;
}

@media (min-width: 640px) {
  .article-content {
    font-size: 1.125rem;
  }

  .article-content :deep(h2) {
    font-size: 1.625rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .article-content :deep(a) {
    transition: none;
  }
}
</style>
