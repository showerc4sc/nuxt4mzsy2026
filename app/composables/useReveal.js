/**
 * 滚动入场动效 composable
 * 统一编排页面内所有 .reveal 元素的 IntersectionObserver 逻辑，
 * 替代各页面自行查询 DOM。尊重 prefers-reduced-motion。
 *
 * 用法：在页面 / 组件 <script setup> 顶层调用 useReveal()。
 *
 * 两个曾经的隐患（已修）：
 * 1. 页面内容多来自异步 API，.reveal 元素常在 onMounted 之后才渲染出来。
 *    早期实现只查询一次 DOM，晚到的元素永远进不了观察队列，长期停留在
 *    opacity:0 —— 表现为整段文字不显示。现用 MutationObserver 补观察。
 * 2. .reveal 默认 opacity:0 依赖 JS 才可见。一旦脚本报错/被拦截，内容就空白。
 *    现改为仅在 `reveal-ready` 类挂上之后才应用初始隐藏样式，JS 失效则直接可见。
 */
export const useReveal = () => {
  let observer = null;
  let mutationObserver = null;
  let fallback = null;

  onMounted(() => {
    const els = document.querySelectorAll('.reveal');

    // 降级：直接把已经存在的元素标记为可见，且不挂 reveal-ready
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    const inViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const observe = (root) => {
      root.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el));
    };

    // 第一步：把当前已在视口内的元素同步标记为可见。
    // 这一步必须在挂 reveal-ready 之前、同一个同步块内完成，
    // 否则 SSR 已经可见的内容会先被隐藏、下一帧才显示，肉眼看到闪烁。
    els.forEach((el) => {
      if (inViewport(el)) el.classList.add('is-visible');
    });

    // 第二步：开启初始隐藏样式（只影响视口外、待进入的元素）
    document.documentElement.classList.add('reveal-ready');

    observe(document);

    // 补观察后续渲染出来的 .reveal（异步数据、v-if/v-else 重建等）。
    // 新节点若已落在视口内，直接标记可见，避免等下一帧才出现。
    mutationObserver = new MutationObserver((records) => {
      const pending = [];
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.classList?.contains('reveal')) pending.push(node);
          else if (node.querySelector?.('.reveal')) pending.push(...node.querySelectorAll('.reveal'));
        }
      }
      if (!pending.length) return;
      pending.forEach((el) => {
        if (inViewport(el)) el.classList.add('is-visible');
        else observer.observe(el);
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // 兜底：观察器万一漏掉，滚动/尺寸变化时把已进入视口的元素补上
    fallback = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
        if (inViewport(el)) el.classList.add('is-visible');
      });
    };
    window.addEventListener('scroll', fallback, { passive: true });
    window.addEventListener('resize', fallback, { passive: true });
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
    if (mutationObserver) mutationObserver.disconnect();
    if (fallback) {
      window.removeEventListener('scroll', fallback);
      window.removeEventListener('resize', fallback);
    }
  });
};
