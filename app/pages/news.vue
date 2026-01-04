<template>
  <div>
    <!-- 页面标题 -->
    <section class="relative pt-40 pb-24 text-white overflow-hidden"
      style="background-image: url('https://picsum.photos/seed/mzsy-news/1920/1080.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
      <!-- 深色遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-br from-eco-900/85 to-primary-900/80"></div>
      <!-- 装饰性光晕 -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">新闻中心</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          了解最新的公司动态和行业资讯
        </p>
      </div>
    </section>

    <!-- 页面内容容器 -->
    <div class="relative z-10">
      <!-- 新闻分类切换 -->
      <section class="relative py-8 bg-gradient-to-r from-eco-800 to-eco-900 text-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap gap-8 justify-center">
            <button v-for="category in categories" :key="category.id" @click="currentCategory = category.id"
              class="relative px-4 py-2 font-medium transition-all duration-300"
              :class="currentCategory === category.id ? 'text-white font-bold' : 'text-white/70 hover:text-white'">
              {{ category.name }}
              <!-- 选中项下方的白色倒三角 -->
              <span v-if="currentCategory === category.id"
                class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white"></span>
            </button>
          </div>
        </div>
        <!-- 白色倒三角延伸到新闻列表 -->
      </section>

      <!-- 新闻列表 -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-5xl mx-auto">
            <!-- 新闻卡片列表 -->
            <div class="space-y-6">
              <NuxtLink v-for="news in currentNews" :key="news.id" :to="`/newsDetail/${news.id}`"
                class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group block">
                <div class="flex flex-col md:flex-row">
                  <!-- 新闻图片 -->
                  <div class="md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <img :src="news.image" :alt="news.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onerror="this.src='https://picsum.photos/seed/news/800/500.jpg'" />
                  </div>
                  <!-- 新闻内容 -->
                  <div class="flex-1 p-6">
                    <div class="flex items-center justify-between mb-3">
                      <span :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        getCategoryColor(news.category)
                      ]">
                        {{ news.category }}
                      </span>
                      <span class="text-sm text-gray-500">
                        {{ news.date }}
                      </span>
                    </div>
                    <h3
                      class="text-xl font-bold text-gray-900 mb-3 group-hover:text-eco-600 transition-colors duration-300">
                      {{ news.title }}
                    </h3>
                    <p class="text-gray-600 line-clamp-2 mb-4">
                      {{ news.summary }}
                    </p>
                    <div
                      class="flex items-center text-eco-600 font-medium group-hover:text-eco-700 transition-colors duration-300">
                      阅读更多
                      <Icon name="heroicons:arrow-right"
                        class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- 分页 -->
            <div class="mt-12 flex justify-center items-center space-x-2">
              <button @click="currentPage > 1 && currentPage--" :disabled="currentPage === 1" :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              ]">
                上一页
              </button>

              <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
                'w-10 h-10 rounded-lg font-medium transition-all duration-300',
                currentPage === page
                  ? 'bg-eco-600 text-white shadow-lg shadow-eco-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              ]">
                {{ page }}
              </button>

              <button @click="currentPage < totalPages && currentPage++" :disabled="currentPage === totalPages" :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              ]">
                下一页
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// 新闻分类
const categories = ref([
  { id: 'all', name: '全部' },
  { id: '公司新闻', name: '公司新闻' },
  { id: '现场考察', name: '现场考察' },
  { id: '媒体报道', name: '媒体报道' },
  { id: '行业新闻', name: '行业新闻' }
]);

// 当前选中的分类
const currentCategory = ref('all');

// 当前页码
const currentPage = ref(1);

// 每页显示的新闻数量
const pageSize = ref(6);

// 新闻数据
const newsData = ref([
  {
    id: 1,
    title: '淼泽松源荣获2024年度新能源技术创新奖',
    summary: '凭借在甲醇新能源领域的突出贡献，我司荣获2024年度新能源技术创新奖',
    image: 'https://picsum.photos/seed/news1/800/500.jpg',
    category: '公司新闻',
    date: '2024-12-20',
    featured: true
  },
  {
    id: 2,
    title: '新一代甲醇燃料电池技术取得重大突破',
    summary: '我司研发团队在甲醇燃料电池效率提升方面取得重大技术突破',
    image: 'https://picsum.photos/seed/news2/800/500.jpg',
    category: '技术动态',
    date: '2024-12-18',
    featured: true
  },
  {
    id: 3,
    title: '与多家能源企业达成战略合作协议',
    summary: '与国内多家知名能源企业签署战略合作协议，共同推进新能源产业发展',
    image: 'https://picsum.photos/seed/news3/800/500.jpg',
    category: '公司新闻',
    date: '2024-12-15',
    featured: true
  },
  {
    id: 4,
    title: '参加2024国际新能源展览会并发表主题演讲',
    summary: '我司受邀参加2024国际新能源展览会，CEO发表主题演讲',
    image: 'https://picsum.photos/seed/news4/800/500.jpg',
    category: '媒体报道',
    date: '2024-12-10',
    featured: true
  },
  {
    id: 5,
    title: '公司获得ISO9001质量管理体系认证',
    summary: '经过严格审核，公司成功获得ISO9001质量管理体系认证',
    image: 'https://picsum.photos/seed/news5/800/500.jpg',
    category: '公司新闻',
    date: '2024-12-05',
    featured: false
  },
  {
    id: 6,
    title: '发布年度可持续发展报告',
    summary: '公司发布2024年度可持续发展报告，展示在环保和社会责任方面的成就',
    image: 'https://picsum.photos/seed/news6/800/500.jpg',
    category: '公司新闻',
    date: '2024-12-01',
    featured: false
  },
  {
    id: 7,
    title: '新增生产线正式投产，产能提升50%',
    summary: '公司新增生产线正式投产，预计年产能将提升50%',
    image: 'https://picsum.photos/seed/news7/800/500.jpg',
    category: '公司新闻',
    date: '2024-11-28',
    featured: false
  },
  {
    id: 8,
    title: '与高校合作建立联合实验室',
    summary: '与上海交通大学合作建立新能源技术联合实验室',
    image: 'https://picsum.photos/seed/news8/800/500.jpg',
    category: '技术动态',
    date: '2024-11-25',
    featured: false
  },
  {
    id: 9,
    title: '公司产品通过国家权威检测认证',
    summary: '公司多款新能源产品通过国家权威机构检测认证，质量达到国际先进水平',
    image: 'https://picsum.photos/seed/news9/800/500.jpg',
    category: '公司新闻',
    date: '2024-11-20',
    featured: false
  },
  {
    id: 10,
    title: '客户现场考察圆满成功',
    summary: '重要客户莅临我司生产基地进行现场考察，对产品质量和生产流程给予高度评价',
    image: 'https://picsum.photos/seed/news10/800/500.jpg',
    category: '现场考察',
    date: '2024-11-15',
    featured: false
  },
  {
    id: 11,
    title: '行业媒体专访我司CEO',
    summary: '知名行业媒体对我司CEO进行专访，深入探讨新能源行业发展趋势',
    image: 'https://picsum.photos/seed/news11/800/500.jpg',
    category: '媒体报道',
    date: '2024-11-10',
    featured: false
  },
  {
    id: 12,
    title: '新能源行业政策解读研讨会',
    summary: '我司举办新能源行业政策解读研讨会，邀请业内专家共同探讨政策影响',
    image: 'https://picsum.photos/seed/news12/800/500.jpg',
    category: '行业新闻',
    date: '2024-11-05',
    featured: false
  },
  {
    id: 13,
    title: '合作伙伴生产基地考察',
    summary: '公司团队赴合作伙伴生产基地进行考察交流，深化合作关系',
    image: 'https://picsum.photos/seed/news13/800/500.jpg',
    category: '现场考察',
    date: '2024-10-28',
    featured: false
  },
  {
    id: 14,
    title: '荣获年度最佳新能源企业奖',
    summary: '在年度新能源行业评选中，我司荣获最佳新能源企业奖',
    image: 'https://picsum.photos/seed/news14/800/500.jpg',
    category: '媒体报道',
    date: '2024-10-20',
    featured: false
  },
  {
    id: 15,
    title: '行业峰会分享技术成果',
    summary: '我司技术总监在新能源行业峰会上分享最新技术成果',
    image: 'https://picsum.photos/seed/news15/800/500.jpg',
    category: '行业新闻',
    date: '2024-10-15',
    featured: false
  }
]);

// 根据分类筛选新闻
const filteredNews = computed(() => {
  if (currentCategory.value === 'all') {
    return newsData.value;
  }
  return newsData.value.filter(news => news.category === currentCategory.value);
});

// 当前页显示的新闻
const currentNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredNews.value.slice(start, end);
});

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / pageSize.value);
});

// 监听分类变化，重置页码
watch(currentCategory, () => {
  currentPage.value = 1;
});

// 获取分类颜色
const getCategoryColor = (category) => {
  const colorMap = {
    '公司新闻': 'bg-eco-100 text-eco-700',
    '现场考察': 'bg-blue-100 text-blue-700',
    '媒体报道': 'bg-purple-100 text-purple-700',
    '行业新闻': 'bg-orange-100 text-orange-700',
    '技术动态': 'bg-teal-100 text-teal-700',
    '展会动态': 'bg-pink-100 text-pink-700'
  };
  return colorMap[category] || 'bg-gray-100 text-gray-700';
};

// 设置页面标题
useHead({
  title: '新闻中心 - 淼泽松源',
  meta: [
    { name: 'description', content: '了解淼泽松源最新的公司动态和行业资讯' }
  ]
});
</script>
