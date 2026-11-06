<template>
  <section class="relative min-h-[100dvh] w-full overflow-hidden bg-[#09271f]">
    <div class="absolute inset-0">
      <video
        ref="heroVideo"
        class="hero-video absolute inset-0 h-full w-full object-cover"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        crossorigin="anonymous"
        aria-label="淼泽松源新能源科技展示视频"
        @error="handleVideoError"
        @loadeddata="handleVideoLoaded"
      >
        <source :src="videoUrl" type="video/mp4" />
        <span class="sr-only">您的浏览器不支持视频标签。</span>
      </video>
      <div
        v-if="videoLoadFailed"
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://picsum.photos/seed/mzsy-hero/1920/1080.jpg')"
        role="img"
        aria-label="新能源科技设施"
      ></div>
      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,30,24,.94)_0%,rgba(6,35,28,.8)_44%,rgba(6,29,24,.25)_78%,rgba(6,29,24,.35)_100%)]"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#09271f]/80 via-transparent to-[#09271f]/50"></div>
    </div>

    <div class="relative z-10 flex min-h-[100dvh] items-center">
      <div class="site-container pb-16 pt-28 md:pb-20 md:pt-24">
        <div class="max-w-4xl">
          <div class="hero-enter hero-enter-1 mb-7 flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#b5d8c8] sm:text-sm">
            <span class="h-px w-9 bg-[#85bca5]"></span>
            新能源技术与应用
          </div>

          <h1 class="hero-enter hero-enter-2 text-white">
            <span class="block max-w-4xl text-[2.5rem] font-semibold leading-[1.16] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[4.25rem]">{{ company.name }}</span>
            <span class="mt-5 block text-xl font-medium leading-normal tracking-[0.04em] text-[#b8e2cf] sm:text-2xl md:text-3xl">{{ company.slogan }}</span>
          </h1>

          <p class="hero-enter hero-enter-3 mt-7 max-w-2xl text-base leading-8 text-white/70 md:text-lg">{{ company.description }}</p>

          <div class="hero-enter hero-enter-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <NuxtLink to="/products" class="btn-light group w-fit">
              <span>探索产品</span>
              <span class="btn-icon bg-[#e6efea] text-[#17604f]">
                <Icon name="heroicons:arrow-right" class="h-4 w-4" />
              </span>
            </NuxtLink>
            <NuxtLink to="/contact" class="inline-flex min-h-12 w-fit items-center gap-2 rounded-xl border border-white/30 bg-[#09271f]/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 active:translate-y-px">
              立即咨询
              <Icon name="heroicons:arrow-up-right" class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="pointer-events-none absolute bottom-0 right-0 hidden w-[38%] border-t border-white/15 py-6 pr-8 text-right text-[10px] tracking-[0.2em] text-white/45 lg:block">
      METHANOL · WIND · ENERGY STORAGE
    </div>
  </section>
</template>

<script setup>
import { getArticleBySlug } from '~/api/article';

const videoUrl = ref('/video/index.mp4');

const heroVideo = ref(null);
const videoLoadFailed = ref(false);
const handleVideoLoaded = () => { videoLoadFailed.value = false; };
const handleVideoError = (event) => {
  console.error('视频加载失败:', event);
  videoLoadFailed.value = true;
};

const { data: articleData } = await useAsyncData('hero-article', async () => {
  try {
    return await getArticleBySlug('miaozesongyuanshanghaike') || {};
  } catch (err) {
    console.error('获取文章数据失败:', err);
    return {};
  }
});

const company = computed(() => {
  if (!articleData.value) {
    return { name: '淼泽松源', slogan: '绿色能源，智慧未来', description: '致力于为全球客户提供优质的新能源解决方案' };
  }
  return {
    name: articleData.value.title || '淼泽松源',
    slogan: articleData.value.subtitle,
    description: articleData.value.summary
  };
});

onMounted(() => {
  // 挂载后再补全为绝对地址，避免 SSR 与客户端首帧不一致触发 hydration mismatch
  videoUrl.value = `${window.location.origin}/video/index.mp4`;

  if (heroVideo.value) {
    heroVideo.value.play().catch((error) => {
      console.error('视频播放失败:', error);
      videoLoadFailed.value = true;
    });
  }
});
</script>

<style scoped>
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero-video {
      animation: hero-scroll-zoom linear forwards;
      animation-timeline: scroll(root);
      animation-range: 0 100vh;
    }
    @keyframes hero-scroll-zoom {
      from { transform: scale(1); }
      to { transform: scale(1.1); }
    }
  }
}
</style>
