<template>
  <section class="relative py-8 bg-gradient-to-r from-eco-800 to-eco-900 text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-2">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </div>

      <!-- 分类列表 -->
      <div v-else class="flex flex-wrap gap-4 md:gap-8 justify-center">
        <!-- 全部选项 -->
        <button
          @click="selectCategory('all')"
          class="relative px-4 py-2 font-medium transition-all duration-300"
          :class="modelValue === 'all' ? 'text-white font-bold' : 'text-white/70 hover:text-white'"
        >
          全部
          <!-- 选中项下方的白色倒三角 -->
          <span
            v-if="modelValue === 'all'"
            class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white"
          ></span>
        </button>

        <button
          v-for="category in categories"
          :key="category._id"
          @click="selectCategory(category._id)"
          class="relative px-4 py-2 font-medium transition-all duration-300"
          :class="modelValue === category._id ? 'text-white font-bold' : 'text-white/70 hover:text-white'"
        >
          {{ category.title }}
          <!-- 选中项下方的白色倒三角 -->
          <span
            v-if="modelValue === category._id"
            class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white"
          ></span>
        </button>
      </div>

      <!-- 错误状态 -->
      <div v-if="error" class="text-center py-2 text-white/80">
        <span class="text-sm">加载分类失败</span>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 新闻分类切换组件
 * 用于显示新闻分类列表并支持切换
 * 数据通过 getChildrenCategoryBySlug API 获取
 */

import { getChildrenCategoryBySlug } from '~/api/category';

/**
 * 定义组件属性
 */
const props = defineProps({
  /**
   * 父分类slug
   * @type {String}
   * @default 'news'
   */
  slug: {
    type: String,
    default: 'news'
  },
  /**
   * 当前选中的分类ID（v-model）
   * @type {String}
   */
  modelValue: {
    type: String,
    default: ''
  }
});

/**
 * 定义组件事件
 */
const emit = defineEmits(['update:modelValue', 'change']);

/**
 * 使用API获取子分类列表
 */
const { data: categoryData, pending, error } = await useAsyncData(
  `news-categories-${props.slug}`,
  async () => {
    try {
      const response = await getChildrenCategoryBySlug(props.slug);
      console.log('新闻分类数据:', response);
      return response || { rows: [], total: 0 };
    } catch (err) {
      console.error('获取新闻分类失败:', err);
      return { rows: [], total: 0 };
    }
  },
  {
    server: true
  }
);

/**
 * 分类列表
 * 从返回数据中提取rows
 */
const categories = computed(() => {
  if (!categoryData.value?.rows) return [];
  return categoryData.value.rows.filter(item => item.enable !== false);
});

/**
 * 默认选中"全部"
 */
watchEffect(() => {
  if (!props.modelValue) {
    emit('update:modelValue', 'all');
    emit('change', { _id: 'all', title: '全部', slug: props.slug });
  }
});

/**
 * 选择分类
 * @param {String} categoryId - 分类ID
 */
const selectCategory = (categoryId) => {
  if (categoryId === props.modelValue) return;

  emit('update:modelValue', categoryId);

  // 找到选中的分类对象并触发change事件
  if (categoryId === 'all') {
    emit('change', { _id: 'all', title: '全部', slug: props.slug });
  } else {
    const selectedCategory = categories.value.find(c => c._id === categoryId);
    if (selectedCategory) {
      emit('change', selectedCategory);
    }
  }
};

/**
 * 获取当前选中的分类对象
 * @returns {Object|null}
 */
const getSelectedCategory = () => {
  return categories.value.find(c => c._id === props.modelValue) || null;
};

/**
 * 根据ID获取分类
 * @param {String} categoryId - 分类ID
 * @returns {Object|null}
 */
const getCategoryById = (categoryId) => {
  return categories.value.find(c => c._id === categoryId) || null;
};

/**
 * 暴露方法给父组件
 */
defineExpose({
  getSelectedCategory,
  getCategoryById,
  categories,
  pending,
  error
});
</script>

<style scoped>
/* 组件特定样式 */
</style>
