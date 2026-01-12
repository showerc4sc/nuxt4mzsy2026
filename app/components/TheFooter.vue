<template>
  <footer class="bg-gray-900 text-white relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-0 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
    </div>
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- 公司信息 -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-3 mb-6">
            <div class="relative w-12 h-12 flex items-center justify-center">
              <img src="/images/logo.png" alt="淼泽松源" class="w-full h-full object-contain" />
            </div>
            <div>
              <h3 class="text-xl font-bold">{{ company.name }}</h3>
              <div class="text-sm text-gray-400 font-medium">新能源科技</div>
            </div>
          </div>
          <p class="text-gray-300 mb-8 max-w-md leading-relaxed">
            {{ company.description }}
          </p>
          
          <!-- 社交媒体链接 -->
          <div class="hidden">
            <!-- 已隐藏社交媒体链接 -->
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="text-lg font-semibold mb-6 relative pb-3">
            快速链接
            <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-eco-500"></span>
          </h3>
          <ul class="space-y-3">
            <li v-for="item in navigationItems" :key="item.name">
              <NuxtLink
                :to="item.path"
                class="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
              >
                <Icon name="heroicons:chevron-right" class="w-4 h-4 mr-2 text-eco-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 联系信息 -->
        <div>
          <h3 class="text-lg font-semibold mb-6 relative pb-3">
            联系我们
            <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-eco-500"></span>
          </h3>
          <ul class="space-y-4 text-gray-300">
            <li class="flex items-start group">
              <div class="w-10 h-10 bg-gray-800 group-hover:bg-eco-600 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 flex-shrink-0">
                <Icon name="heroicons:map-pin" class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <span class="pt-2.5">{{ contactData.address }}</span>
            </li>
            <li class="flex items-center group">
              <div class="w-10 h-10 bg-gray-800 group-hover:bg-eco-600 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 flex-shrink-0">
                <Icon name="heroicons:phone" class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <span>{{ contactData.phone }}</span>
            </li>
            <li class="flex items-center group">
              <div class="w-10 h-10 bg-gray-800 group-hover:bg-eco-600 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 flex-shrink-0">
                <Icon name="heroicons:envelope" class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <span>{{ contactData.email }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-center items-center">
          <p class="text-gray-400 text-center">
            &copy; {{ currentYear }} {{ company.name }}. 保留所有权利.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useCompanyInfo } from '~/composables/useCompanyInfo.js';

// 获取当前年份
const currentYear = new Date().getFullYear();

// 获取公司信息
const {
  companyName,
  companySummary,
  companyAddress,
  companyTel,
  companyEmail
} = useCompanyInfo()

// 公司信息
const company = computed(() => ({
  name: companyName.value || '淼泽松源',
  description: companySummary.value || '淼泽松源（上海）科技发展有限公司，聚焦甲醇新能源、风能等核心技术研发，同步开展能源储存及设备销售、租赁等多元业态。'
}));

// 导航菜单项
const navigationItems = [
  { name: '首页', path: '/' },
  { name: '产品列表', path: '/products' },
  { name: '合作伙伴', path: '/partners' },
  { name: '联系我们', path: '/contact' }
];

// 联系信息 - 从 API 返回的顶层字段中获取
const contactData = computed(() => ({
  address: companyAddress.value || '上海市浦东新区',
  phone: companyTel.value || '021-12345678',
  email: companyEmail.value || 'contact@example.com'
}));
</script>