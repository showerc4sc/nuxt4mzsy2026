<template>
  <!-- 浮动玻璃胶囊导航（high-end-visual-design §5.A：脱离顶栏，居中浮动） -->
  <div class="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[101] w-[calc(100%-2rem)] max-w-5xl">
    <nav
      class="flex items-center justify-between rounded-full pl-2 pr-2 lg:pr-3 py-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
      :class="headerGlassClass"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2.5 pl-2 group">
        <div class="relative w-9 h-9 flex items-center justify-center">
          <img src="/images/logo.png" alt="淼泽松源" class="w-full h-full object-contain" />
        </div>
        <span
          class="text-lg font-bold transition-colors duration-300 group-hover:text-eco-600"
          :class="isClientInitialized && isScrolled ? 'text-gray-900' : 'text-white'"
        >{{ company.shortName }}</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center gap-1">
        <!-- 加载状态 -->
        <div v-if="menuPending" class="flex space-x-1">
          <div v-for="i in 3" :key="i" class="h-9 w-20 rounded-full bg-gray-200/60 animate-pulse"></div>
        </div>
        <!-- 导航菜单项 -->
        <template v-else>
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.path"
            class="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
            :class="navLinkClass(item.path)"
          >
            {{ item.name }}
          </NuxtLink>
        </template>
      </div>

      <!-- Mobile menu button -->
      <button
        @click="toggleMobileMenu"
        class="lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300"
        :class="isClientInitialized && isScrolled
          ? 'text-gray-700 hover:bg-gray-100'
          : 'text-white hover:bg-white/10'"
        aria-label="菜单"
      >
        <Icon v-if="!isMobileMenuOpen" name="heroicons:bars-3" class="w-5 h-5" />
        <Icon v-else name="heroicons:x-mark" class="w-5 h-5" />
      </button>
    </nav>
  </div>

  <!-- 移动端全屏玻璃遮罩（§5.A：大幅玻璃 + 错峰遮罩揭示） -->
  <Transition
    enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[100] lg:hidden">
      <!-- 玻璃背景 -->
      <div class="absolute inset-0 bg-white/90 backdrop-blur-3xl"></div>

      <!-- 链接列表 -->
      <div class="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] gap-3 px-8">
        <!-- 加载状态 -->
        <div v-if="menuPending" class="space-y-4">
          <div v-for="i in 3" :key="i" class="h-12 w-48 rounded-full bg-gray-200/60 animate-pulse"></div>
        </div>
        <template v-else>
          <NuxtLink
            v-for="(item, index) in navigationItems"
            :key="item.name"
            :to="item.path"
            class="mobile-nav-link text-3xl font-bold text-gray-900 hover:text-eco-700 transition-colors duration-300"
            :style="{ animationDelay: `${index * 80 + 100}ms` }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { getCategoryList } from '~/api/category';
import { useCompanyInfo } from '~/composables/useCompanyInfo.js';

// 路由（供 navLinkClass 判断激活态 + 路由变化重置滚动状态）
const route = useRoute();

// 滚动状态
const isScrolled = ref(false);

// 客户端初始化标志
const isClientInitialized = ref(false);

// 获取公司信息
const {
  companyName,
  companySubtitle
} = useCompanyInfo()

// 公司信息
const company = computed(() => ({
  shortName: companyName.value || '淼泽松源',
  subtitle: companySubtitle.value || '新能源科技'
}));

// 获取默认菜单
const getDefaultMenu = () => {
  const defaultMenu = [
    { name: '首页', path: '/' },
    { name: '关于我们', path: '/about' },
  ];
  return defaultMenu;
};

/**
 * 浮动胶囊玻璃态样式
 * 顶部（未滚动）：半透明深色玻璃 + 白色发丝环（悬浮于深色 hero 上）
 * 滚动后：高不透明白色玻璃 + 柔和漫射阴影（悬浮于浅色内容上，确保深色文字清晰可读）
 */
const headerGlassClass = computed(() => {
  if (isClientInitialized.value && isScrolled.value) {
    return 'bg-white/90 backdrop-blur-2xl ring-1 ring-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.08)]';
  }
  return 'bg-white/10 backdrop-blur-2xl ring-1 ring-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]';
});

/**
 * 桌面导航链接样式
 */
const navLinkClass = (path) => {
  const isActive = route.path === path;
  const isLight = isClientInitialized.value && isScrolled.value;

  if (isActive) {
    return isLight
      ? 'bg-eco-50 text-eco-900 font-semibold'
      : 'bg-white/15 text-white font-semibold';
  }
  return isLight
    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    : 'text-white/80 hover:text-white hover:bg-white/10';
};

// 滚动处理器：根据当前 scrollY 同步状态
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
});

// 路由变化时同步实际滚动位置（修复：跳转新页面时按实际 scrollY 决定 header 态，
// 避免强制重置为透明导致白底白字闪烁；Nuxt 路由切换瞬间重置 scrollY 为 0，
// 但浏览器滚动恢复可能在 watch 触发前完成，故立即读一次再兜底核对）
watch(() => route.path, () => {
  handleScroll();
  nextTick(() => {
    setTimeout(handleScroll, 350);
  });
});

/**
 * 获取导航菜单数据
 */
const { data: menuData, pending: menuPending } = await useAsyncData('navigation-menu', async () => {
  try {
    const data = await getCategoryList();
    return data;
  } catch (error) {
    return null;
  }
}, {
  server: true
});

/**
 * 使用从API获取的菜单数据，如果数据为空或出错，则使用默认菜单
 */
const navigationItems = computed(() => {
  let menuItems = null;
  if (menuData.value && menuData.value.rows && Array.isArray(menuData.value.rows)) {
    menuItems = menuData.value.rows;
  } else if (menuData.value && Array.isArray(menuData.value)) {
    menuItems = menuData.value;
  }

  if (menuItems && Array.isArray(menuItems) && menuItems.length > 0) {
    return menuItems.map(item => {
      let path = item.path || item.url || item.href || `/${item.id || ''}`;
      if (path && !path.startsWith('/')) {
        path = '/' + path;
      }
      return {
        name: item.title || item.name || item.categoryName || '未命名',
        path: path
      };
    });
  }

  return getDefaultMenu();
});

// 移动菜单状态
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>
