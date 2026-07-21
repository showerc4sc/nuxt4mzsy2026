/**
 * 滚动入场动效 composable
 * 统一编排页面内所有 .reveal 元素的 IntersectionObserver 逻辑，
 * 替代各页面自行查询 DOM。尊重 prefers-reduced-motion。
 *
 * 用法：在页面 <script setup> 顶层调用 useReveal()，onMounted 时自动观察所有 .reveal。
 */
export const useReveal = () => {
  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll('.reveal');

    // 降级：直接显示，无动效
    if (reduced) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => observer.observe(el));

    onUnmounted(() => observer.disconnect());
  });
};
