<template>
  <div>
    <!-- 页面标题区域 -->
    <section class="relative pt-40 pb-24 text-white overflow-hidden"
      style="background-image: url('https://picsum.photos/seed/mzsy-news-detail/1920/1080.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
      <!-- 深色遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-br from-eco-900/85 to-primary-900/80"></div>
      <!-- 装饰性光晕 -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-2 mb-4">
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-medium',
              getCategoryColor(articleData.category)
            ]">
              {{ articleData.category }}
            </span>
            <span class="text-white/70 text-sm">
              {{ articleData.date }}
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            {{ articleData.title }}
          </h1>
          <p class="text-xl opacity-90">
            {{ articleData.summary }}
          </p>
        </div>
      </div>
    </section>

    <!-- 文章内容区域 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <!-- 文章封面图 -->
          <div class="mb-12 rounded-2xl overflow-hidden shadow-xl">
            <img :src="articleData.image" :alt="articleData.title"
              class="w-full h-auto object-cover"
              onerror="this.src='https://picsum.photos/seed/news/1200/600.jpg'" />
          </div>

          <!-- 文章正文 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div class="prose prose-lg max-w-none">
              <!-- 作者信息 -->
              <div class="flex items-center gap-4 pb-6 border-b border-gray-200 mb-8">
                <div class="w-12 h-12 bg-eco-100 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:user" class="w-6 h-6 text-eco-600" />
                </div>
                <div>
                  <div class="font-medium text-gray-900">{{ articleData.author || '淼泽松源' }}</div>
                  <div class="text-sm text-gray-500">{{ articleData.date }}</div>
                </div>
              </div>

              <!-- 文章内容 -->
              <div class="article-content" v-html="articleData.content"></div>
            </div>
          </div>

          <!-- 返回按钮 -->
          <div class="mt-12">
            <NuxtLink to="/news"
              class="inline-flex items-center gap-2 px-6 py-3 bg-eco-600 text-white rounded-lg hover:bg-eco-700 transition-colors duration-300 font-medium">
              <Icon name="heroicons:arrow-left" class="w-5 h-5" />
              返回新闻列表
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * 获取分类颜色
 * @param {string} category - 分类名称
 * @returns {string} 返回分类对应的颜色类名
 */
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

// 获取路由参数
const route = useRoute();
const newsId = route.params.id;

// 文章数据
const articleData = ref({
  id: newsId,
  title: '',
  summary: '',
  content: '',
  image: '',
  category: '',
  date: '',
  author: '淼泽松源'
});

// 相关文章
const relatedArticles = ref([]);

// 加载状态
const loading = ref(true);

// 错误信息
const error = ref(null);

/**
 * 加载文章详情
 */
const loadArticleDetail = async () => {
  try {
    loading.value = true;
    error.value = null;

    // 模拟数据（实际应该从API获取）
    const mockArticles = [
      {
        id: 1,
        title: '淼泽松源荣获2024年度新能源技术创新奖',
        summary: '凭借在甲醇新能源领域的突出贡献，我司荣获2024年度新能源技术创新奖',
        content: `
          <p>近日，在2024年度新能源行业评选中，淼泽松源凭借在甲醇新能源领域的突出贡献，荣获"2024年度新能源技术创新奖"。这一奖项是对我司在新能源技术研发和应用方面取得成绩的高度认可。</p>
          
          <h3>技术创新成果</h3>
          <p>淼泽松源自成立以来，始终致力于甲醇新能源技术的研发与创新。经过多年的技术积累和持续投入，我们在以下方面取得了显著成果：</p>
          <ul>
            <li>甲醇燃料电池效率提升至行业领先水平</li>
            <li>开发了多项具有自主知识产权的核心技术</li>
            <li>建立了完善的技术研发体系和质量管理体系</li>
            <li>与多家科研院所建立了产学研合作关系</li>
          </ul>
          
          <h3>未来发展规划</h3>
          <p>获得这一奖项是对我们过去工作的肯定，更是对未来发展的鞭策。淼泽松源将继续加大研发投入，推动技术创新，为新能源行业的发展贡献更多力量。</p>
          
          <p>我们相信，在全体员工的共同努力下，淼泽松源必将在新能源领域取得更加辉煌的成就！</p>
        `,
        image: 'https://picsum.photos/seed/news1/1200/600.jpg',
        category: '公司新闻',
        date: '2024-12-20',
        author: '淼泽松源'
      },
      {
        id: 2,
        title: '新一代甲醇燃料电池技术取得重大突破',
        summary: '我司研发团队在甲醇燃料电池效率提升方面取得重大技术突破',
        content: `
          <p>淼泽松源研发团队在甲醇燃料电池效率提升方面取得重大技术突破，新一代甲醇燃料电池的能量转换效率比上一代提升了15%，达到行业领先水平。</p>
          
          <h3>技术突破详情</h3>
          <p>此次技术突破主要体现在以下几个方面：</p>
          <ul>
            <li>优化了催化剂配方，提高了催化活性</li>
            <li>改进了膜电极结构，降低了内阻</li>
            <li>优化了系统集成，提高了整体效率</li>
            <li>增强了系统的稳定性和可靠性</li>
          </ul>
          
          <h3>应用前景</h3>
          <p>新一代甲醇燃料电池技术可广泛应用于：</p>
          <ul>
            <li>新能源汽车动力系统</li>
            <li>分布式发电系统</li>
            <li>备用电源系统</li>
            <li>移动电源设备</li>
          </ul>
        `,
        image: 'https://picsum.photos/seed/news2/1200/600.jpg',
        category: '技术动态',
        date: '2024-12-18',
        author: '技术部'
      },
      {
        id: 3,
        title: '与多家能源企业达成战略合作协议',
        summary: '与国内多家知名能源企业签署战略合作协议，共同推进新能源产业发展',
        content: `
          <p>近日，淼泽松源与国内多家知名能源企业签署战略合作协议，共同推进新能源产业发展。此次合作标志着公司在新能源产业链布局上迈出了重要一步。</p>
          
          <h3>合作内容</h3>
          <p>根据合作协议，各方将在以下领域开展深度合作：</p>
          <ul>
            <li>甲醇燃料电池技术研发</li>
            <li>新能源产品市场推广</li>
            <li>产业链资源整合</li>
            <li>人才培养与交流</li>
          </ul>
          
          <h3>合作意义</h3>
          <p>此次战略合作将充分发挥各方优势，实现资源共享、优势互补，共同推动新能源产业的技术进步和市场拓展。</p>
        `,
        image: 'https://picsum.photos/seed/news3/1200/600.jpg',
        category: '公司新闻',
        date: '2024-12-15',
        author: '市场部'
      },
      {
        id: 4,
        title: '参加2024国际新能源展览会并发表主题演讲',
        summary: '我司受邀参加2024国际新能源展览会，CEO发表主题演讲',
        content: `
          <p>2024国际新能源展览会近日在上海举行，淼泽松源受邀参展，公司CEO在大会上发表了主题演讲，分享了公司在甲醇新能源领域的技术成果和发展规划。</p>
          
          <h3>参展亮点</h3>
          <p>本次展会，淼泽松源展示了最新的甲醇燃料电池产品和技术解决方案，吸引了众多国内外客户的关注。</p>
          
          <h3>主题演讲</h3>
          <p>公司CEO在主题演讲中详细介绍了甲醇新能源的技术优势、应用前景以及淼泽松源在推动新能源产业发展方面的努力和成果。</p>
        `,
        image: 'https://picsum.photos/seed/news4/1200/600.jpg',
        category: '媒体报道',
        date: '2024-12-10',
        author: '市场部'
      }
    ];

    // 查找当前文章
    const article = mockArticles.find(a => a.id === parseInt(newsId));
    
    if (article) {
      articleData.value = article;
      
      // 获取相关文章（排除当前文章，取前3篇）
      relatedArticles.value = mockArticles
        .filter(a => a.id !== parseInt(newsId))
        .slice(0, 3);
    } else {
      error.value = '文章不存在';
    }
  } catch (err) {
    error.value = '加载文章失败';
    console.error('加载文章详情失败:', err);
  } finally {
    loading.value = false;
  }
};

// 页面加载时获取文章详情
onMounted(() => {
  loadArticleDetail();
});

// 设置页面标题
useHead({
  title: computed(() => `${articleData.value.title} - 淼泽松源`),
  meta: [
    { name: 'description', content: computed(() => articleData.value.summary) }
  ]
});
</script>

<style scoped>
.article-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.article-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #374151;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.75;
  color: #4b5563;
}

.article-content :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  color: #4b5563;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.75;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}
</style>
