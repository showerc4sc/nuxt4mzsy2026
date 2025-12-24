<template>
  <header class="fixed top-0 left-0 right-0 z-[101] transition-all duration-300 bg-transparent py-4"
    :class="{ 'bg-white/95 backdrop-blur-md shadow-md': isClientInitialized && isScrolled }">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="relative w-10 h-10 flex items-center justify-center">
            <img src="/images/logo.png" alt="淼泽松源" class="w-full h-full object-contain" />
          </div>
          <div>
            <span class="text-xl font-bold transition-colors duration-300 group-hover:text-eco-600"
              :class="isClientInitialized && isScrolled ? 'text-gray-900' : 'text-white'">{{ company.shortName }}</span>
            <div class="text-xs font-medium"
              :class="isClientInitialized && isScrolled ? 'text-gray-500' : 'text-white/80'">新能源科技</div>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <!-- 加载状态 -->
          <div v-if="menuPending" class="flex space-x-1">
            <div v-for="i in 5" :key="i" class="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <!-- 导航菜单项 -->
          <template v-else>
            <NuxtLink v-for="item in navigationItems" :key="item.name" :to="item.path"
              class="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg group" :class="[
                $route.path === item.path
                  ? isClientInitialized && isScrolled
                    ? 'text-eco-600'
                    : 'text-white'
                  : isClientInitialized && isScrolled
                    ? 'text-gray-700 hover:text-eco-600'
                    : 'text-white hover:text-eco-200'
              ]">
              {{ item.name }}
              <span
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-eco-600 transition-all duration-300 group-hover:w-8"
                :class="{ 'w-8': $route.path === item.path }"></span>
            </NuxtLink>
          </template>
        </div>



        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button @click="toggleMobileMenu"
            class="relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300" :class="isClientInitialized && isScrolled
              ? 'text-gray-700 hover:text-eco-600 hover:bg-gray-100'
              : 'text-white hover:text-eco-200 hover:bg-white/10'">
            <Icon v-if="!isMobileMenuOpen" name="heroicons:bars-3" class="w-6 h-6" />
            <Icon v-else name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <div v-if="isMobileMenuOpen" class="lg:hidden py-4 border-t transition-all duration-300"
          :class="isClientInitialized && isScrolled ? 'border-gray-100 bg-white' : 'border-white/20 bg-white/95 backdrop-blur-md'">
          <div class="flex flex-col space-y-2">
            <!-- 加载状态 -->
            <div v-if="menuPending" class="space-y-2">
              <div v-for="i in 5" :key="i" class="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <!-- 导航菜单项 -->
            <template v-else>
              <NuxtLink v-for="item in navigationItems" :key="item.name" :to="item.path"
                class="px-4 py-3 font-medium rounded-lg transition-all duration-300" :class="[
                  $route.path === item.path
                    ? 'text-eco-600'
                    : 'text-gray-700 hover:text-eco-600 hover:bg-eco-50'
                ]" @click="closeMobileMenu">
                {{ item.name }}
              </NuxtLink>
            </template>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
// 滚动状态
const isScrolled = ref(false);

// 客户端初始化标志
const isClientInitialized = ref(false);

// 获取默认菜单
const getDefaultMenu = () => {
  const defaultMenu = [
    { name: '首页', path: '/' },
    { name: '关于我们', path: '/about' },
    { name: '产品列表', path: '/products' },
    { name: '合作伙伴', path: '/partners' },
    { name: '联系我们', path: '/contact' }
  ];
  return defaultMenu;
};

// 监听页面滚动
onMounted(() => {
  isClientInitialized.value = true;
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
  };

  window.addEventListener('scroll', handleScroll);

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

/**
 * 获取导航菜单数据
 * 使用 useAsyncData 在 SSR 模式下获取数据
 */
const { data: menuData, pending: menuPending, error: menuError } = await useAsyncData('navigation-menu', async () => {
  const apiBase = 'https://env-00jxt6g9928j.dev-hz.cloudbasefunction.cn/http/router';
  const apiUrl = `${apiBase}/client/cms/category/pub/getList`;

  const response = await $fetch(apiUrl);

  // 直接返回 rows
  return response?.data?.rows || [];
}, {
  server: true
});

/**
 * 使用从API获取的菜单数据，如果数据为空或出错，则使用默认菜单
 */
const navigationItems = computed(() => {
  if (menuData.value && menuData.value.length > 0) {
    // 映射API响应数据到导航菜单格式
    return menuData.value.map(item => ({
      name: item.title || item.name || item.categoryName || '未命名',
      path: item.path || item.url || item.href || `/${item.id || ''}`
    }));
  }

  return getDefaultMenu();
});

// 移动菜单状态
const isMobileMenuOpen = ref(false);

// 直接导入JSON数据
const { data: companyData } = await useAsyncData('company', async () => {
  const companyJson = await import('~/data/company.json');
  return companyJson.default.company;
});

// 确保 companyData 可用
const company = computed(() => companyData.value || {});

// 切换移动菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 关闭移动菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>