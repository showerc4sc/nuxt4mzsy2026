<template>
  <section class="relative min-h-[100dvh] w-full overflow-hidden bg-slate-950">
    <!-- 视频背景 -->
    <div class="absolute inset-0">
      <video
        ref="heroVideo"
        class="absolute inset-0 h-full w-full object-cover"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        crossorigin="anonymous"
        @error="handleVideoError"
        @loadeddata="handleVideoLoaded"
      >
        <source :src="videoUrl" type="video/mp4" />
        您的浏览器不支持视频标签。
      </video>

      <!-- 视频加载失败时的备用背景 -->
      <div
        v-if="videoLoadFailed"
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://picsum.photos/seed/mzsy-hero/1920/1080.jpg')"
      ></div>

      <!-- 品牌色调遮罩：左侧深、右侧透，保证文字对比度 -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-eco-900/60 to-slate-950/30"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40"></div>
    </div>

    <!-- 内容 -->
    <div class="relative z-10 flex min-h-[100dvh] items-center">
      <div class="container mx-auto px-4 pt-24 pb-24 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <!-- 欢迎标签（页面唯一眉标之一）：圆角胶囊 -->
          <div class="reveal reveal-delay-1 mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <Icon name="heroicons:sparkles" class="mr-2 h-4 w-4 text-eco-300" />
            <span class="text-sm font-medium text-white/90">欢迎来到 {{ company.name }}</span>
          </div>

          <!-- 主标题 -->
          <h1 class="reveal reveal-delay-2 text-4xl font-semibold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-6xl">
            <span class="block">{{ company.name }}</span>
            <span class="mt-3 block text-xl font-light tracking-tight text-eco-200 md:text-2xl lg:text-3xl">{{ company.slogan }}</span>
          </h1>

          <!-- 描述文字 -->
          <p class="reveal reveal-delay-3 mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/80 md:text-xl">
            {{ company.description }}
          </p>

          <!-- CTA 按钮组：Button-in-Button 架构（§4.B）+ 磁吸物理（§5.B） -->
          <div class="reveal reveal-delay-4 mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <NuxtLink
              to="/products"
              class="group inline-flex items-center gap-3 rounded-full bg-eco-800 pl-6 pr-2 py-2 text-base font-semibold text-white shadow-[0_8px_32px_rgba(22,101,52,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 hover:shadow-[0_12px_40px_rgba(22,101,52,0.35)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-eco-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Icon name="heroicons:cube-transparent" class="h-5 w-5" />
              <span>探索产品</span>
              <!-- 嵌套圆形尾图标：hover 时对角位移 + 放大（内部动张力） -->
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <Icon name="heroicons:arrow-right" class="h-4 w-4" />
              </span>
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/50 hover:bg-white/10 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Icon name="heroicons:chat-bubble-left-right" class="h-5 w-5" />
              立即咨询
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 英雄视频区域组件
 * 显示公司介绍视频背景和欢迎信息
 */

// 导入API方法
import { getArticleBySlug } from '~/api/article';

// 构建视频绝对路径
const videoUrl = computed(() => {
  if (process.client) {
    return `${window.location.origin}/video/index.mp4`;
  }
  return '/video/index.mp4';
});

// 视频引用
const heroVideo = ref(null);

// 视频加载失败标志
const videoLoadFailed = ref(false);

// 视频加载成功处理
const handleVideoLoaded = () => {
  videoLoadFailed.value = false;
};

// 视频错误处理
const handleVideoError = (event) => {
  console.error('视频加载失败:', event);
  videoLoadFailed.value = true;
};

// 使用API获取文章数据
const { data: articleData } = await useAsyncData('hero-article', async () => {
  try {
    const response = await getArticleBySlug('miaozesongyuanshanghaike');
    return response || {};
  } catch (err) {
    console.error('获取文章数据失败:', err);
    return {};
  }
});

// 从文章数据中提取公司信息
const company = computed(() => {
  if (!articleData.value) {
    return {
      name: '淼泽松源',
      slogan: '绿色能源，智慧未来',
      description: '致力于为全球客户提供优质的新能源解决方案'
    };
  }

  return {
    name: articleData.value.title || '淼泽松源',
    slogan: articleData.value.subtitle,
    description: articleData.value.summary
  };
});

// 在客户端初始化视频播放
onMounted(() => {
  if (heroVideo.value) {
    heroVideo.value.play().catch((error) => {
      console.error('视频播放失败:', error);
      videoLoadFailed.value = true;
    });
  }
});
</script>

<style scoped>
/* 组件特定样式 */
</style>
