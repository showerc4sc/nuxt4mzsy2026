<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-[101] px-3 pt-3 sm:px-5 sm:pt-4">
    <nav
      class="pointer-events-auto mx-auto flex h-16 max-w-[88rem] items-center justify-between rounded-2xl px-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-4"
      :class="headerGlassClass"
      aria-label="主导航"
    >
      <NuxtLink to="/" class="group flex min-w-0 items-center gap-3 rounded-lg" aria-label="淼泽松源首页">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 shadow-sm ring-1 ring-black/5">
          <img src="/images/logo.png" alt="淼泽松源" class="h-full w-full object-contain" />
        </span>
        <span class="min-w-0">
          <span
            class="block truncate text-base font-bold tracking-wide transition-colors duration-300 sm:text-lg"
            :class="isLightHeader ? 'text-[#102b25] group-hover:text-eco-700' : 'text-white'"
          >{{ company.shortName }}</span>
          <span
            class="hidden text-[9px] font-medium tracking-[0.18em] sm:block"
            :class="isLightHeader ? 'text-[#71837b]' : 'text-white/55'"
          >MIAOZE SONGYUAN</span>
        </span>
      </NuxtLink>

      <div class="hidden items-center gap-0.5 lg:flex">
        <div v-if="menuPending" class="flex gap-2 px-3" aria-label="导航加载中">
          <div v-for="i in 4" :key="i" class="h-8 w-16 rounded-lg bg-white/10 animate-pulse"></div>
        </div>
        <template v-else>
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.path"
            class="relative rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300"
            :class="navLinkClass(item.path)"
          >
            {{ item.name }}
            <span
              v-if="route.path === item.path"
              class="absolute inset-x-4 -bottom-0.5 h-px bg-current opacity-60"
            ></span>
          </NuxtLink>
        </template>
      </div>

      <div class="hidden lg:block">
        <NuxtLink
          to="/contact"
          class="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 active:translate-y-px"
          :class="isLightHeader
            ? 'bg-[#176f5a] text-white hover:bg-[#105c4b]'
            : 'bg-white text-[#153e32] hover:bg-[#e7f3ed]'"
        >立即咨询</NuxtLink>
      </div>

      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-xl transition-colors lg:hidden"
        :class="isLightHeader ? 'text-[#173c31] hover:bg-black/5' : 'text-white hover:bg-white/10'"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-navigation"
        :aria-label="isMobileMenuOpen ? '关闭菜单' : '打开菜单'"
        @click="toggleMobileMenu"
      >
        <span class="relative block h-4 w-5">
          <span class="absolute left-0 top-0.5 h-px w-5 bg-current transition-transform duration-300" :class="{ 'translate-y-1.5 rotate-45': isMobileMenuOpen }"></span>
          <span class="absolute bottom-0.5 left-0 h-px w-5 bg-current transition-transform duration-300" :class="{ '-translate-y-1.5 -rotate-45': isMobileMenuOpen }"></span>
        </span>
      </button>
    </nav>
  </header>

  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-200"
    leave-to-class="opacity-0"
  >
    <div v-if="isMobileMenuOpen" id="mobile-navigation" class="fixed inset-0 z-[100] bg-[#f4f7f5] lg:hidden">
      <div class="grid-pattern absolute inset-0 opacity-50"></div>
      <div class="relative flex min-h-[100dvh] flex-col px-6 pb-10 pt-28 sm:px-10">
        <p class="mb-8 text-xs font-medium tracking-[0.18em] text-[#71837b]">网站导航</p>
        <div v-if="menuPending" class="space-y-4">
          <div v-for="i in 4" :key="i" class="skeleton h-12 w-56 rounded-lg"></div>
        </div>
        <nav v-else class="flex flex-col" aria-label="移动端导航">
          <NuxtLink
            v-for="(item, index) in navigationItems"
            :key="item.name"
            :to="item.path"
            class="mobile-nav-link group flex items-center justify-between border-b border-[#dce5df] py-5 text-2xl font-semibold text-[#163c30]"
            :style="{ animationDelay: `${index * 60 + 80}ms` }"
            @click="closeMobileMenu"
          >
            <span>{{ item.name }}</span>
            <Icon name="heroicons:arrow-up-right" class="h-5 w-5 text-[#6b8b7d] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </NuxtLink>
        </nav>
        <div class="mt-auto pt-10 text-sm leading-7 text-[#65776e]">
          <p class="font-semibold text-[#173e32]">{{ company.shortName }}</p>
          <p>{{ company.subtitle }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { getCategoryList } from '~/api/category';
import { useCompanyInfo } from '~/composables/useCompanyInfo.js';

const route = useRoute();
const isScrolled = ref(false);
const isClientInitialized = ref(false);
const { companyName, companySubtitle } = useCompanyInfo();

const company = computed(() => ({
  shortName: companyName.value || '淼泽松源',
  subtitle: companySubtitle.value || '新能源科技'
}));

const getDefaultMenu = () => [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' }
];

// 菜单打开时固定使用浅色文字，避免白色遮罩上的对比度问题
const isLightHeader = computed(() =>
  isMobileMenuOpen.value || route.path !== '/' || (isClientInitialized.value && isScrolled.value)
);

const headerGlassClass = computed(() => {
  if (isLightHeader.value) {
    return 'bg-white/95 shadow-[0_12px_35px_-22px_rgba(16,43,37,0.45)] ring-1 ring-[#173e32]/10 backdrop-blur-xl';
  }
  return 'bg-[#0b2822]/55 shadow-[0_12px_35px_-22px_rgba(0,0,0,0.6)] ring-1 ring-white/15 backdrop-blur-xl';
});

const navLinkClass = (path) => {
  const isActive = route.path === path;
  if (isActive) {
    return isLightHeader.value ? 'bg-[#eaf3ee] text-[#17604f]' : 'bg-white/10 text-white';
  }
  return isLightHeader.value
    ? 'text-[#5d7067] hover:bg-[#f0f5f2] hover:text-[#173e32]'
    : 'text-white/75 hover:bg-white/10 hover:text-white';
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  isClientInitialized.value = true;
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (process.client) document.body.style.overflow = '';
});

watch(() => route.path, () => {
  closeMobileMenu();
  handleScroll();
  nextTick(() => setTimeout(handleScroll, 350));
});

const { data: menuData, pending: menuPending } = await useAsyncData('navigation-menu', async () => {
  try {
    return await getCategoryList();
  } catch (error) {
    return null;
  }
}, { server: true });

const navigationItems = computed(() => {
  let menuItems = null;
  if (menuData.value?.rows && Array.isArray(menuData.value.rows)) {
    menuItems = menuData.value.rows;
  } else if (Array.isArray(menuData.value)) {
    menuItems = menuData.value;
  }

  if (menuItems?.length > 0) {
    return menuItems.map(item => {
      let path = item.path || item.url || item.href || `/${item.id || ''}`;
      if (path && !path.startsWith('/')) path = '/' + path;
      return { name: item.title || item.name || item.categoryName || '未命名', path };
    });
  }
  return getDefaultMenu();
});

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value; };
const closeMobileMenu = () => { isMobileMenuOpen.value = false; };

watch(isMobileMenuOpen, (open) => {
  if (process.client) document.body.style.overflow = open ? 'hidden' : '';
});

onMounted(() => {
  const onEscape = (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  };
  window.addEventListener('keydown', onEscape);
  onUnmounted(() => window.removeEventListener('keydown', onEscape));
});
</script>
