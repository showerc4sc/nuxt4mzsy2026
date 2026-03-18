<template>
  <section class="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
    <!-- 背景装饰 - 点阵纹理 -->
    <div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 24px 24px;"></div>
    
    <!-- 背景光晕装饰 -->
    <div class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-eco-100/20 rounded-full filter blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-100/20 rounded-full filter blur-3xl pointer-events-none"></div>
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- 标题区域 -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-eco-500 to-eco-600 rounded-2xl mb-8 shadow-xl shadow-eco-500/20 relative">
          <Icon name="heroicons:user-group" class="w-10 h-10 text-white" />
          <div class="absolute -top-1 -right-1 w-6 h-6 bg-eco-400 rounded-full border-4 border-white"></div>
        </div>
        <span class="text-eco-600 text-sm font-semibold uppercase tracking-[0.2em] block mb-4">Management Team</span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">管理层简介</h2>
        <div class="w-24 h-1.5 bg-gradient-to-r from-eco-400 via-eco-500 to-eco-400 rounded-full mx-auto mb-6"></div>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">专业的管理团队，引领企业持续发展</p>
      </div>

      <!-- 第一级：董事长 -->
      <div v-if="chairman" class="mb-20">
        <div class="flex items-center mb-10">
          <div class="flex items-center gap-3 px-6 py-2 bg-eco-50 rounded-full border border-eco-100">
            <div class="w-2 h-2 bg-eco-500 rounded-full"></div>
            <h3 class="text-lg font-bold text-eco-700 tracking-wide">董事长</h3>
          </div>
          <div class="flex-1 h-px bg-gradient-to-r from-eco-200 via-eco-100 to-transparent ml-6"></div>
        </div>
        
        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-[2rem] p-10 md:p-14 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] border border-eco-50 hover:shadow-[0_25px_70px_-15px_rgba(16,185,129,0.25)] transition-all duration-500 relative overflow-hidden group">
            <!-- 卡片装饰 -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-eco-50 to-transparent rounded-bl-[100px] opacity-50"></div>
            
            <div class="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
              <!-- 头像区域 -->
              <div class="relative flex-shrink-0">
                <!-- 外层光晕 -->
                <div class="absolute inset-0 bg-eco-400/20 rounded-full blur-2xl scale-110"></div>
                <!-- 头像容器 -->
                <div class="relative w-44 h-44 rounded-full bg-gradient-to-br from-eco-400 via-eco-500 to-eco-600 p-1.5 shadow-2xl shadow-eco-500/30">
                  <img 
                    :src="chairman.avatar || defaultAvatar" 
                    :alt="chairman.name"
                    class="w-full h-full rounded-full object-cover bg-white border-4 border-white"
                  />
                </div>
                <!-- 职位徽章 -->
                <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gradient-to-r from-eco-500 to-eco-600 text-white text-xs font-bold rounded-full shadow-lg border-2 border-white">
                  <span class="flex items-center gap-1.5">
                    <Icon name="heroicons:star-solid" class="w-3 h-3" />
                    董事长
                  </span>
                </div>
              </div>
              
              <!-- 信息区域 -->
              <div class="flex-1 text-center md:text-left">
                <h4 class="text-3xl font-bold text-gray-900 mb-2">{{ chairman.name }}</h4>
                <p class="text-eco-600 font-semibold mb-6 text-lg">{{ chairman.position }}</p>
                <div class="prose prose-lg prose-gray text-gray-600 leading-relaxed max-w-none" v-html="chairman.resume"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二级：总经理 -->
      <div v-if="generalManager" class="mb-20">
        <div class="flex items-center mb-10">
          <div class="flex items-center gap-3 px-6 py-2 bg-blue-50 rounded-full border border-blue-100">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h3 class="text-lg font-bold text-blue-700 tracking-wide">总经理</h3>
          </div>
          <div class="flex-1 h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent ml-6"></div>
        </div>
        
        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-[2rem] p-10 md:p-12 shadow-[0_16px_50px_-12px_rgba(59,130,246,0.12)] border border-blue-50 hover:shadow-[0_20px_60px_-12px_rgba(59,130,246,0.2)] transition-all duration-500 relative overflow-hidden group">
            <!-- 卡片装饰 -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[100px] opacity-50"></div>
            
            <div class="flex flex-col md:flex-row items-center md:items-start gap-9 relative z-10">
              <!-- 头像区域 -->
              <div class="relative flex-shrink-0">
                <!-- 外层光晕 -->
                <div class="absolute inset-0 bg-blue-400/20 rounded-full blur-xl scale-110"></div>
                <!-- 头像容器 -->
                <div class="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-1.5 shadow-xl shadow-blue-500/25">
                  <img 
                    :src="generalManager.avatar || defaultAvatar" 
                    :alt="generalManager.name"
                    class="w-full h-full rounded-full object-cover bg-white border-4 border-white"
                  />
                </div>
                <!-- 职位徽章 -->
                <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full shadow-lg border-2 border-white">
                  总经理
                </div>
              </div>
              
              <!-- 信息区域 -->
              <div class="flex-1 text-center md:text-left">
                <h4 class="text-2xl font-bold text-gray-900 mb-2">{{ generalManager.name }}</h4>
                <p class="text-blue-600 font-semibold mb-5 text-lg">{{ generalManager.position }}</p>
                <div class="prose prose-gray text-gray-600 leading-relaxed max-w-none" v-html="generalManager.resume"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第三级：部门经理 -->
      <div v-if="departmentManagers && departmentManagers.length > 0" class="mb-20">
        <div class="flex items-center mb-10">
          <div class="flex items-center gap-3 px-6 py-2 bg-purple-50 rounded-full border border-purple-100">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <h3 class="text-lg font-bold text-purple-700 tracking-wide">部门经理</h3>
          </div>
          <div class="flex-1 h-px bg-gradient-to-r from-purple-200 via-purple-100 to-transparent ml-6"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div 
            v-for="(manager, index) in departmentManagers" 
            :key="index"
            class="bg-white rounded-2xl p-7 shadow-[0_4px_20px_-2px_rgba(147,51,234,0.08)] hover:shadow-[0_12px_40px_-4px_rgba(147,51,234,0.15)] transition-all duration-400 border border-gray-100/80 hover:border-purple-100 cursor-pointer group relative overflow-hidden"
          >
            <!-- 卡片装饰 -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50/50 to-transparent rounded-bl-[80px]"></div>
            
            <div class="flex flex-col items-center text-center relative z-10">
              <!-- 头像 -->
              <div class="relative mb-5">
                <div class="w-32 h-32 rounded-full bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500 p-1 shadow-lg shadow-purple-200/50 group-hover:shadow-purple-300/60 transition-all duration-400">
                  <img 
                    :src="manager.avatar || defaultAvatar" 
                    :alt="manager.name"
                    class="w-full h-full rounded-full object-cover bg-white border-4 border-white"
                  />
                </div>
              </div>
              
              <!-- 信息 -->
              <h4 class="text-xl font-bold text-gray-900 mb-2">{{ manager.name }}</h4>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 rounded-full mb-4">
                <Icon name="heroicons:briefcase-solid" class="w-3.5 h-3.5 text-purple-500" />
                <p class="text-purple-600 font-semibold text-sm">{{ manager.position }}</p>
              </div>
              <div class="text-sm text-gray-600 leading-relaxed line-clamp-3" v-html="manager.resume"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第四级：合伙人 -->
      <div v-if="partners && partners.length > 0">
        <div class="flex items-center mb-10">
          <div class="flex items-center gap-3 px-6 py-2 bg-amber-50 rounded-full border border-amber-100">
            <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
            <h3 class="text-lg font-bold text-amber-700 tracking-wide">合伙人</h3>
          </div>
          <div class="flex-1 h-px bg-gradient-to-r from-amber-200 via-amber-100 to-transparent ml-6"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div 
            v-for="(partner, index) in partners" 
            :key="index"
            class="bg-white rounded-2xl p-7 shadow-[0_4px_20px_-2px_rgba(245,158,11,0.08)] hover:shadow-[0_12px_40px_-4px_rgba(245,158,11,0.15)] transition-all duration-400 border border-gray-100/80 hover:border-amber-100 cursor-pointer group relative overflow-hidden"
          >
            <!-- 卡片装饰 -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-50/50 to-transparent rounded-bl-[80px]"></div>
            
            <div class="flex flex-col items-center text-center relative z-10">
              <!-- 头像 -->
              <div class="relative mb-5">
                <div class="w-32 h-32 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 p-1 shadow-lg shadow-amber-200/50 group-hover:shadow-amber-300/60 transition-all duration-400">
                  <img 
                    :src="partner.avatar || defaultAvatar" 
                    :alt="partner.name"
                    class="w-full h-full rounded-full object-cover bg-white border-4 border-white"
                  />
                </div>
              </div>
              
              <!-- 信息 -->
              <h4 class="text-xl font-bold text-gray-900 mb-2">{{ partner.name }}</h4>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full mb-4">
                <Icon name="heroicons:handshake-solid" class="w-3.5 h-3.5 text-amber-500" />
                <p class="text-amber-600 font-semibold text-sm">{{ partner.position }}</p>
              </div>
              <div class="text-sm text-gray-600 leading-relaxed line-clamp-3" v-html="partner.resume"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 管理层简介组件
 * 展示公司管理团队的4级架构：
 * - 第一级：董事长
 * - 第二级：总经理
 * - 第三级：部门经理
 * - 第四级：合伙人
 */

import { getArticleBySlug } from '~/api/article';

/**
 * 默认头像
 */
const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=10B981&color=fff&size=200';

/**
 * 获取董事长信息
 */
const { data: chairmanData } = useAsyncData('chairman-info', async () => {
  try {
    const response = await getArticleBySlug('dong-shi-zhang');
    return response || null;
  } catch (err) {
    console.error('获取董事长信息失败:', err);
    return null;
  }
}, {
  server: true
});

/**
 * 获取总经理信息
 */
const { data: generalManagerData } = useAsyncData('general-manager-info', async () => {
  try {
    const response = await getArticleBySlug('zong-jing-li');
    return response || null;
  } catch (err) {
    console.error('获取总经理信息失败:', err);
    return null;
  }
}, {
  server: true
});

/**
 * 获取部门经理信息
 */
const { data: departmentManagersData } = useAsyncData('department-managers-info', async () => {
  try {
    const response = await getArticleBySlug('bu-men-jing-li');
    return response || null;
  } catch (err) {
    console.error('获取部门经理信息失败:', err);
    return null;
  }
}, {
  server: true
});

/**
 * 获取合伙人信息
 */
const { data: partnersData } = useAsyncData('partners-info', async () => {
  try {
    const response = await getArticleBySlug('he-huo-ren');
    return response || null;
  } catch (err) {
    console.error('获取合伙人信息失败:', err);
    return null;
  }
}, {
  server: true
});

/**
 * 董事长信息
 */
const chairman = computed(() => {
  if (!chairmanData.value?.attrList || chairmanData.value.attrList.length === 0) {
    return null;
  }
  
  const attr = chairmanData.value.attrList[0];
  return {
    name: attr.attrName || '张明远',
    position: attr.attrValue || '董事长',
    avatar: attr.attrImg || '',
    resume: attr.attrEx ? `<p>${attr.attrEx.split('。').filter(s => s.trim()).join('。</p><p>')}</p>` : ''
  };
});

/**
 * 总经理信息
 */
const generalManager = computed(() => {
  if (!generalManagerData.value?.attrList || generalManagerData.value.attrList.length === 0) {
    return null;
  }
  
  const attr = generalManagerData.value.attrList[0];
  return {
    name: attr.attrName || '李华军',
    position: attr.attrValue || '总经理',
    avatar: attr.attrImg || '',
    resume: attr.attrEx ? `<p>${attr.attrEx.split('。').filter(s => s.trim()).join('。</p><p>')}</p>` : ''
  };
});

/**
 * 部门经理信息
 */
const departmentManagers = computed(() => {
  if (!departmentManagersData.value?.attrList || departmentManagersData.value.attrList.length === 0) {
    return [];
  }
  
  return departmentManagersData.value.attrList.map(attr => ({
    name: attr.attrName || '',
    position: attr.attrValue || '',
    avatar: attr.attrImg || '',
    resume: attr.attrEx ? `<p>${attr.attrEx.split('。').filter(s => s.trim()).join('。</p><p>')}</p>` : ''
  }));
});

/**
 * 合伙人信息
 */
const partners = computed(() => {
  if (!partnersData.value?.attrList || partnersData.value.attrList.length === 0) {
    return [];
  }
  
  return partnersData.value.attrList.map(attr => ({
    name: attr.attrName || '',
    position: attr.attrValue || '合伙人',
    avatar: attr.attrImg || '',
    resume: attr.attrEx ? `<p>${attr.attrEx.split('。').filter(s => s.trim()).join('。</p><p>')}</p>` : ''
  }));
});
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.8;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 平滑过渡 */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
