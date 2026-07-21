<template>
  <div>
    <!-- 页面头部 -->
    <PageTitle slug="contact" />

    <!-- 页面内容容器 -->
    <div class="relative z-10">

    <!-- 联系信息与表单 -->
    <section class="py-32 md:py-40">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- 联系信息：Double-Bezel 卡片 -->
          <div class="reveal">
            <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-10">联系信息</h2>

            <div class="space-y-4">
              <div class="bezel group">
                <div class="bezel-inner flex items-start p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                  <div class="flex-shrink-0 w-11 h-11 bg-eco-50 rounded-2xl flex items-center justify-center text-eco-800 transition-colors duration-500 group-hover:bg-eco-800 group-hover:text-white">
                    <Icon name="heroicons:map-pin" class="w-5 h-5" />
                  </div>
                  <div class="ml-4 min-w-0 flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">公司地址</h3>
                    <p class="text-gray-600 font-light">{{ companyAddress }}</p>
                  </div>
                </div>
              </div>

              <div class="bezel group">
                <div class="bezel-inner flex items-start p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                  <div class="flex-shrink-0 w-11 h-11 bg-eco-50 rounded-2xl flex items-center justify-center text-eco-800 transition-colors duration-500 group-hover:bg-eco-800 group-hover:text-white">
                    <Icon name="heroicons:phone" class="w-5 h-5" />
                  </div>
                  <div class="ml-4 min-w-0 flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">联系电话</h3>
                    <p class="text-gray-600 font-mono tabular-nums">{{ companyTel }}</p>
                  </div>
                </div>
              </div>

              <div class="bezel group">
                <div class="bezel-inner flex items-start p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                  <div class="flex-shrink-0 w-11 h-11 bg-eco-50 rounded-2xl flex items-center justify-center text-eco-800 transition-colors duration-500 group-hover:bg-eco-800 group-hover:text-white">
                    <Icon name="heroicons:envelope" class="w-5 h-5" />
                  </div>
                  <div class="ml-4 min-w-0 flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">电子邮箱</h3>
                    <p class="text-gray-600 font-light break-all">{{ companyEmail }}</p>
                  </div>
                </div>
              </div>

              <div class="bezel group">
                <div class="bezel-inner flex items-start p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                  <div class="flex-shrink-0 w-11 h-11 bg-eco-50 rounded-2xl flex items-center justify-center text-eco-800 transition-colors duration-500 group-hover:bg-eco-800 group-hover:text-white">
                    <Icon name="heroicons:clock" class="w-5 h-5" />
                  </div>
                  <div class="ml-4 min-w-0 flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">工作时间</h3>
                    <p class="text-gray-600 font-light">{{ workTimes }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 联系表单：Double-Bezel -->
          <div class="reveal reveal-delay-1">
            <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-10">发送消息</h2>

            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- 产品咨询（如果有） -->
              <div v-if="route.query.product" class="bezel">
                <div class="bezel-inner p-4 bg-eco-50">
                  <p class="text-eco-800">
                    <span class="font-medium">咨询产品：</span>{{ route.query.product }}
                    <span v-if="route.query.category" class="text-eco-600">({{ route.query.category }})</span>
                  </p>
                </div>
              </div>

              <!-- 姓名 -->
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                  姓名 <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-5 py-3 border border-gray-200 rounded-full bg-white focus:ring-2 focus:ring-eco-400 focus:border-eco-400 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  placeholder="请输入您的姓名"
                />
              </div>

              <!-- 公司 -->
              <div>
                <label for="company" class="block text-sm font-semibold text-gray-700 mb-2">
                  公司名称
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="w-full px-5 py-3 border border-gray-200 rounded-full bg-white focus:ring-2 focus:ring-eco-400 focus:border-eco-400 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  placeholder="请输入您的公司名称"
                />
              </div>

              <!-- 电话 -->
              <div>
                <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
                  联系电话 <span class="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  class="w-full px-5 py-3 border border-gray-200 rounded-full bg-white focus:ring-2 focus:ring-eco-400 focus:border-eco-400 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  placeholder="请输入您的联系电话"
                />
              </div>

              <!-- 邮箱 -->
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                  电子邮箱 <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-5 py-3 border border-gray-200 rounded-full bg-white focus:ring-2 focus:ring-eco-400 focus:border-eco-400 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  placeholder="请输入您的电子邮箱"
                />
              </div>

              <!-- 咨询类型 -->
              <div>
                <label for="type" class="block text-sm font-semibold text-gray-700 mb-2">
                  咨询类型 <span class="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  v-model="form.type"
                  required
                  class="w-full px-5 py-3 border border-gray-200 rounded-full bg-white focus:ring-2 focus:ring-eco-400 focus:border-eco-400 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <option value="">请选择咨询类型</option>
                  <option value="product">产品咨询</option>
                  <option value="cooperation">合作洽谈</option>
                  <option value="technical">技术支持</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <!-- 留言 -->
              <div>
                <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
                  留言内容 <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  required
                  class="w-full px-5 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-eco-400 focus:border-eco-400 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] resize-none"
                  placeholder="请输入您的留言内容"
                ></textarea>
              </div>

              <!-- 提交按钮：Button-in-Button -->
              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-eco-800 pl-6 pr-2 py-3 text-base font-semibold text-white shadow-[0_8px_32px_rgba(22,101,52,0.25)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-eco-900 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-eco-400 focus-visible:ring-offset-2 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
                >
                  <span>{{ isSubmitting ? '提交中...' : '发送消息' }}</span>
                  <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                    <Icon name="heroicons:paper-airplane" class="w-4 h-4" />
                  </span>
                </button>
              </div>
            </form>

            <!-- 提交成功提示 -->
            <div v-if="showSuccessMessage" class="mt-6 bezel">
              <div class="bezel-inner p-4 bg-eco-50">
                <div class="flex items-center">
                  <Icon name="heroicons:check-circle" class="w-5 h-5 text-eco-700 mr-2" />
                  <p class="text-eco-800">感谢您的留言！我们会尽快与您联系。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 地图区域：Double-Bezel -->
    <section class="py-32 md:py-40 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="reveal mb-10 max-w-3xl">
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">公司位置</h2>
        </div>

        <div class="reveal reveal-delay-1 bezel">
          <div class="bezel-inner aspect-video bg-gray-200 overflow-hidden">
            <!-- 高德地图容器 -->
            <div ref="mapContainer" class="w-full h-full"></div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: '联系我们 - 淼泽松源（上海）科技发展有限公司',
  meta: [
    { name: 'description', content: '联系淼泽松源，了解更多关于新能源产品和解决方案的信息。' }
  ]
});

// 滚动入场动效
useReveal();

// 获取路由参数
const route = useRoute();

// 导入公司信息 composable
import { useCompanyInfo } from '~/composables/useCompanyInfo.js';

// 获取公司信息
const {
  companyAddress,
  companyTel,
  companyEmail,
  workTimes,
  companyLat,
  companyLng
} = useCompanyInfo();

// 地图容器引用
const mapContainer = ref(null);

// 初始化高德地图
onMounted(() => {
  console.log('高德地图 API 准备加载');
  if (mapContainer.value) {
    // 等待高德地图脚本加载完成后初始化地图
    const checkAMap = setInterval(() => {
      if (typeof AMap !== 'undefined'&&companyLat.value&&companyLng.value) {
        console.log('高德地图 API 加载成功',companyLat.value,companyLng.value);
        clearInterval(checkAMap);
        initMap();
      }
    }, 100);

    // 10秒后停止检查，避免无限循环
    setTimeout(() => {
      clearInterval(checkAMap);
    }, 10000);
  }
});

/**
 * 初始化地图
 */
const initMap = () => {
  if (typeof AMap !== 'undefined' && mapContainer.value) {
    const map = new AMap.Map(mapContainer.value, {
      zoom: 15,
      center: [companyLng.value, companyLat.value],
      mapStyle: 'amap://styles/normal',
      viewMode: '2D'
    });

    // 添加标记
    const marker = new AMap.Marker({
      position: [companyLng.value, companyLat.value],
      title: companyAddress.value,
      map: map
    });

    // 添加信息窗体
    const infoWindow = new AMap.InfoWindow({
      content: `
        <div style="padding: 10px; min-width: 200px;">
          <h4 style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">${companyAddress.value}</h4>
          <p style="margin: 0; color: #666;">淼泽松源（上海）科技发展有限公司</p>
        </div>
      `,
      offset: new AMap.Pixel(0, -30)
    });

    // 点击标记显示信息窗体
    marker.on('click', () => {
      infoWindow.open(map, marker.getPosition());
    });

    // 自动打开信息窗体
    infoWindow.open(map, marker.getPosition());
  }
};

// 表单数据
const form = ref({
  name: '',
  company: '',
  phone: '',
  email: '',
  type: '',
  message: ''
});

// 提交状态
const isSubmitting = ref(false);
const showSuccessMessage = ref(false);

// 如果URL中有产品参数，自动填充咨询类型
if (process.client && route.query.product) {
  form.value.type = 'product';
  form.value.message = `我对贵公司的"${route.query.product}"产品感兴趣，希望了解更多信息。`;
}

// 提交表单
const submitForm = async () => {
  isSubmitting.value = true;
  
  try {
    // 这里可以添加实际的表单提交逻辑，如发送到后端API
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 显示成功消息
    showSuccessMessage.value = true;
    
    // 重置表单
    form.value = {
      name: '',
      company: '',
      phone: '',
      email: '',
      type: '',
      message: ''
    };
    
    // 3秒后隐藏成功消息
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  } catch (error) {
    console.error('表单提交失败:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>