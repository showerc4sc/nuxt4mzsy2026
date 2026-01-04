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
          <div class="absolute inset-0 bg-gradient-to-r from-eco-800/85 to-eco-600/75 z-10"></div>
        </div>

        <!-- 内容 -->
        <div class="relative z-20 h-full flex items-center justify-center">
          <div class="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in-up">
            <div class="mb-8">
              <div
                class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                欢迎来到{{ company.name }}
              </div>
            </div>
            <h1 class="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              {{ company.name }}
            </h1>
            <p class="text-xl md:text-3xl text-eco-100 font-light mb-8 leading-relaxed">
              {{ company.slogan }}
            </p>
            <p class="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {{ company.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 滚动提示 -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
      <div class="flex flex-col items-center animate-bounce">
        <span class="text-white/70 text-sm mb-2 font-medium">向下滚动</span>
        <div class="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
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
</script>

<style scoped>
/* 组件特定样式 */
</style>
