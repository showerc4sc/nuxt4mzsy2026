<template>
  <div class="min-h-screen flex flex-col" v-cloak>
    <TheHeader />
    <main class="flex-grow">
      <PageTransition>
        <slot />
      </PageTransition>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
/**
 * 默认布局组件
 * 包含页眉、主内容区域和页脚
 */

// 导入页面过渡组件
import PageTransition from '~/components/PageTransition.vue'

// 导入公司信息 composable
import { useCompanyInfo } from '~/composables/useCompanyInfo.js'

// 获取公司信息
const {
  companyName,
  companySummary,
  seoMeta
} = useCompanyInfo()

// 使用SEO优化
useHead({
  meta: [
    { name: 'keywords', content: '淼泽松源,新能源,甲醇能源,风能,能源储存,科技发展' }
  ]
})

// 根据公司信息动态设置页面标题
useHead({
  title: computed(() => companyName.value || '淼泽松源')
})

// 监听路由变化，页面切换时滚动到顶部
const route = useRoute()

watch(() => route.path, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<style scoped>
/* 确保布局组件在CSS加载前不显示 */
[v-cloak] {
  display: none !important;
}
</style>