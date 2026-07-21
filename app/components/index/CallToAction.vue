<template>
  <section class="relative overflow-hidden bg-white py-32 md:py-40">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <!-- 加载状态 -->
        <div v-if="pending" class="py-20">
          <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-eco-200 border-t-eco-800"></div>
          <p class="mt-4 text-gray-500">加载中...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="py-20">
          <p class="text-gray-500">加载失败，请稍后重试</p>
        </div>

        <!-- 正常内容（居中 CTA，允许的居中场景） -->
        <template v-else>
          <!-- 眉标（眉标 3） -->
          <div class="reveal mb-6 inline-flex items-center text-sm font-medium text-eco-800">
            <span class="mr-3 h-px w-8 bg-eco-400"></span>
            {{ sectionData.subtitle || '联系我们' }}
            <span class="ml-3 h-px w-8 bg-eco-400"></span>
          </div>

          <!-- 标题 -->
          <h2 class="reveal reveal-delay-1 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {{ sectionData.title || '准备好开启绿色能源之旅了吗？' }}
          </h2>

          <!-- 描述 -->
          <p class="reveal reveal-delay-2 mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-gray-600 md:text-xl">
            {{ sectionData.summary || '联系我们的专业团队，了解更多关于新能源解决方案的信息，让我们一起为可持续发展贡献力量' }}
          </p>

          <!-- CTA 按钮组：两个不同意图（咨询 vs 浏览产品） -->
          <div class="reveal reveal-delay-3 mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <NuxtLink
              to="/contact"
              class="group inline-flex items-center gap-3 rounded-full bg-eco-800 pl-7 pr-2 py-2.5 text-base font-semibold text-white shadow-[0_8px_32px_rgba(22,101,52,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 hover:shadow-[0_12px_40px_rgba(22,101,52,0.35)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-eco-400 focus-visible:ring-offset-2"
            >
              <Icon name="heroicons:chat-bubble-left-right" class="h-5 w-5" />
              <span>立即咨询</span>
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <Icon name="heroicons:arrow-right" class="h-4 w-4" />
              </span>
            </NuxtLink>

            <NuxtLink
              to="/products"
              class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-900 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-eco-300 hover:bg-eco-50 hover:text-eco-900 active:scale-[0.98]"
            >
              <Icon name="heroicons:cube-transparent" class="h-5 w-5" />
              探索产品
            </NuxtLink>
          </div>

          <!-- 联系信息卡片：Double-Bezel，统一 hover 抬升 -->
          <div class="reveal reveal-delay-4 mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <!-- 服务热线 -->
            <div class="bezel group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
              <div class="bezel-inner flex items-center gap-4 p-5">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-eco-50 text-eco-800 transition-colors duration-500 group-hover:bg-eco-800 group-hover:text-white">
                  <Icon name="heroicons:phone" class="h-5 w-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="mb-0.5 text-xs text-gray-400">服务热线</div>
                  <div class="font-mono font-semibold tabular-nums text-gray-900 break-all">{{ companyTel || '400-888-8888' }}</div>
                </div>
              </div>
            </div>

            <!-- 电子邮箱 -->
            <div class="bezel group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
              <div class="bezel-inner flex items-center gap-4 p-5">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-eco-50 text-eco-800 transition-colors duration-500 group-hover:bg-eco-800 group-hover:text-white">
                  <Icon name="heroicons:envelope" class="h-5 w-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="mb-0.5 text-xs text-gray-400">电子邮箱</div>
                  <div class="font-mono text-sm font-semibold text-gray-900 break-all">{{ companyEmail || 'contact@mzsy.com' }}</div>
                </div>
              </div>
            </div>

            <!-- 公司地址 -->
            <div class="bezel group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
              <div class="bezel-inner flex items-center gap-4 p-5">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-eco-50 text-eco-800 transition-colors duration-500 group-hover:bg-eco-800 group-hover:text-white">
                  <Icon name="heroicons:map-pin" class="h-5 w-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="mb-0.5 text-xs text-gray-400">公司地址</div>
                  <div class="text-sm font-semibold text-gray-900 break-words">{{ companyAddress || '上海市浦东新区' }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 行动号召组件
 * 用于显示联系我们的 CTA 区域
 */

// 导入API方法
import { getArticleBySlug } from '~/api/article';

// 导入公司信息 composable
import { useCompanyInfo } from '~/composables/useCompanyInfo.js';

// 获取公司信息
const { companyAddress, companyTel, companyEmail } = useCompanyInfo();

/**
 * 使用API获取CTA区域数据
 * slug为 index-contact
 */
const { data: articleData, pending, error } = await useAsyncData(
  'cta-section',
  async () => {
    try {
      const response = await getArticleBySlug('index-contact');
      return response || {};
    } catch (err) {
      console.error('获取CTA区域数据失败:', err);
      return {};
    }
  },
  {
    server: true
  }
);

/**
 * CTA区域数据
 */
const sectionData = computed(() => ({
  title: articleData.value?.title || '准备好开启绿色能源之旅了吗？',
  subtitle: articleData.value?.subtitle || '联系我们',
  summary:
    articleData.value?.summary ||
    '联系我们的专业团队，了解更多关于新能源解决方案的信息，让我们一起为可持续发展贡献力量'
}));
</script>

<style scoped>
/* 组件特定样式 */
</style>
