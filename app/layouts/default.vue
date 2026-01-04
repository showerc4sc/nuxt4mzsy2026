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

// 使用SEO优化
useHead({
  meta: [
    { name: 'keywords', content: '淼泽松源,新能源,甲醇能源,风能,能源储存,科技发展' }
  ]
})
</script>

<style scoped>
/* 确保布局组件在CSS加载前不显示 */
[v-cloak] {
  display: none !important;
}
</style>