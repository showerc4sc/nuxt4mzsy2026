<template>
  <section class="relative overflow-hidden bg-[#102f27] py-20 md:py-28">
    <div class="pointer-events-none absolute inset-0 opacity-50" style="background-image: radial-gradient(circle at 85% 10%, rgba(102,180,145,.18), transparent 38%);"></div>
    <div class="site-container relative">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="reveal lg:col-span-4">
          <p class="mb-5 text-xs font-medium tracking-[0.16em] text-[#91c4ae]">{{ sectionData.subtitle || '我们的成就' }}</p>
          <h2 class="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{{ sectionData.title || '数据说话' }}</h2>
          <p class="mt-6 max-w-md text-sm leading-7 text-white/60 md:text-base md:leading-8">{{ sectionData.summary || '多年的行业积累，我们用实力和成果赢得客户信赖' }}</p>
        </div>

        <div class="grid grid-cols-2 lg:col-span-8">
          <div v-for="(stat, index) in statisticsData" :key="stat.id" class="reveal border-b border-white/10 px-3 py-7 first:pt-0 sm:px-7 md:py-9 md:first:pt-0 lg:px-9" :class="[index % 2 === 1 ? 'border-l' : '', index >= statisticsData.length - 2 ? 'md:border-b-0' : '', `reveal-delay-${Math.min(index + 1, 5)}`]">
            <div class="font-mono text-4xl font-medium tabular-nums tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              <span class="stat-number" :data-target="stat.value" :data-suffix="stat.suffix" :data-stagger="index">0</span>
            </div>
            <p class="mt-4 text-xs text-white/55 sm:text-sm">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getArticleBySlug } from '~/api/article';
import { useNumberAnimation } from '~/composables/useAnimations.js';

const { animateNumber } = useNumberAnimation();
const { data: articleData } = await useAsyncData('data-statistics', async () => {
  try {
    return await getArticleBySlug('index-shujushuohua') || {};
  } catch (err) {
    console.error('获取数据统计失败:', err);
    return {};
  }
}, { server: true });

const parseValueAndSuffix = (valueStr) => {
  if (!valueStr) return { value: 0, suffix: '' };
  const match = valueStr.match(/^(\d+(\.\d+)?)(.*)$/);
  if (match) return { value: parseFloat(match[1]) || 0, suffix: match[3] || '' };
  return { value: 0, suffix: valueStr };
};

const statisticsData = computed(() => {
  if (!articleData.value?.attrList || !Array.isArray(articleData.value.attrList)) return [];
  return articleData.value.attrList.map((item) => {
    const { value, suffix } = parseValueAndSuffix(item.attrValue);
    return { id: item._index, label: item.attrName || '', value, suffix };
  });
});

const sectionData = computed(() => {
  if (!articleData.value) return { title: '数据说话', subtitle: '我们的成就', summary: '多年的行业积累，我们用实力和成果赢得客户信赖' };
  return {
    title: articleData.value.title || '数据说话',
    subtitle: articleData.value.subtitle || '我们的成就',
    summary: articleData.value.summary || '多年的行业积累，我们用实力和成果赢得客户信赖'
  };
});

onMounted(() => {
  nextTick(() => {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 0 : 1800;
    const timers = new Set();
    const numberObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          const targetValue = parseInt(entry.target.getAttribute('data-target'));
          const suffix = entry.target.getAttribute('data-suffix') || '';
          const staggerIndex = parseInt(entry.target.getAttribute('data-stagger')) || 0;
          const delay = reduced ? 0 : staggerIndex * 160;
          if (reduced) {
            entry.target.textContent = targetValue + suffix;
          } else {
            const timer = setTimeout(() => {
              animateNumber(entry.target, targetValue, duration, suffix);
              timers.delete(timer);
            }, delay);
            timers.add(timer);
          }
          numberObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statNumbers.forEach((element) => numberObserver.observe(element));
    onUnmounted(() => {
      numberObserver.disconnect();
      timers.forEach(clearTimeout);
    });
  });
});
</script>
