<template>
  <div class="page-transition-container">
    <Transition
      name="page"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <slot />
    </Transition>
  </div>
</template>

<script setup>
import { useMobileOptimization } from '~/composables/useMobileOptimization.js'

// 获取移动设备优化函数
const { isMobile, isTablet, getAnimationConfig } = useMobileOptimization()

// 页面过渡事件处理
const onBeforeEnter = (el) => {
  // 根据设备类型设置不同的过渡效果
  if (isMobile.value) {
    // 移动设备使用简单的淡入效果
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
  } else {
    // 桌面设备使用更复杂的效果
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px) scale(0.98)'
    el.style.filter = 'blur(2px)'
  }
}

const onEnter = (el, done) => {
  // 获取动画配置
  const config = getAnimationConfig({ duration: 600 })
  
  // 使用requestAnimationFrame确保样式应用
  requestAnimationFrame(() => {
    // 设置过渡样式
    el.style.transition = `all ${config.duration}ms ${config.easing}`
    
    // 应用最终状态
    el.style.opacity = '1'
    
    if (isMobile.value) {
      // 移动设备使用简单的变换
      el.style.transform = 'translateY(0)'
    } else {
      // 桌面设备使用更复杂的变换
      el.style.transform = 'translateY(0) scale(1)'
      el.style.filter = 'blur(0)'
    }
    
    // 动画完成后调用done
    setTimeout(() => {
      done()
    }, config.duration)
  })
}

const onAfterEnter = (el) => {
  // 清理样式
  el.style.transition = ''
  el.style.transform = ''
  el.style.filter = ''
}

const onBeforeLeave = (el) => {
  // 根据设备类型设置不同的离开效果
  if (isMobile.value) {
    // 移动设备使用简单的淡出效果
    el.style.opacity = '1'
    el.style.transform = 'translateY(0)'
  } else {
    // 桌面设备使用更复杂的效果
    el.style.opacity = '1'
    el.style.transform = 'translateY(0) scale(1)'
    el.style.filter = 'blur(0)'
  }
}

const onLeave = (el, done) => {
  // 获取动画配置
  const config = getAnimationConfig({ duration: 500 })
  
  // 设置过渡样式
  el.style.transition = `all ${config.duration}ms ${config.easing}`
  
  // 应用离开状态
  el.style.opacity = '0'
  
  if (isMobile.value) {
    // 移动设备使用简单的变换
    el.style.transform = 'translateY(-20px)'
  } else {
    // 桌面设备使用更复杂的变换
    el.style.transform = 'translateY(-40px) scale(1.02)'
    el.style.filter = 'blur(1px)'
  }
  
  // 动画完成后调用done
  setTimeout(() => {
    done()
  }, config.duration)
}

const onAfterLeave = (el) => {
  // 清理样式
  el.style.transition = ''
  el.style.transform = ''
  el.style.filter = ''
}
</script>

<style scoped>
/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  filter: blur(2px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(1.02);
  filter: blur(1px);
}

/* 移动设备优化 */
@media (max-width: 768px) {
  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s ease-out;
  }
  
  .page-enter-from {
    opacity: 0;
    transform: translateY(20px);
    filter: none;
  }
  
  .page-leave-to {
    opacity: 0;
    transform: translateY(-20px);
    filter: none;
  }
}

/* 平板设备优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .page-enter-active,
  .page-leave-active {
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .page-enter-from {
    opacity: 0;
    transform: translateY(30px) scale(0.99);
    filter: blur(1px);
  }
  
  .page-leave-to {
    opacity: 0;
    transform: translateY(-30px) scale(1.01);
    filter: blur(0.5px);
  }
}
</style>