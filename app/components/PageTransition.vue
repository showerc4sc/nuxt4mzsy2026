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

// 页面过渡事件处理：仅 transform/opacity，无 filter blur（性能守卫）
const onBeforeEnter = (el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
}

const onEnter = (el, done) => {
  const config = getAnimationConfig({ duration: 400 });

  requestAnimationFrame(() => {
    el.style.transition = `transform ${config.duration}ms cubic-bezier(0.32, 0.72, 0, 1), opacity ${config.duration}ms cubic-bezier(0.32, 0.72, 0, 1)`;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';

    setTimeout(() => {
      done();
    }, config.duration);
  });
}

const onAfterEnter = (el) => {
  el.style.transition = '';
  el.style.transform = '';
}

const onBeforeLeave = (el) => {
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
}

const onLeave = (el, done) => {
  const config = getAnimationConfig({ duration: 350 });

  el.style.transition = `transform ${config.duration}ms cubic-bezier(0.32, 0.72, 0, 1), opacity ${config.duration}ms cubic-bezier(0.32, 0.72, 0, 1)`;
  el.style.opacity = '0';
  el.style.transform = 'translateY(-20px)';

  setTimeout(() => {
    done();
  }, config.duration);
}

const onAfterLeave = (el) => {
  el.style.transition = '';
  el.style.transform = '';
}
</script>

<style scoped>
/* 页面过渡动画：仅 transform + opacity（性能守卫），流体曲线 */
.page-enter-active,
.page-leave-active {
  transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1),
    opacity 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 移动设备优化 */
@media (max-width: 768px) {
  .page-enter-active,
  .page-leave-active {
    transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1),
      opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  }

  .page-enter-from {
    opacity: 0;
    transform: translateY(12px);
  }

  .page-leave-to {
    opacity: 0;
    transform: translateY(-12px);
  }
}

/* 平板设备优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .page-enter-active,
  .page-leave-active {
    transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1),
      opacity 0.35s cubic-bezier(0.32, 0.72, 0, 1);
  }

  .page-enter-from {
    opacity: 0;
    transform: translateY(16px);
  }

  .page-leave-to {
    opacity: 0;
    transform: translateY(-16px);
  }
}
</style>