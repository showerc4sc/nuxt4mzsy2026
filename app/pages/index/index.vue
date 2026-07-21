<template>
  <div class="relative bg-white">
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
/**
 * 首页
 * 全局进入动效由 useReveal composable 统一编排所有 .reveal 元素。
 */
useReveal();

useHead({
  title: '首页 - 淼泽松源（上海）科技发展有限公司',
  meta: [
    {
      name: 'description',
      content: '淼泽松源（上海）科技发展有限公司，聚焦甲醇新能源、风能等核心技术研发，同步开展能源储存及设备销售、租赁等多元业态。'
    }
  ]
});
</script>
