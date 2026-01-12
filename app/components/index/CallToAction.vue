<template>
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
          <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-6">
            {{ sectionData.subtitle }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {{ sectionData.title }}
          </h2>
          <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {{ sectionData.summary }}
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
                <span>{{ companyTel || '400-888-8888' }}</span>
              </div>
              <div class="flex items-center">
                <Icon name="heroicons:envelope" class="w-5 h-5 mr-2 text-eco-600" />
                <span>{{ companyEmail || 'contact@mzsy.com' }}</span>
              </div>
              <div class="flex items-center">
                <Icon name="heroicons:map-pin" class="w-5 h-5 mr-2 text-eco-600" />
                <span>{{ companyAddress || '上海市浦东新区' }}</span>
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
