<template>
  <section class="relative overflow-hidden bg-[#f4f7f5] py-20 md:py-28">
    <div class="site-container">
      <div v-if="pending" class="grid gap-8 lg:grid-cols-12" aria-label="新闻加载中">
        <div class="skeleton h-[430px] rounded-2xl lg:col-span-7"></div>
        <div class="space-y-5 lg:col-span-5">
          <div class="skeleton h-8 w-48 rounded"></div>
          <div v-for="i in 4" :key="i" class="skeleton h-20 rounded-xl"></div>
        </div>
      </div>

      <template v-else>
        <div class="reveal mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="eyebrow">NEWS & INSIGHTS</p>
            <h2 class="section-heading">{{ categoryData?.title || '新闻动态' }}</h2>
            <p class="section-copy">{{ categoryData?.subtitle || '了解我们的最新动态与行业资讯' }}</p>
          </div>
          <NuxtLink to="/news" class="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-[#276c56]">
            查看全部新闻
            <Icon name="heroicons:arrow-up-right" class="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </NuxtLink>
        </div>

        <div v-if="newsData.length" class="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div class="reveal lg:col-span-7" v-cloak>
            <div class="overflow-hidden">
              <div class="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" :style="{ transform: `translateX(-${newsSlide * 100}%)` }">
                <article v-for="news in featuredNews" :key="news.id" class="w-full shrink-0">
                  <NuxtLink :to="`/newsDetail/${news.id}`" class="group block">
                    <div class="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#dfe8e2]">
                      <img :src="news.image" :alt="news.title" class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" onerror="this.src='https://picsum.photos/seed/news/800/500.jpg'" />
                      <span class="absolute right-4 top-4 rounded-lg bg-[#0b2d24]/75 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-sm">{{ newsSlide + 1 }} / {{ featuredNews.length }}</span>
                    </div>
                    <div class="pt-6">
                      <div class="mb-3 flex flex-wrap items-center gap-3 text-xs text-[#64776e]">
                        <span class="font-medium text-[#267258]">{{ news.category_title || '公司新闻' }}</span>
                        <time class="font-mono tabular-nums">{{ news.date }}</time>
                      </div>
                      <h3 class="line-clamp-2 text-2xl font-semibold leading-snug tracking-tight text-[#15382e] transition-colors group-hover:text-[#19705a] md:text-3xl">{{ news.title }}</h3>
                      <p class="mt-3 line-clamp-2 max-w-2xl text-sm leading-7 text-[#63756c]">{{ news.summary }}</p>
                    </div>
                  </NuxtLink>
                </article>
              </div>
            </div>

            <div v-if="featuredNews.length > 1" class="mt-7 flex items-center justify-between border-t border-[#dbe5df] pt-5">
              <div class="flex gap-2">
                <button v-for="(_, index) in featuredNews" :key="index" type="button" class="h-1.5 rounded-full transition-all duration-300" :class="newsSlide === index ? 'w-8 bg-[#26765d]' : 'w-4 bg-[#c1d0c8] hover:bg-[#89aa9a]'" :aria-label="`切换到第${index + 1}条新闻`" :aria-current="newsSlide === index ? 'true' : undefined" @click="newsSlide = index"></button>
              </div>
              <div class="flex gap-2">
                <button type="button" class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d5e1da] text-[#385b4d] transition-colors hover:bg-white" aria-label="上一条新闻" @click="prevNewsSlide"><Icon name="heroicons:arrow-left" class="h-4 w-4" /></button>
                <button type="button" class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d5e1da] text-[#385b4d] transition-colors hover:bg-white" aria-label="下一条新闻" @click="nextNewsSlide"><Icon name="heroicons:arrow-right" class="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          <div class="reveal reveal-delay-1 lg:col-span-5">
            <div class="mb-2 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-[#193d32]">最新发布</h3>
              <span class="font-mono text-xs text-[#829087]">{{ companyNews.length }} 条</span>
            </div>
            <div class="border-t border-[#ccdad2]">
              <NuxtLink v-for="news in companyNews.slice(0, 5)" :key="news.id" :to="`/newsDetail/${news.id}`" class="group flex gap-5 border-b border-[#dce5df] py-5">
                <time class="w-14 shrink-0 pt-0.5 font-mono text-[11px] leading-5 tabular-nums text-[#7b8c83]">{{ news.date }}</time>
                <div class="min-w-0 flex-1">
                  <h4 class="line-clamp-2 text-[15px] font-medium leading-6 text-[#29483c] transition-colors group-hover:text-[#17745b]">{{ news.title }}</h4>
                  <span class="mt-2 block text-xs text-[#829087]">{{ news.category_title || '公司新闻' }}</span>
                </div>
                <Icon name="heroicons:arrow-up-right" class="mt-1 h-4 w-4 shrink-0 text-[#8a9c92] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#26765d]" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-else class="rounded-2xl border border-dashed border-[#cbdad1] bg-white/60 px-6 py-20 text-center">
          <Icon name="heroicons:newspaper" class="mx-auto h-9 w-9 text-[#8aab9b]" />
          <h3 class="mt-4 text-lg font-semibold text-[#28493c]">暂无新闻</h3>
          <p class="mt-2 text-sm text-[#73857b]">最新动态正在整理中，请稍后再来查看</p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { getCategoryBySlug } from '~/api/category';
import { getArticleListByCategorySlug } from '~/api/article';

const { data: categoryData, pending } = await useAsyncData('category-news', () =>
  getCategoryBySlug('news'), {
  transform: (response) => response || null
});

const { data: articleResponse } = await useAsyncData('news-articles', () =>
  getArticleListByCategorySlug({ category_slug: 'news', recursive: true, limit: 10 }), {
  transform: (response) => response || { rows: [], total: 0 }
});

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

const featuredNews = computed(() => newsData.value.slice(0, 4));
const companyNews = computed(() => newsData.value);
const newsSlide = ref(0);
const nextNewsSlide = () => {
  if (!featuredNews.value.length) return;
  newsSlide.value = (newsSlide.value + 1) % featuredNews.value.length;
};
const prevNewsSlide = () => {
  if (!featuredNews.value.length) return;
  newsSlide.value = newsSlide.value === 0 ? featuredNews.value.length - 1 : newsSlide.value - 1;
};

let newsSlideInterval = null;
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    newsSlideInterval = setInterval(nextNewsSlide, 7000);
  }
});
onUnmounted(() => {
  if (newsSlideInterval) clearInterval(newsSlideInterval);
});
</script>
