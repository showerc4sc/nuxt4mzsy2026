<template>
  <section class="border-y border-[#102b25]/10 bg-[#edf3ef] py-20 sm:py-24 lg:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 标题区域 -->
      <div class="reveal mb-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#137457]">Management Team</p>
          <h2 class="text-3xl font-semibold tracking-[-0.035em] text-[#102b25] sm:text-4xl">管理层简介</h2>
        </div>
        <p class="max-w-md self-end text-base leading-8 text-[#526b61] lg:col-span-4 lg:col-start-9">专业的管理团队，引领企业持续发展</p>
      </div>

      <!-- 第一级：董事长 -->
      <div v-if="chairman" class="mb-16">
        <div class="reveal mb-6 flex items-center gap-5">
          <h3 class="shrink-0 text-sm font-semibold text-[#137457]">董事长</h3>
          <div class="h-px flex-1 bg-[#102b25]/10"></div>
        </div>
        <article class="reveal reveal-delay-1 grid overflow-hidden border border-[#102b25]/10 bg-white md:grid-cols-12">
          <div class="relative flex items-center justify-center overflow-hidden bg-[#dce9e1] px-8 py-10 md:col-span-4 md:py-14">
            <img
              :src="chairman.avatar || defaultAvatar"
              :alt="chairman.name"
              class="aspect-[4/5] w-full max-w-[15rem] object-cover"
              loading="lazy"
            />
          </div>
          <div class="flex flex-col justify-center p-7 sm:p-10 md:col-span-8 lg:p-14">
            <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#137457]">Chairman</p>
            <h4 class="text-3xl font-semibold tracking-[-0.03em] text-[#102b25]">{{ chairman.name }}</h4>
            <p class="mb-7 mt-2 text-base font-medium text-[#137457]">{{ chairman.position }}</p>
            <div class="team-resume max-w-2xl text-base leading-8 text-[#526b61]" v-html="chairman.resume"></div>
          </div>
        </article>
      </div>

      <!-- 第二级：总经理 -->
      <div v-if="generalManager" class="mb-16 lg:ml-[8.333%]">
        <div class="reveal mb-6 flex items-center gap-5">
          <h3 class="shrink-0 text-sm font-semibold text-[#137457]">总经理</h3>
          <div class="h-px flex-1 bg-[#102b25]/10"></div>
        </div>
        <article class="reveal reveal-delay-1 grid border-y border-[#102b25]/10 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10">
          <div class="mb-7 sm:col-span-3 sm:mb-0">
            <img
              :src="generalManager.avatar || defaultAvatar"
              :alt="generalManager.name"
              class="aspect-[4/5] w-40 object-cover sm:w-full sm:max-w-[12rem]"
              loading="lazy"
            />
          </div>
          <div class="sm:col-span-8 sm:col-start-5">
            <h4 class="text-2xl font-semibold tracking-[-0.025em] text-[#102b25]">{{ generalManager.name }}</h4>
            <p class="mb-5 mt-2 text-sm font-medium text-[#137457]">{{ generalManager.position }}</p>
            <div class="team-resume text-sm leading-7 text-[#526b61]" v-html="generalManager.resume"></div>
          </div>
        </article>
      </div>

      <!-- 第三级：部门经理 -->
      <div v-if="departmentManagers && departmentManagers.length > 0" class="mb-16">
        <div class="reveal mb-6 flex items-center gap-5">
          <h3 class="shrink-0 text-sm font-semibold text-[#137457]">部门经理</h3>
          <div class="h-px flex-1 bg-[#102b25]/10"></div>
        </div>
        <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(manager, index) in departmentManagers"
            :key="index"
            class="reveal group border-t border-[#102b25]/15 py-7"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="mb-6 overflow-hidden bg-[#dce9e1]">
              <img
                :src="manager.avatar || defaultAvatar"
                :alt="manager.name"
                class="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025]"
                loading="lazy"
              />
            </div>
            <h4 class="text-xl font-semibold tracking-[-0.02em] text-[#102b25]">{{ manager.name }}</h4>
            <p class="mb-4 mt-1.5 text-sm font-medium text-[#137457]">{{ manager.position }}</p>
            <div class="team-resume text-sm leading-7 text-[#526b61]" v-html="manager.resume"></div>
          </article>
        </div>
      </div>

      <!-- 第四级：合伙人 -->
      <div v-if="partners && partners.length > 0">
        <div class="reveal mb-6 flex items-center gap-5">
          <h3 class="shrink-0 text-sm font-semibold text-[#137457]">合伙人</h3>
          <div class="h-px flex-1 bg-[#102b25]/10"></div>
        </div>
        <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(partner, index) in partners"
            :key="index"
            class="reveal group border-t border-[#102b25]/15 py-7"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
          >
            <div class="mb-6 overflow-hidden bg-[#dce9e1]">
              <img
                :src="partner.avatar || defaultAvatar"
                :alt="partner.name"
                class="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025]"
                loading="lazy"
              />
            </div>
            <h4 class="text-xl font-semibold tracking-[-0.02em] text-[#102b25]">{{ partner.name }}</h4>
            <p class="mb-4 mt-1.5 text-sm font-medium text-[#137457]">{{ partner.position }}</p>
            <div class="team-resume text-sm leading-7 text-[#526b61]" v-html="partner.resume"></div>
          </article>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!chairman && !generalManager && (!departmentManagers || departmentManagers.length === 0) && (!partners || partners.length === 0)" class="flex items-center gap-4 border-y border-[#102b25]/10 py-8 text-[#526b61]">
        <Icon name="heroicons:user-group" class="h-6 w-6 shrink-0 text-[#137457]" />
        <p>暂无管理层信息</p>
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

// 滚动入场动效
useReveal();

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
.team-resume :deep(p) {
  margin-bottom: 0.75rem;
}

.team-resume :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
