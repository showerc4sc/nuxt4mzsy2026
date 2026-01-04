<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// 使用中文语言环境
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  },
  // 添加关键CSS防止FOUC（Flash of Unstyled Content）
  style: [
    {
      innerHTML: `
        /* 关键CSS - 防止页面首次加载时出现无样式闪烁 */
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* 隐藏未加载完成的内容，防止闪烁 */
        [v-cloak] {
          display: none !important;
        }
        
        /* 基础布局样式 */
        .min-h-screen {
          min-height: 100vh;
        }
        
        .flex {
          display: flex;
        }
        
        .flex-col {
          flex-direction: column;
        }
        
        .flex-grow {
          flex-grow: 1;
        }
        
        /* 防止内容闪烁的占位样式 */
        body {
          background-color: #ffffff;
          color: #1f2937;
        }
        
        /* 加载指示器样式 */
        .nuxt-loading-indicator {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #22c55e, #0ea5e9);
          z-index: 9999;
          transition: opacity 0.3s ease;
        }
      `
    }
  ]
})
</script>

<style>
/* 添加v-cloak指令样式 */
[v-cloak] {
  display: none !important;
}
</style>
