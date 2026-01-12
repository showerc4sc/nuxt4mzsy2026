<template>
  <section class="py-20 bg-gradient-to-br from-eco-600 via-eco-700 to-blue-800 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-10">
      <div class="parallax-element absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"
        data-speed="0.15"></div>
      <div class="parallax-element absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"
        data-speed="0.25"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-12">
        <div
          class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
          {{ sectionData.subtitle }}
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ sectionData.title }}
        </h2>
        <p class="text-lg text-white/80 max-w-2xl mx-auto">
          {{ sectionData.summary }}
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="stat in statisticsData" :key="stat.id" class="stat-card text-center group">
          <div class="relative mb-4">
            <div
              class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="relative text-5xl md:text-6xl font-bold text-white tabular-nums">
              <span class="stat-number" :data-target="stat.value" :data-suffix="stat.suffix">0</span>
            </div>
          </div>
          <div class="text-lg text-white/90 font-medium">{{ stat.label }}</div>
          <div
            class="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto group-hover:bg-white/60 transition-colors duration-300">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 数据统计组件
 * 展示公司的核心数据和成就
 */

// 导入API方法
import { getArticleBySlug } from '~/api/article';

// 导入动画组合式函数
import { useScrollAnimation, useParallax, useNumberAnimation, useAdvancedAnimations } from '~/composables/useAnimations.js'
import { useMobileOptimization } from '~/composables/useMobileOptimization.js'

// 解构动画函数
const { addScrollAnimation, addStaggeredAnimation, cleanup } = useScrollAnimation()
const { animateNumber } = useNumberAnimation()
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
 * 使用API获取数据统计信息
 * slug为 index-shujushuohua
 */
const { data: articleData, pending, error } = await useAsyncData('data-statistics', async () => {
  try {
    const response = await getArticleBySlug('index-shujushuohua');
    return response || {};
  } catch (err) {
    console.error('获取数据统计失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * 解析数值和后缀
 * 例如：从 "50+" 中解析出 50 和 "+"
 */
const parseValueAndSuffix = (valueStr) => {
  if (!valueStr) return { value: 0, suffix: '' };

  // 匹配数字部分（支持小数）
  const match = valueStr.match(/^(\d+(\.\d+)?)(.*)$/);
  if (match) {
    return {
      value: parseFloat(match[1]) || 0,
      suffix: match[3] || ''
    };
  }

  return { value: 0, suffix: valueStr };
};

/**
 * 将API返回的数据映射为统计卡片格式
 */
const statisticsData = computed(() => {
  if (!articleData.value || !articleData.value.attrList || !Array.isArray(articleData.value.attrList)) {
    return [];
  }

  return articleData.value.attrList.map(item => {
    const { value, suffix } = parseValueAndSuffix(item.attrValue);
    return {
      id: item._index,
      label: item.attrName || '',
      value: value,
      suffix: suffix
    };
  });
});

/**
 * 获取标题和描述
 */
const sectionData = computed(() => {
  if (!articleData.value) {
    return {
      title: '数据说话',
      subtitle: '我们的成就',
      summary: '多年的行业积累，我们用实力和成果赢得客户信赖'
    };
  }

  return {
    title: articleData.value.title || '数据说话',
    subtitle: articleData.value.subtitle || '我们的成就',
    summary: articleData.value.summary || '多年的行业积累，我们用实力和成果赢得客户信赖'
  };
});

onMounted(() => {
  nextTick(() => {
    // 数据统计部分动画 - 使用缩放旋转效果
    const statCards = document.querySelectorAll('.stat-card');

    // 根据设备类型选择动画
    if (isMobile.value) {
      // 移动设备使用简化动画
      staggerAnimation(statCards, 'animate-simple-scale', { threshold: 0.1, delay: 180 });
    } else {
      // 桌面设备使用缩放旋转效果
      staggerAnimation(statCards, 'animate-zoom-in-rotate', { threshold: 0.1, delay: 180 });
    }

    // 为数据统计部分添加数字递增动画
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
      // 创建观察器，当元素进入视口时触发数字动画
      const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const targetValue = parseInt(entry.target.getAttribute('data-target'));
            const suffix = entry.target.getAttribute('data-suffix') || '';

            // 根据设备性能调整动画持续时间
            const duration = isMobile.value ? 1000 : 2000;
            animateNumber(entry.target, targetValue, duration, suffix);
          }
        });
      }, { threshold: 0.5 });

      statNumbers.forEach(element => {
        numberObserver.observe(element);
      });
    }

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
