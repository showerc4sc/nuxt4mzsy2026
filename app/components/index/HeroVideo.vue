<template>
  <section class="relative top-0 left-0 right-0 h-screen overflow-hidden" style="height: 100vh; z-index: 100;">
    <!-- 视频容器 -->
    <div class="relative h-full" :style="{ transform: `translateY(${getParallaxOffset(0.3)}px)`, height: '100vh' }">
      <div class="w-full h-full relative" v-cloak>
        <!-- 视频背景 -->
        <div class="absolute inset-0 overflow-hidden">
          <video ref="heroVideo" class="absolute inset-0 w-full h-full object-cover scale-105" autoplay muted loop
            playsinline preload="auto" crossorigin="anonymous" @error="handleVideoError"
            @loadeddata="handleVideoLoaded">
            <source :src="videoUrl" type="video/mp4">
            您的浏览器不支持视频标签。
          </video>
          <!-- 视频加载失败时的备用背景 -->
          <div v-if="videoLoadFailed" class="absolute inset-0 bg-cover bg-center scale-105"
            style="background-image: url('https://picsum.photos/seed/mzsy-hero/1920/1080.jpg')">
          </div>
          <!-- 多层渐变遮罩增强视觉层次 -->
          <div class="absolute inset-0 bg-gradient-to-br from-eco-900/90 via-eco-800/70 to-blue-900/80 z-10"></div>
          <!-- 动态光效层 -->
          <div class="absolute inset-0 z-10 opacity-30 animate-background-shift"
            style="background: radial-gradient(ellipse at 30% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                   radial-gradient(ellipse at 70% 80%, rgba(14, 165, 233, 0.2) 0%, transparent 50%);">
          </div>
        </div>

        <!-- 装饰性网格 -->
        <div class="absolute inset-0 z-15 opacity-10 pointer-events-none"
          style="background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 60px 60px;">
        </div>

        <!-- 内容 -->
        <div class="relative z-20 h-full flex items-center justify-center">
          <div class="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <!-- 欢迎标签 -->
            <div class="mb-8 animate-fade-in-down">
              <div
                class="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-500 cursor-default group">
                <span class="w-2 h-2 bg-eco-400 rounded-full mr-2 animate-pulse"></span>
                欢迎来到{{ company.name }}
                <Icon name="heroicons:sparkles" class="w-4 h-4 ml-2 text-yellow-300 group-hover:rotate-12 transition-transform" />
              </div>
            </div>

            <!-- 主标题 -->
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-fade-in-up">
              <span class="block mb-2">{{ company.name }}</span>
              <span class="block text-2xl md:text-3xl lg:text-4xl font-light text-eco-200">{{ company.slogan }}</span>
            </h1>

            <!-- 描述文字 -->
            <p class="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s;">
              {{ company.description }}
            </p>

            <!-- CTA 按钮组 -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style="animation-delay: 0.4s;">
              <NuxtLink to="/products"
                class="group relative px-8 py-4 bg-gradient-to-r from-eco-500 to-eco-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden btn-glow">
                <span class="relative z-10 flex items-center">
                  <Icon name="heroicons:cube-transparent" class="w-5 h-5 mr-2" />
                  探索产品
                </span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-eco-600 to-eco-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </NuxtLink>

              <NuxtLink to="/contact"
                class="group px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center">
                <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2" />
                联系我们
                <Icon name="heroicons:arrow-right"
                  class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 滚动提示 -->
    <div class="absolute bottom-28 md:bottom-32 left-1/2 transform -translate-x-1/2 z-30">
      <div class="flex flex-col items-center animate-bounce-gentle cursor-pointer group" @click="scrollToContent">
        <span class="text-white/70 text-sm mb-2 font-medium group-hover:text-white transition-colors">向下滚动</span>
        <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20 group-hover:bg-white/20 transition-all">
          <Icon name="heroicons:chevron-down" class="w-5 h-5 text-white/90" />
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

// 获取运行时配置
const config = useRuntimeConfig();

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
  console.log('视频加载成功');
  videoLoadFailed.value = false;
};

// 视频错误处理
const handleVideoError = (event) => {
  console.error('视频加载失败:', event);
  console.error('视频错误详情:', event.target.error);
  videoLoadFailed.value = true;
};

// 获取视差滚动偏移量
const { getParallaxOffset } = useParallax();

// 使用API获取文章数据
const { data: articleData, pending, error } = await useAsyncData('hero-article', async () => {
  try {
    const response = await getArticleBySlug('miaozesongyuanshanghaike');
    console.log("API返回的文章数据:", response);
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
      summary: '致力于为全球客户提供优质的新能源解决方案'
    };
  }

  // 根据实际API返回的数据结构进行调整
  return {
    name: articleData.value.title || '淼泽松源',
    slogan: articleData.value.subtitle,
    description: articleData.value.summary
  };
});

// 在客户端初始化视频播放
onMounted(() => {
  // 尝试播放视频
  if (heroVideo.value) {
    heroVideo.value.play().catch(error => {
      console.error('视频播放失败:', error);
      videoLoadFailed.value = true;
    });
  }
});

/**
 * 滚动到内容区域
 */
const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
};
</script>

<style scoped>
/* 组件特定样式 */
</style>
