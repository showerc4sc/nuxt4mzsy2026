<template>
  <div class="min-h-screen bg-[#f8faf9] text-[#102b25]">
    <!-- 页面头部 -->
    <PageTitle slug="contact" />

    <!-- 页面内容容器 -->
    <div class="relative z-10">
      <!-- 联系信息与表单 -->
      <section class="py-14 sm:py-20 lg:py-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-24">
            <!-- 联系信息 -->
            <div class="reveal lg:col-span-5">
              <div class="lg:sticky lg:top-28">
                <h2 class="text-3xl font-semibold tracking-tight text-[#102b25] sm:text-4xl">联系信息</h2>
                <p class="mt-4 text-sm leading-7 text-[#61716c]">欢迎就产品、技术与合作事宜与我们联系</p>

                <address class="mt-9 divide-y divide-[#dce5e1] border-y border-[#dce5e1] not-italic">
                  <div class="group flex items-start gap-4 py-6">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e7f0ec] text-[#159a76]">
                      <Icon name="heroicons:map-pin" class="h-5 w-5" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <h3 class="text-sm font-semibold text-[#102b25]">公司地址</h3>
                      <p class="mt-2 break-words text-sm leading-7 text-[#52665e]">{{ companyAddress }}</p>
                    </div>
                  </div>

                  <div class="group flex items-start gap-4 py-6">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e7f0ec] text-[#159a76]">
                      <Icon name="heroicons:phone" class="h-5 w-5" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <h3 class="text-sm font-semibold text-[#102b25]">联系电话</h3>
                      <p class="mt-2 break-words font-mono text-sm tabular-nums text-[#52665e]">{{ companyTel }}</p>
                    </div>
                  </div>

                  <div class="group flex items-start gap-4 py-6">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e7f0ec] text-[#159a76]">
                      <Icon name="heroicons:envelope" class="h-5 w-5" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <h3 class="text-sm font-semibold text-[#102b25]">电子邮箱</h3>
                      <p class="mt-2 break-all text-sm leading-7 text-[#52665e]">{{ companyEmail }}</p>
                    </div>
                  </div>

                  <div class="group flex items-start gap-4 py-6">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e7f0ec] text-[#159a76]">
                      <Icon name="heroicons:clock" class="h-5 w-5" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <h3 class="text-sm font-semibold text-[#102b25]">工作时间</h3>
                      <p class="mt-2 text-sm leading-7 text-[#52665e]">{{ workTimes }}</p>
                    </div>
                  </div>
                </address>
              </div>
            </div>

            <!-- 联系表单 -->
            <div class="reveal reveal-delay-1 lg:col-span-7">
              <div class="border border-[#dce5e1] bg-white p-5 sm:rounded-lg sm:p-8 lg:p-10">
                <div class="mb-8 border-b border-[#e3eae7] pb-6">
                  <h2 class="text-2xl font-semibold tracking-tight text-[#102b25] sm:text-3xl">发送消息</h2>
                  <p class="mt-3 text-sm leading-6 text-[#61716c]">请填写以下信息，带 <span class="text-[#a55348]">*</span> 为必填项</p>
                </div>

                <form @submit.prevent="submitForm" class="space-y-6">
                  <!-- 产品咨询（如果有） -->
                  <div v-if="route.query.product" class="rounded-md bg-[#edf4f1] p-4" role="status">
                    <p class="break-words text-sm leading-6 text-[#294a40]">
                      <span class="font-semibold">咨询产品：</span>{{ route.query.product }}
                      <span v-if="route.query.category" class="text-[#52665e]">({{ route.query.category }})</span>
                    </p>
                  </div>

                  <!-- 姓名 -->
                  <div>
                    <label for="name" class="mb-2 block text-sm font-semibold text-[#294a40]">
                      姓名 <span class="text-[#a55348]">*</span>
                    </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      autocomplete="name"
                      class="contact-input"
                      placeholder="请输入您的姓名"
                    />
                  </div>

                  <!-- 公司 -->
                  <div>
                    <label for="company" class="mb-2 block text-sm font-semibold text-[#294a40]">
                      公司名称
                    </label>
                    <input
                      id="company"
                      v-model="form.company"
                      type="text"
                      autocomplete="organization"
                      class="contact-input"
                      placeholder="请输入您的公司名称"
                    />
                  </div>

                  <!-- 电话 -->
                  <div>
                    <label for="phone" class="mb-2 block text-sm font-semibold text-[#294a40]">
                      联系电话 <span class="text-[#a55348]">*</span>
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      required
                      autocomplete="tel"
                      class="contact-input"
                      placeholder="请输入您的联系电话"
                    />
                  </div>

                  <!-- 邮箱 -->
                  <div>
                    <label for="email" class="mb-2 block text-sm font-semibold text-[#294a40]">
                      电子邮箱 <span class="text-[#a55348]">*</span>
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      autocomplete="email"
                      class="contact-input"
                      placeholder="请输入您的电子邮箱"
                    />
                  </div>

                  <!-- 咨询类型 -->
                  <div>
                    <label for="type" class="mb-2 block text-sm font-semibold text-[#294a40]">
                      咨询类型 <span class="text-[#a55348]">*</span>
                    </label>
                    <select
                      id="type"
                      v-model="form.type"
                      required
                      class="contact-input"
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
                    <label for="message" class="mb-2 block text-sm font-semibold text-[#294a40]">
                      留言内容 <span class="text-[#a55348]">*</span>
                    </label>
                    <textarea
                      id="message"
                      v-model="form.message"
                      rows="5"
                      required
                      class="contact-input min-h-32 resize-y"
                      placeholder="请输入您的留言内容"
                    ></textarea>
                  </div>

                  <!-- 提交按钮 -->
                  <div class="pt-1">
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#102b25] px-6 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#159a76] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159a76] focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:bg-[#8b9c95]"
                    >
                      <Icon v-if="isSubmitting" name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
                      <span>{{ isSubmitting ? '提交中...' : '发送消息' }}</span>
                      <Icon v-if="!isSubmitting" name="heroicons:paper-airplane" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>

                <!-- 提交成功提示 -->
                <div v-if="showSuccessMessage" class="mt-6 flex items-start gap-3 rounded-md border border-[#bdd8cd] bg-[#edf6f2] p-4" role="status" aria-live="polite">
                  <Icon name="heroicons:check-circle" class="mt-0.5 h-5 w-5 shrink-0 text-[#12805f]" />
                  <p class="text-sm leading-6 text-[#244d3f]">感谢您的留言！我们会尽快与您联系。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 地图区域 -->
      <section class="border-t border-[#dce5e1] bg-[#f1f5f3] py-14 sm:py-20 lg:py-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="reveal mb-8 max-w-3xl sm:mb-10">
            <h2 class="text-3xl font-semibold tracking-tight text-[#102b25] sm:text-4xl">公司位置</h2>
            <p class="mt-4 break-words text-sm leading-7 text-[#52665e]">{{ companyAddress }}</p>
          </div>

          <div class="reveal reveal-delay-1 overflow-hidden rounded-lg border border-[#cfdad5] bg-[#e3eae7]">
            <div class="aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/7]">
              <!-- 高德地图容器 -->
              <div ref="mapContainer" class="h-full w-full"></div>
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

<style scoped>
.contact-input {
  display: block;
  width: 100%;
  min-height: 3rem;
  padding: 0.75rem 0.875rem;
  border: 1px solid #bdcec6;
  border-radius: 0.375rem;
  outline: none;
  background: #fff;
  color: #102b25;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 200ms, box-shadow 200ms, background-color 200ms;
}

/* 原生 select 需要自带下拉箭头，否则与输入框视觉不一致 */
select.contact-input {
  appearance: none;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23385b4d'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.15rem;
  cursor: pointer;
}

.contact-input::placeholder {
  color: #71827b;
  opacity: 1;
}

.contact-input:hover {
  border-color: #829b90;
}

.contact-input:focus {
  border-color: #159a76;
  box-shadow: 0 0 0 3px rgb(21 154 118 / 0.16);
}

.contact-input:user-invalid {
  border-color: #b15e52;
}

.contact-input:user-invalid:focus {
  box-shadow: 0 0 0 3px rgb(177 94 82 / 0.13);
}

.contact-input:disabled {
  cursor: not-allowed;
  background: #edf2ef;
  color: #61716c;
}

@media (prefers-reduced-motion: reduce) {
  .contact-input {
    transition: none;
  }
}
</style>