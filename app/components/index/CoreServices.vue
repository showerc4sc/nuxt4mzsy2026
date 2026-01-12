<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-5">
      <div class="parallax-element absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
        data-speed="0.2"></div>
      <div class="parallax-element absolute bottom-1/4 right-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"
        data-speed="0.3"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- 加载状态 -->
      <div v-if="pending" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-eco-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600">加载中...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <p class="text-gray-600">加载失败，请稍后重试</p>
      </div>

      <!-- 正常内容 -->
      <template v-else>
        <div class="text-center mb-16">
          <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-4">
            {{ sectionData.subtitle }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ sectionData.title }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ sectionData.summary }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="service in servicesData" :key="service.id"
            class="service-card group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden glow-element">
            <!-- 背景光效 -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-eco-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <!-- 图标容器 -->
            <div class="relative mb-6">
              <div
                class="absolute inset-0 bg-eco-100 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500 opacity-70">
              </div>
              <div
                class="relative bg-gradient-to-br from-eco-500 to-eco-600 rounded-2xl p-4 text-white shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:rotate-3 flex items-center justify-center">
                <Icon :name="`heroicons:${service.icon}`" class="w-8 h-8" />
                <h3 class="ml-2 text-sm font-bold">{{ service.title }}</h3>
              </div>
            </div>

            <!-- 内容 -->
            <div class="relative z-10">
              <p class="text-gray-600 leading-relaxed mb-6">
                {{ service.description }}
              </p>

              <!-- 特性标签 -->
              <div class="flex flex-wrap gap-2">
                <span v-for="feature in service.features" :key="feature"
                  class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium group-hover:bg-eco-100 group-hover:text-eco-700 transition-colors duration-300">
                  {{ feature }}
                </span>
              </div>
            </div>

            <!-- 悬浮效果 -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-eco-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500">
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
/**
 * 核心业务组件
 * 展示公司的四大核心业务服务
 */

// 导入API方法
import { getArticleBySlug } from '~/api/article';

// 导入动画组合式函数
import { useScrollAnimation, useParallax, useAdvancedAnimations } from '~/composables/useAnimations.js'
import { useMobileOptimization } from '~/composables/useMobileOptimization.js'

// 解构动画函数
const { addScrollAnimation, addStaggeredAnimation, cleanup } = useScrollAnimation()
const { scrollY, getParallaxOffset } = useParallax()
const {
  staggerAnimation,
  parallaxScroll
} = useAdvancedAnimations()

// 解构移动设备优化函数
const {
  isMobile,
  isTablet,
  isDesktop,
  devicePerformance,
  getAnimationConfig,
  addOptimizedScrollAnimation,
  addOptimizedParallax,
  addOptimizedParticles,
  addOptimizedMagneticEffect,
  addOptimizedFlip3D
} = useMobileOptimization()

/**
 * 使用API获取核心业务数据
 * slug为 index-core-biz
 */
const { data: articleData, pending, error } = await useAsyncData('core-services', async () => {
  try {
    const response = await getArticleBySlug('index-core-biz');
    return response || {};
  } catch (err) {
    console.error('获取核心业务数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 将API返回的数据映射为服务卡片格式
 */
const servicesData = computed(() => {
  if (!articleData.value || !articleData.value.attrList || !Array.isArray(articleData.value.attrList)) {
    return [];
  }

  return articleData.value.attrList.map(item => ({
    id: item._index,
    title: item.attrName || '',
    description: item.attrValue || '',
    icon: item.attrEx || 'beaker',
    features: item.attrTags || []
  }));
});

/**
 * 获取标题和描述
 */
const sectionData = computed(() => {
  if (!articleData.value) {
    return {
      title: '核心业务',
      subtitle: '我们的服务',
      summary: '我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案'
    };
  }

  return {
    title: articleData.value.title || '核心业务',
    subtitle: articleData.value.subtitle || '我们的服务',
    summary: articleData.value.summary || '我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案'
  };
});

onMounted(() => {
  nextTick(() => {
    // 获取动画配置
    const animConfig = getAnimationConfig({ threshold: 0.15, delay: 150 });

    // 服务部分动画 - 使用弹性增长效果
    const serviceCards = document.querySelectorAll('.service-card');

    // 根据设备类型选择动画
    if (isMobile.value) {
      // 移动设备使用简化动画
      staggerAnimation(serviceCards, 'animate-simple-slide-up', animConfig);
    } else {
      // 桌面设备使用弹性增长效果
      staggerAnimation(serviceCards, 'animate-elastic-grow', animConfig);
    }

    // 为服务卡片添加3D翻转效果
    serviceCards.forEach((card, index) => {
      // 延迟添加3D翻转效果
      setTimeout(() => {
        // 使用优化的3D翻转效果
        if (isMobile.value) {
          // 移动设备使用简化动画
          card.classList.add('animate-simple-scale');
        } else {
          // 桌面设备使用3D翻转效果
          addOptimizedFlip3D(card, 'y', 1200);
        }
      }, 1000 + index * 200);

      // 添加磁吸效果
      const magneticCleanup = addOptimizedMagneticEffect(card, 0.2, 80);
      card._magneticCleanup = magneticCleanup;
    });

    // 添加视差滚动效果（使用改进版）
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
      const direction = element.getAttribute('data-direction') || 'y';

      // 根据设备类型选择是否添加视差效果
      if (!isMobile.value) {
        const cleanup = parallaxScroll(element, speed, direction);
        // 存储清理函数
        element._parallaxCleanup = cleanup;
      }
    });
  });
});

// 组件卸载时清理动画
onUnmounted(() => {
  // 清理服务卡片的磁吸效果
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    if (card._magneticCleanup) {
      card._magneticCleanup();
    }
  });

  // 清理视差效果
  const parallaxElements = document.querySelectorAll('.parallax-element');
  parallaxElements.forEach(element => {
    if (element._parallaxCleanup) {
      element._parallaxCleanup();
    }
  });
});
</script>

<style scoped>
/* 组件特定样式 */
</style>
