<template>
  <div>
    <!-- 页面头部 -->
    <section class="relative pt-40 pb-24 text-white overflow-hidden" style="background-image: url('https://picsum.photos/seed/mzsy-contact/1920/1080.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
      <!-- 深色遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-br from-eco-900/85 to-primary-900/80"></div>
      <!-- 装饰性光晕 -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">联系我们</h1>
        <p class="text-xl max-w-3xl">
          我们期待与您的合作，共同推动绿色能源发展
        </p>
      </div>
    </section>

    <!-- 页面内容容器 -->
    <div class="relative z-10">

    <!-- 联系信息与表单 -->
    <section class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- 联系信息 -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-8">联系信息</h2>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-eco-100 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:map-pin" class="w-6 h-6 text-eco-600" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">公司地址</h3>
                  <p class="text-gray-600">{{ contactData.address }}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-eco-100 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:phone" class="w-6 h-6 text-eco-600" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">联系电话</h3>
                  <p class="text-gray-600">{{ contactData.phone }}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-eco-100 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:envelope" class="w-6 h-6 text-eco-600" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">电子邮箱</h3>
                  <p class="text-gray-600">{{ contactData.email }}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-eco-100 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:clock" class="w-6 h-6 text-eco-600" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">工作时间</h3>
                  <p class="text-gray-600">{{ contactData.workingHours }}</p>
                </div>
              </div>
            </div>
            
            <!-- 社交媒体 -->
            <div class="mt-10">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">关注我们</h3>
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-eco-100 transition-colors duration-200">
                  <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 text-gray-600 hover:text-eco-600" />
                </a>
                <a href="#" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-eco-100 transition-colors duration-200">
                  <Icon name="heroicons:link" class="w-5 h-5 text-gray-600 hover:text-eco-600" />
                </a>
                <a href="#" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-eco-100 transition-colors duration-200">
                  <Icon name="heroicons:share" class="w-5 h-5 text-gray-600 hover:text-eco-600" />
                </a>
              </div>
            </div>
          </div>
          
          <!-- 联系表单 -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-8">发送消息</h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- 产品咨询（如果有） -->
              <div v-if="route.query.product" class="p-4 bg-eco-50 rounded-lg">
                <p class="text-eco-800">
                  <span class="font-medium">咨询产品：</span>{{ route.query.product }}
                  <span v-if="route.query.category" class="text-eco-600">({{ route.query.category }})</span>
                </p>
              </div>
              
              <!-- 姓名 -->
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2 font-display">
                  姓名 <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-500/50 focus:border-eco-500 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-sans"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <!-- 公司 -->
              <div>
                <label for="company" class="block text-sm font-semibold text-gray-700 mb-2 font-display">
                  公司名称
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-500/50 focus:border-eco-500 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-sans"
                  placeholder="请输入您的公司名称"
                />
              </div>
              
              <!-- 电话 -->
              <div>
                <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2 font-display">
                  联系电话 <span class="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-500/50 focus:border-eco-500 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-sans"
                  placeholder="请输入您的联系电话"
                />
              </div>
              
              <!-- 邮箱 -->
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2 font-display">
                  电子邮箱 <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-500/50 focus:border-eco-500 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-sans"
                  placeholder="请输入您的电子邮箱"
                />
              </div>
              
              <!-- 咨询类型 -->
              <div>
                <label for="type" class="block text-sm font-semibold text-gray-700 mb-2 font-display">
                  咨询类型 <span class="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  v-model="form.type"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-500/50 focus:border-eco-500 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-sans"
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
                <label for="message" class="block text-sm font-semibold text-gray-700 mb-2 font-display">
                  留言内容 <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-500/50 focus:border-eco-500 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-sans resize-none"
                  placeholder="请输入您的留言内容"
                ></textarea>
              </div>
              
              <!-- 提交按钮 -->
              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="group relative w-full px-6 py-4 bg-gradient-to-r from-eco-600 to-eco-500 text-white font-semibold rounded-xl hover:from-eco-700 hover:to-eco-600 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-display"
                >
                  <span class="relative z-10">{{ isSubmitting ? '提交中...' : '发送消息' }}</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
            
            <!-- 提交成功提示 -->
            <div v-if="showSuccessMessage" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-600 mr-2" />
                <p class="text-green-800">感谢您的留言！我们会尽快与您联系。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 地图区域 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-8">公司位置</h2>
        
        <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <!-- 这里可以集成真实的地图API，如百度地图、高德地图等 -->
          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-eco-100 to-primary-100">
            <div class="text-center">
              <Icon name="heroicons:map" class="w-16 h-16 text-eco-600 mx-auto mb-4" />
              <p class="text-lg text-gray-700 mb-2">{{ contactData.address }}</p>
              <p class="text-gray-600">地图加载中...</p>
            </div>
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

// 获取路由参数
const route = useRoute();

// 直接导入JSON数据
const { data: contactData } = await useAsyncData('contact', async () => {
  const companyJson = await import('~/data/company.json');
  return companyJson.default.contact;
});

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