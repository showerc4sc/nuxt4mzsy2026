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
    <HeroVideo />

    <!-- 页面内容容器 -->
    <div class="relative z-10">
      <!-- 新闻中心 -->
      <NewsCenter />

      <!-- 产品展示 -->
      <ProductShowcase />

      <!-- 公司优势 -->
      <section class="py-20 relative overflow-hidden"
        style="background-image: url('https://picsum.photos/seed/mzsy-advantage/1920/1080.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
        <!-- 深色遮罩层 -->
        <div class="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/80"></div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                我们的优势
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">
                为什么选择淼泽松源
              </h2>
              <div class="space-y-8">
                <div class="advantage-card group flex items-start glow-element">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 mouse-follow"
                    data-speed="0.02">
                    <Icon name="heroicons:light-bulb" class="w-7 h-7 text-white" />
                  </div>
                  <div class="ml-6">
                    <h3
                      class="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      技术创新</h3>
                    <p class="text-gray-300 leading-relaxed">拥有多项核心技术专利，持续推动新能源技术突破，为客户提供更高效的解决方案。</p>
                  </div>
                </div>

                <div class="advantage-card group flex items-start glow-element">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-eco-500 to-eco-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 mouse-follow"
                    data-speed="0.02">
                    <Icon name="heroicons:sparkles" class="w-7 h-7 text-white" />
                  </div>
                  <div class="ml-6">
                    <h3
                      class="text-xl font-bold text-white mb-3 group-hover:text-eco-300 transition-colors duration-300">
                      绿色环保</h3>
                    <p class="text-gray-300 leading-relaxed">所有产品和技术均以环保为核心，致力于减少碳排放，推动可持续发展。</p>
                  </div>
                </div>

                <div class="advantage-card group flex items-start glow-element">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Icon name="heroicons:star" class="w-7 h-7 text-white" />
                  </div>
                  <div class="ml-6">
                    <h3
                      class="text-xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                      专业服务</h3>
                    <p class="text-gray-300 leading-relaxed">提供从咨询、设计到实施、维护的全流程服务，确保客户获得最佳体验。</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <div
                class="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md p-8 border border-white/20">
                <h3 class="text-2xl font-bold text-white mb-6 text-center">为什么选择淼泽松源</h3>

                <div class="space-y-6">
                  <div class="flex items-start space-x-4">
                    <div
                      class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="heroicons:check-circle" class="w-6 h-6 text-eco-400" />
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-white mb-2">行业领先经验</h4>
                      <p class="text-gray-300">深耕新能源领域多年，拥有丰富的项目实施经验和成功案例</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div
                      class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="heroicons:users" class="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-white mb-2">专业团队支持</h4>
                      <p class="text-gray-300">汇聚行业顶尖人才，提供从咨询到实施的全流程专业服务</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div
                      class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="heroicons:cog-6-tooth" class="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-white mb-2">定制化解决方案</h4>
                      <p class="text-gray-300">根据客户需求量身定制，确保每个项目都能达到最佳效果</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div
                      class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="heroicons:shield-check" class="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-white mb-2">可靠品质保证</h4>
                      <p class="text-gray-300">严格的质量控制体系，确保产品稳定性和长期可靠运行</p>
                    </div>
                  </div>
                </div>

                <!-- 装饰元素 -->
                <div class="mt-8 text-center">
                  <div
                    class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full shadow-lg border border-white/30">
                    <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
                    持续创新，永不止步
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 服务介绍 -->
      <section class="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 opacity-5">
          <div class="parallax-element absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
            data-speed="0.2"></div>
          <div class="parallax-element absolute bottom-1/4 right-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"
            data-speed="0.3"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-16">
            <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-4">
              我们的服务
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              核心业务
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案
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
        </div>
      </section>

      <!-- 数据统计 -->
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
              我们的成就
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              数据说话
            </h2>
            <p class="text-lg text-white/80 max-w-2xl mx-auto">
              多年的行业积累，我们用实力和成果赢得客户信赖
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="stat-card text-center group">
              <div class="relative mb-4">
                <div
                  class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="relative text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <span class="stat-number" data-target="50" data-suffix="+">0</span>
                </div>
              </div>
              <div class="text-lg text-white/90 font-medium">技术专利</div>
              <div
                class="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto group-hover:bg-white/60 transition-colors duration-300">
              </div>
            </div>

            <div class="stat-card text-center group">
              <div class="relative mb-4">
                <div
                  class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="relative text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <span class="stat-number" data-target="100" data-suffix="+">0</span>
                </div>
              </div>
              <div class="text-lg text-white/90 font-medium">成功项目</div>
              <div
                class="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto group-hover:bg-white/60 transition-colors duration-300">
              </div>
            </div>

            <div class="stat-card text-center group">
              <div class="relative mb-4">
                <div
                  class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="relative text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <span class="stat-number" data-target="30" data-suffix="+">0</span>
                </div>
              </div>
              <div class="text-lg text-white/90 font-medium">合作伙伴</div>
              <div
                class="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto group-hover:bg-white/60 transition-colors duration-300">
              </div>
            </div>

            <div class="stat-card text-center group">
              <div class="relative mb-4">
                <div
                  class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="relative text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <span class="stat-number" data-target="99" data-suffix="%">0</span>
                </div>
              </div>
              <div class="text-lg text-white/90 font-medium">客户满意度</div>
              <div
                class="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto group-hover:bg-white/60 transition-colors duration-300">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 行动号召 -->
      <section class="cta-section py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 opacity-5">
          <div class="parallax-element absolute top-1/3 right-1/3 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"
            data-speed="0.2"></div>
          <div class="parallax-element absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
            data-speed="0.1"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div class="max-w-4xl mx-auto">
            <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-6">
              联系我们
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              准备好开启绿色能源之旅了吗？
            </h2>
            <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              联系我们的专业团队，了解更多关于新能源解决方案的信息，让我们一起为可持续发展贡献力量
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NuxtLink to="/contact"
                class="group relative px-8 py-4 bg-gradient-to-r from-eco-500 to-eco-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden font-display mouse-follow"
                data-speed="0.03" data-max-distance="15">
                <span class="relative z-10 flex items-center">
                  <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2" />
                  立即咨询
                </span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-eco-600 to-eco-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </NuxtLink>

              <NuxtLink to="/products"
                class="group relative px-8 py-4 bg-transparent border-2 border-eco-500 text-eco-600 font-semibold rounded-xl hover:bg-eco-50 transition-all duration-300 font-display">
                <span class="flex items-center">
                  <Icon name="heroicons:cube-transparent" class="w-5 h-5 mr-2" />
                  查看产品
                </span>
                <div
                  class="absolute inset-0 bg-eco-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </NuxtLink>
            </div>

            <!-- 联系信息 -->
            <div class="mt-12 pt-8 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-600">
                <div class="flex items-center">
                  <Icon name="heroicons:phone" class="w-5 h-5 mr-2 text-eco-600" />
                  <span>400-888-8888</span>
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:envelope" class="w-5 h-5 mr-2 text-eco-600" />
                  <span>contact@mzsy.com</span>
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:map-pin" class="w-5 h-5 mr-2 text-eco-600" />
                  <span>上海市浦东新区</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// 导入英雄视频组件
import HeroVideo from './HeroVideo.vue'
// 导入新闻中心组件
import NewsCenter from './NewsCenter.vue'
// 导入产品展示组件
import ProductShowcase from './ProductShowcase.vue'

// 导入动画组合式函数
import { useScrollAnimation, useMouseFollower, useParallax, useNumberAnimation, useAdvancedAnimations } from '~/composables/useAnimations.js'
import { useMobileOptimization } from '~/composables/useMobileOptimization.js'

// 解构动画函数
const { addScrollAnimation, addStaggeredAnimation, cleanup } = useScrollAnimation()
const { animateNumber } = useNumberAnimation()
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

// 直接导入JSON数据
const { data: servicesData } = await useAsyncData('services', async () => {
  const companyJson = await import('~/data/company.json');
  return companyJson.default.services;
});

onMounted(() => {
  // 为各个部分添加滚动动画
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

    // 公司优势部分动画 - 使用旋转滑入效果
    const advantageCards = document.querySelectorAll('.advantage-card');

    // 根据设备类型选择动画
    if (isMobile.value) {
      // 移动设备使用简化动画
      staggerAnimation(advantageCards, 'animate-simple-slide-up', { threshold: 0.2, delay: 200 });
    } else {
      // 桌面设备使用旋转滑入效果
      staggerAnimation(advantageCards, 'animate-slide-in-left-rotate', { threshold: 0.2, delay: 200 });

      // 为优势卡片添加视差层叠效果
      const advantageDepths = [10, 20, 30, 40];
      const parallaxCleanup = parallaxLayers(advantageCards, advantageDepths, 0.3);
      advantageCards[0]._parallaxCleanup = parallaxCleanup;
    }

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

    // CTA部分动画 - 使用弹性增长效果
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      // 根据设备类型选择动画
      if (isMobile.value) {
        addOptimizedScrollAnimation(ctaSection, 'animate-simple-scale', { threshold: 0.1 });
      } else {
        addScrollAnimation({ value: ctaSection }, 'animate-elastic-grow', { threshold: 0.1 });
      }

      // 为CTA按钮添加文字逐字显示效果
      const ctaButtons = ctaSection.querySelectorAll('a');
      ctaButtons.forEach((button, index) => {
        const buttonText = button.querySelector('span').textContent;
        const textElement = button.querySelector('span');
        if (textElement) {
          // 创建观察器，当元素进入视口时触发打字机效果
          const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed');

                // 移动设备不使用打字机效果
                if (!isMobile.value) {
                  typewriterEffect(entry.target, buttonText, 50);
                }
              }
            });
          }, { threshold: 0.8 });

          textObserver.observe(textElement);
        }

        // 为CTA按钮添加3D翻转效果
        setTimeout(() => {
          if (isMobile.value) {
            // 移动设备使用简化动画
            button.classList.add('animate-simple-scale');
          } else {
            // 桌面设备使用3D翻转效果
            addOptimizedFlip3D(button, 'x', 1000);
          }
        }, 1500 + index * 300);

        // 添加磁吸效果
        const magneticCleanup = addOptimizedMagneticEffect(button, 0.15, 60);
        button._magneticCleanup = magneticCleanup;
      });
    }

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
