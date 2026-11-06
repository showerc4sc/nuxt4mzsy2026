<template>
  <section class="border-b border-[#dce5e1] bg-[#f5f8f7]" aria-label="新闻分类">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex h-[73px] items-center gap-8 overflow-hidden" aria-label="正在加载新闻分类">
        <span v-for="i in 5" :key="i" class="h-4 w-16 shrink-0 animate-pulse rounded bg-[#dce5e1]"></span>
      </div>

      <!-- 分类列表 -->
      <nav v-else class="category-scroll flex items-stretch gap-7 overflow-x-auto sm:gap-9" aria-label="按分类浏览新闻">
        <!-- 全部选项 -->
        <button
          type="button"
          @click="selectCategory('all')"
          class="category-tab relative shrink-0 whitespace-nowrap py-6 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159a76] focus-visible:ring-offset-4"
          :class="modelValue === 'all' ? 'text-[#102b25]' : 'text-[#61716c] hover:text-[#159a76]'"
          :aria-pressed="modelValue === 'all'"
        >
          全部
          <span v-if="modelValue === 'all'" class="absolute inset-x-0 bottom-0 h-0.5 bg-[#159a76]"></span>
        </button>

        <button
          v-for="category in categories"
          :key="category._id"
          type="button"
          @click="selectCategory(category._id)"
          class="category-tab relative shrink-0 whitespace-nowrap py-6 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159a76] focus-visible:ring-offset-4"
          :class="modelValue === category._id ? 'text-[#102b25]' : 'text-[#61716c] hover:text-[#159a76]'"
          :aria-pressed="modelValue === category._id"
        >
          {{ category.title }}
          <span v-if="modelValue === category._id" class="absolute inset-x-0 bottom-0 h-0.5 bg-[#159a76]"></span>
        </button>
      </nav>

      <!-- 错误状态 -->
      <div v-if="error" class="flex items-center gap-2 border-t border-[#eadfdc] py-3 text-sm text-[#9a4c43]" role="status">
        <Icon name="heroicons:exclamation-circle" class="h-4 w-4 shrink-0" />
        <span>加载分类失败</span>
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
.category-scroll {
  scrollbar-width: thin;
  scrollbar-color: #b7c8c1 transparent;
  -webkit-overflow-scrolling: touch;
}

.category-scroll::-webkit-scrollbar {
  height: 3px;
}

.category-scroll::-webkit-scrollbar-thumb {
  background: #b7c8c1;
}

@media (prefers-reduced-motion: reduce) {
  .category-tab {
    transition: none;
  }
}
</style>
