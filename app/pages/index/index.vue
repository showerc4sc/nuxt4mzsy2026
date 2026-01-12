<template>
  <div>
    <!-- 滚动进度指示器 -->
    <div
      class="scroll-progress fixed top-0 left-0 h-1 bg-gradient-to-r from-eco-500 to-eco-600 z-[55] transition-all duration-300">
    </div>

    <!-- 鼠标跟随效果 -->
    <div class="pointer-events-none fixed inset-0 z-[40] overflow-hidden">
      <div class="absolute w-96 h-96 rounded-full bg-eco-500/10 blur-3xl transition-transform duration-300 ease-out"
        :style="{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() / 1000) * 0.1})`
        }"></div>
    </div>

    <!-- 鼠标跟随效果 -->
    <div class="pointer-events-none fixed inset-0 z-[40] overflow-hidden">
      <div class="mouse-follow absolute top-1/4 left-1/4 w-64 h-64 bg-eco-500/10 rounded-full blur-3xl"
        data-speed="0.02" data-max-distance="30"></div>
      <div class="mouse-follow absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        data-speed="0.03" data-max-distance="40"></div>
    </div>

    <!-- 英雄视频区域 -->
    <IndexHeroVideo />

    <!-- 页面内容容器 -->
    <div class="relative z-10">
      <!-- 新闻中心 -->
      <IndexNewsCenter />

      <!-- 产品展示 -->
      <IndexProductShowcase />

      <!-- 公司优势 -->
      <IndexCompanyAdvantage />

      <!-- 核心业务 -->
      <IndexCoreServices />

      <!-- 数据统计 -->
      <IndexDataStatistics />

      <!-- 行动号召 -->
      <IndexCallToAction />
    </div>
  </div>
</template>

<script setup>
// 导入动画组合式函数
import { useScrollAnimation, useMouseFollower, useParallax, useAdvancedAnimations } from '~/composables/useAnimations.js'
import { useMobileOptimization } from '~/composables/useMobileOptimization.js'

// 解构动画函数
const { addScrollAnimation, addStaggeredAnimation, cleanup } = useScrollAnimation()
const { scrollY, getParallaxOffset } = useParallax()
const {
  typewriterEffect,
  waveAnimation,
  staggerAnimation,
  parallaxScroll,
  mouseFollow,
  scrollProgress,
  flip3D,
  magneticEffect,
  parallaxLayers,
  particleEffect
} = useAdvancedAnimations()

// 鼠标位置
const mousePosition = reactive({ x: 50, y: 50 })

// 监听鼠标移动
onMounted(() => {
  const handleMouseMove = (e) => {
    mousePosition.x = (e.clientX / window.innerWidth) * 100
    mousePosition.y = (e.clientY / window.innerHeight) * 100
  }

  window.addEventListener('mousemove', handleMouseMove)

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })
})

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

// 设置页面元数据
useHead({
  title: '首页 - 淼泽松源（上海）科技发展有限公司',
  meta: [
    { name: 'description', content: '淼泽松源（上海）科技发展有限公司，聚焦甲醇新能源、风能等核心技术研发，同步开展能源储存及设备销售、租赁等多元业态。' }
  ]
});

onMounted(() => {
  // 为各个部分添加滚动动画
  nextTick(() => {
    // 为标题添加特殊动画 - 使用文字显示效果
    const sectionTitles = document.querySelectorAll('section h2');

    // 根据设备类型选择动画
    if (isMobile.value) {
      // 移动设备使用简化动画
      staggerAnimation(sectionTitles, 'animate-simple-slide-up', { threshold: 0.2, delay: 150 });
    } else {
      // 桌面设备使用文字显示效果
      staggerAnimation(sectionTitles, 'animate-text-reveal', { threshold: 0.2, delay: 150 });
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

    // 添加鼠标跟随效果（使用改进版）
    const mouseFollowElements = document.querySelectorAll('.mouse-follow');
    mouseFollowElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.1;
      const maxDistance = parseFloat(element.getAttribute('data-max-distance')) || 50;

      // 根据设备类型选择是否添加鼠标跟随效果
      if (!isMobile.value) {
        const cleanup = mouseFollow(element, speed, maxDistance);
        // 存储清理函数
        element._mouseFollowCleanup = cleanup;
      }
    });

    // 添加滚动进度指示器
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      // 根据设备类型选择是否添加滚动进度指示器
      if (!isMobile.value) {
        const cleanup = scrollProgress(progressBar);
        window._scrollProgressCleanup = cleanup;
      }
    }

    // 为背景装饰元素添加动态背景效果
    const backgroundElements = document.querySelectorAll('.animate-background-shift');
    backgroundElements.forEach(element => {
      element.classList.add('animate-background-shift');
    });

    // 为交互元素添加发光脉冲效果
    const glowElements = document.querySelectorAll('.glow-element');
    glowElements.forEach(element => {
      element.classList.add('animate-glow-pulse');
    });

    // 为英雄轮播添加3D浮动效果
    const heroElements = document.querySelectorAll('.hero-element');
    heroElements.forEach((element, index) => {
      element.classList.add('animate-float-3d');
      element.style.animationDelay = `${index * 0.5}s`;
    });
  });
});

onUnmounted(() => {
  cleanup();

  // 清理视差滚动效果
  const parallaxElements = document.querySelectorAll('.parallax-element');
  parallaxElements.forEach(element => {
    if (element._parallaxCleanup) {
      element._parallaxCleanup();
    }
  });

  // 清理鼠标跟随效果
  const mouseFollowElements = document.querySelectorAll('.mouse-follow');
  mouseFollowElements.forEach(element => {
    if (element._mouseFollowCleanup) {
      element._mouseFollowCleanup();
    }
  });

  // 清理滚动进度指示器
  if (window._scrollProgressCleanup) {
    window._scrollProgressCleanup();
  }
});
</script>
