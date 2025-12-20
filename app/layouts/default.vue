<template>
  <div class="min-h-screen flex flex-col">
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
// 导入页面过渡组件
import PageTransition from '~/components/PageTransition.vue'

// 使用SEO优化
useHead({
  meta: [
    { name: 'keywords', content: '淼泽松源,新能源,甲醇能源,风能,能源储存,科技发展' }
  ]
})
</script>