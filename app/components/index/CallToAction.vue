<template>
  <section class="cta-section py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="parallax-element absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-eco-200/40 to-transparent rounded-full filter blur-3xl"
        data-speed="0.2"></div>
      <div class="parallax-element absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/40 to-transparent rounded-full filter blur-3xl"
        data-speed="0.1"></div>
      <!-- 点状背景 -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: radial-gradient(circle, #22c55e 2px, transparent 2px); background-size: 40px 40px;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div class="max-w-4xl mx-auto">
        <!-- 加载状态 -->
        <div v-if="pending" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-eco-500 border-t-transparent"></div>
          <p class="mt-4 text-gray-600">加载中...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="text-center py-20">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons:exclamation-triangle" class="w-10 h-10 text-red-500" />
          </div>
          <p class="text-gray-600">加载失败，请稍后重试</p>
        </div>

        <!-- 正常内容 -->
        <template v-else>
          <!-- 标签 -->
          <div class="inline-flex items-center px-5 py-2.5 bg-eco-50 border border-eco-100 text-eco-700 rounded-full text-sm font-medium mb-8">
            <Icon name="heroicons:rocket-launch" class="w-4 h-4 mr-2" />
            {{ sectionData.subtitle || '联系我们' }}
          </div>

          <!-- 标题 -->
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {{ sectionData.title || '准备好开启绿色能源之旅了吗？' }}
          </h2>

          <!-- 描述 -->
          <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {{ sectionData.summary || '联系我们的专业团队，了解更多关于新能源解决方案的信息，让我们一起为可持续发展贡献力量' }}
          </p>

          <!-- CTA 按钮组 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink to="/contact"
              class="group relative px-8 py-4 bg-gradient-to-r from-eco-500 to-eco-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden btn-glow">
              <span class="relative z-10 flex items-center">
                <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2" />
                立即咨询
                <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </NuxtLink>

            <NuxtLink to="/products"
              class="group px-8 py-4 bg-white text-eco-600 font-semibold rounded-xl border-2 border-eco-200 hover:border-eco-400 hover:bg-eco-50 transition-all duration-300 flex items-center shadow-md hover:shadow-lg">
              <Icon name="heroicons:cube-transparent" class="w-5 h-5 mr-2" />
              查看产品
            </NuxtLink>
          </div>

          <!-- 联系信息卡片 -->
          <div class="mt-16">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="group flex items-center justify-center p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-eco-200">
                <div class="w-12 h-12 bg-eco-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-eco-500 group-hover:scale-110 transition-all duration-300">
                  <Icon name="heroicons:phone" class="w-6 h-6 text-eco-600 group-hover:text-white transition-colors" />
                </div>
                <div class="text-left">
                  <div class="text-xs text-gray-400 mb-0.5">服务热线</div>
                  <div class="text-gray-900 font-semibold">{{ companyTel || '400-888-8888' }}</div>
                </div>
              </div>

              <div class="group flex items-center justify-center p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-eco-200">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                  <Icon name="heroicons:envelope" class="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div class="text-left">
                  <div class="text-xs text-gray-400 mb-0.5">电子邮箱</div>
                  <div class="text-gray-900 font-semibold text-sm">{{ companyEmail || 'contact@mzsy.com' }}</div>
                </div>
              </div>

              <div class="group flex items-center justify-center p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-eco-200">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
                  <Icon name="heroicons:map-pin" class="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <div class="text-left">
                  <div class="text-xs text-gray-400 mb-0.5">公司地址</div>
                  <div class="text-gray-900 font-semibold text-sm">{{ companyAddress || '上海市浦东新区' }}</div>
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

// 导入动画组合式函数
import { useScrollAnimation, useMouseFollower, useParallax } from '~/composables/useAnimations.js'

// 解构动画函数
const { addScrollAnimation, cleanup } = useScrollAnimation()
const { scrollY, getParallaxOffset } = useParallax()

// 获取公司信息
const {
  companyAddress,
  companyTel,
  companyEmail
} = useCompanyInfo()

/**
 * 使用API获取CTA区域数据
 * slug为 index-contact
 */
const { data: articleData, pending, error } = await useAsyncData('cta-section', async () => {
  try {
    const response = await getArticleBySlug('index-contact');
    return response || {};
  } catch (err) {
    console.error('获取CTA区域数据失败:', err);
    return {};
  }
}, {
  server: true
});

/**
 * CTA区域数据
 */
const sectionData = computed(() => ({
  title: articleData.value?.title || '准备好开启绿色能源之旅了吗？',
  subtitle: articleData.value?.subtitle || '联系我们',
  summary: articleData.value?.summary || '联系我们的专业团队，了解更多关于新能源解决方案的信息，让我们一起为可持续发展贡献力量'
}));

// 组件挂载后初始化动画
onMounted(() => {
  // 添加滚动动画
  addScrollAnimation('.cta-section', {
    threshold: 0.2,
    animationClass: 'fade-in-up'
  })

  // 初始化视差效果
  initParallax()
})

// 组件卸载时清理动画
onUnmounted(() => {
  cleanup()
})

/**
 * 初始化视差效果
 */
const initParallax = () => {
  const parallaxElements = document.querySelectorAll('.parallax-element')

  const handleScroll = () => {
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.speed) || 0.1
      const offset = getParallaxOffset(speed)
      element.style.transform = `translateY(${offset}px)`
    })
  }

  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}
</script>

<style scoped>
/**
 * 淡入向上动画
 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>
