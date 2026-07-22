<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-eco-800 via-eco-900 to-slate-900 py-32 md:py-40">
    <!-- 细微纹理：单层径向，无滚动监听视差 -->
    <div
      class="pointer-events-none absolute inset-0 opacity-40"
      style="background-image: radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.08), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255, 255, 255, 0.06), transparent 40%);"
    ></div>

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 标题区域（眉标 2） -->
      <div class="reveal mb-20 max-w-3xl">
        <div class="mb-5 inline-flex items-center text-sm font-medium text-eco-300">
          <span class="mr-3 h-px w-8 bg-eco-400"></span>
          {{ sectionData.subtitle || '我们的成就' }}
        </div>
        <h2 class="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
          {{ sectionData.title || '数据说话' }}
        </h2>
        <p class="mt-5 text-lg font-light leading-relaxed text-white/75 md:text-xl">
          {{ sectionData.summary || '多年的行业积累，我们用实力和成果赢得客户信赖' }}
        </p>
      </div>

      <!-- 统计网格：Double-Bezel 暗色玻璃卡片 -->
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
        <div
          v-for="(stat, index) in statisticsData"
          :key="stat.id"
          class="reveal bezel-dark"
          :class="`reveal-delay-${Math.min(index + 1, 5)}`"
        >
          <div class="bezel-dark-inner flex flex-col p-8 md:p-10">
            <!-- 数字 -->
            <div class="font-mono text-5xl font-semibold tabular-nums tracking-tight text-white md:text-6xl">
              <span class="stat-number" :data-target="stat.value" :data-suffix="stat.suffix" :data-stagger="index">0</span>
            </div>
            <!-- 细线分隔 -->
            <div class="mt-5 h-px w-10 bg-eco-400"></div>
            <!-- 标签 -->
            <div class="mt-5 text-sm font-light text-white/70 md:text-base">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 数据统计组件
 * 展示公司的核心数据和成就
 */

// 导入API方法
import { getArticleBySlug } from '~/api/article';
import { useNumberAnimation } from '~/composables/useAnimations.js';

const { animateNumber } = useNumberAnimation();

/**
 * 使用API获取数据统计信息
 * slug为 index-shujushuohua
 */
const { data: articleData } = await useAsyncData(
  'data-statistics',
  async () => {
    try {
      const response = await getArticleBySlug('index-shujushuohua');
      return response || {};
    } catch (err) {
      console.error('获取数据统计失败:', err);
      return {};
    }
  },
  {
    server: true
  }
);

/**
 * 解析数值和后缀
 * 例如：从 "50+" 中解析出 50 和 "+"
 */
const parseValueAndSuffix = (valueStr) => {
  if (!valueStr) return { value: 0, suffix: '' };

  const match = valueStr.match(/^(\d+(\.\d+)?)(.*)$/);
  if (match) {
    return {
      value: parseFloat(match[1]) || 0,
      suffix: match[3] || ''
    };
  }

  return { value: 0, suffix: valueStr };
};

/**
 * 将API返回的数据映射为统计卡片格式
 */
const statisticsData = computed(() => {
  if (!articleData.value || !articleData.value.attrList || !Array.isArray(articleData.value.attrList)) {
    return [];
  }

  return articleData.value.attrList.map((item) => {
    const { value, suffix } = parseValueAndSuffix(item.attrValue);
    return {
      id: item._index,
      label: item.attrName || '',
      value: value,
      suffix: suffix
    };
  });
});

/**
 * 获取标题和描述
 */
const sectionData = computed(() => {
  if (!articleData.value) {
    return {
      title: '数据说话',
      subtitle: '我们的成就',
      summary: '多年的行业积累，我们用实力和成果赢得客户信赖'
    };
  }

  return {
    title: articleData.value.title || '数据说话',
    subtitle: articleData.value.subtitle || '我们的成就',
    summary: articleData.value.summary || '多年的行业积累，我们用实力和成果赢得客户信赖'
  };
});

onMounted(() => {
  nextTick(() => {
    // 数字递增：进入视口时触发（卡片进入动效由 index.vue 全局观察器处理）
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 0 : 1800;

    const numberObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const targetValue = parseInt(entry.target.getAttribute('data-target'));
            const suffix = entry.target.getAttribute('data-suffix') || '';
            // 错峰：每项延迟 300ms 启动，形成数字依次递增的叙事高潮
            const staggerIndex = parseInt(entry.target.getAttribute('data-stagger')) || 0;
            const delay = reduced ? 0 : staggerIndex * 300;

            if (reduced) {
              entry.target.textContent = targetValue + suffix;
            } else {
              setTimeout(() => {
                animateNumber(entry.target, targetValue, duration, suffix);
              }, delay);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((element) => {
      numberObserver.observe(element);
    });
  });
});
</script>

<style scoped>
/* 组件特定样式 */
</style>
