<template>
  <div>
    <!-- 滚动进度指示器 -->
    <div
      class="scroll-progress fixed top-0 left-0 h-1 bg-gradient-to-r from-eco-500 to-eco-600 z-[55] transition-all duration-300">
    </div>

    <!-- 鼠标跟随效果 -->
    <div class="pointer-events-none fixed inset-0 z-[40] overflow-hidden">
      <div class="absolute w-96 h-96 rounded-full bg-eco-500/10 blur-3xl transition-transform duration-300 ease-out"
        :style="{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() / 1000) * 0.1})`
        }"></div>
    </div>

    <!-- 鼠标跟随效果 -->
    <div class="pointer-events-none fixed inset-0 z-[40] overflow-hidden">
      <div class="mouse-follow absolute top-1/4 left-1/4 w-64 h-64 bg-eco-500/10 rounded-full blur-3xl"
        data-speed="0.02" data-max-distance="30"></div>
      <div class="mouse-follow absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        data-speed="0.03" data-max-distance="40"></div>
    </div>

    <!-- 英雄轮播区域 -->
    <section class="relative top-0 left-0 right-0 h-screen overflow-hidden" style="height: 100vh; z-index: 100;">
      <!-- 轮播容器 -->
      <div class="relative h-full" :style="{ transform: `translateY(${getParallaxOffset(0.3)}px)`, height: '100vh' }">
        <ClientOnly>
          <div class="flex h-full"
            :style="{ transform: `translateX(-${heroSlide * 100}%)`, transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)', height: '100vh' }"
            v-if="isClientInitialized">
            <!-- 轮播项 1: 公司介绍 -->
            <div class="w-full flex-shrink-0 relative">
              <!-- 视频背景 -->
              <div class="absolute inset-0 overflow-hidden">
                <video ref="heroVideo" class="absolute inset-0 w-full h-full object-cover scale-105" autoplay muted loop
                  playsinline preload="auto" crossorigin="anonymous" @error="handleVideoError"
                  @loadeddata="handleVideoLoaded">
                  <source src="/video/index.mp4" type="video/mp4">
                  您的浏览器不支持视频标签。
                </video>
                <!-- 视频加载失败时的备用背景 -->
                <div v-if="videoLoadFailed" class="absolute inset-0 bg-cover bg-center scale-105"
                  style="background-image: url('https://picsum.photos/seed/mzsy-hero/1920/1080.jpg')">
                </div>
                <div class="absolute inset-0 bg-gradient-to-r from-eco-800/85 to-eco-600/75 z-10"></div>
              </div>

              <!-- 内容 -->
              <div class="relative z-20 h-full flex items-center justify-center">
                <div class="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
                  :class="heroSlide === 0 ? 'animate-fade-in-up' : 'opacity-0'">
                  <div class="mb-8">
                    <div
                      class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                      欢迎来到淼泽松源
                    </div>
                  </div>
                  <h1 class="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                    {{ company.name }}
                  </h1>
                  <p class="text-xl md:text-3xl text-eco-100 font-light mb-8 leading-relaxed">
                    {{ company.slogan }}
                  </p>
                  <p class="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                    {{ company.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 轮播项 2: 甲醇新能源 -->
            <div class="w-full flex-shrink-0 relative">
              <div class="absolute inset-0 bg-cover bg-center scale-105"
                style="background-image: url('https://picsum.photos/seed/power-equipment-methanol/1920/1080.jpg')">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-800/85 to-blue-600/75 z-10"></div>
              </div>

              <!-- 内容 -->
              <div class="relative z-20 h-full flex items-center justify-center">
                <div class="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
                  :class="heroSlide === 1 ? 'animate-fade-in-up' : 'opacity-0'">
                  <div class="mb-8">
                    <div
                      class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <Icon name="heroicons:beaker" class="w-12 h-12 text-white" />
                    </div>
                    <div
                      class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      核心技术
                    </div>
                  </div>
                  <h2 class="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                    甲醇新能源技术
                  </h2>
                  <p class="text-xl md:text-3xl text-blue-100 font-light mb-8 leading-relaxed">
                    高效转换 · 低排放 · 可持续性
                  </p>
                  <p class="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                    专注于甲醇燃料电池、甲醇重整技术等新能源技术研发，提供高效、清洁的能源解决方案，助力实现碳中和目标。
                  </p>
                </div>
              </div>
            </div>

            <!-- 轮播项 3: 风能技术 -->
            <div class="w-full flex-shrink-0 relative">
              <div class="absolute inset-0 bg-cover bg-center scale-105"
                style="background-image: url('https://picsum.photos/seed/wind-turbine-power/1920/1080.jpg')">
                <div class="absolute inset-0 bg-gradient-to-r from-teal-800/85 to-teal-600/75 z-10"></div>
              </div>

              <!-- 内容 -->
              <div class="relative z-20 h-full flex items-center justify-center">
                <div class="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
                  :class="heroSlide === 2 ? 'animate-fade-in-up' : 'opacity-0'">
                  <div class="mb-8">
                    <div
                      class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <Icon name="heroicons:cloud" class="w-12 h-12 text-white" />
                    </div>
                    <div
                      class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      清洁能源
                    </div>
                  </div>
                  <h2 class="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                    风能技术研发
                  </h2>
                  <p class="text-xl md:text-3xl text-teal-100 font-light mb-8 leading-relaxed">
                    高效率 · 低噪音 · 智能化
                  </p>
                  <p class="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                    开发先进的风力发电技术，提高风能利用效率，推动可再生能源发展，为清洁能源转型贡献力量。
                  </p>
                </div>
              </div>
            </div>

            <!-- 轮播项 4: 能源储存 -->
            <div class="w-full flex-shrink-0 relative">
              <div class="absolute inset-0 bg-cover bg-center scale-105"
                style="background-image: url('https://picsum.photos/seed/power-storage-equipment/1920/1080.jpg')">
                <div class="absolute inset-0 bg-gradient-to-r from-purple-800/85 to-purple-600/75 z-10"></div>
              </div>

              <!-- 内容 -->
              <div class="relative z-20 h-full flex items-center justify-center">
                <div class="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
                  :class="heroSlide === 3 ? 'animate-fade-in-up' : 'opacity-0'">
                  <div class="mb-8">
                    <div
                      class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <Icon name="heroicons:battery-100" class="w-12 h-12 text-white" />
                    </div>
                    <div
                      class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      智能储能
                    </div>
                  </div>
                  <h2 class="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                    能源储存解决方案
                  </h2>
                  <p class="text-xl md:text-3xl text-purple-100 font-light mb-8 leading-relaxed">
                    高效储存 · 智能管理 · 安全可靠
                  </p>
                  <p class="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                    提供先进的能源储存系统，包括电池储能、压缩空气储能等多种解决方案，实现能源的高效利用和灵活调配。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 轮播控制 -->
          <button @click="prevHeroSlide"
            class="group absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-4 shadow-2xl transition-all duration-300 z-30 hover:scale-110"
            aria-label="上一张">
            <Icon name="heroicons:chevron-left"
              class="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>

          <button @click="nextHeroSlide"
            class="group absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-4 shadow-2xl transition-all duration-300 z-30 hover:scale-110"
            aria-label="下一张">
            <Icon name="heroicons:chevron-right"
              class="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </ClientOnly>
      </div>

      <!-- 滚动提示 -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div class="flex flex-col items-center animate-bounce">
          <span class="text-white/70 text-sm mb-2 font-medium">向下滚动</span>
          <div class="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
            <Icon name="heroicons:chevron-down" class="w-5 h-5 text-white/90" />
          </div>
        </div>
      </div>
    </section>

    <!-- 页面内容容器 -->
    <div class="relative z-10">
      <!-- 新闻中心 -->
      <section class="news-section py-16 bg-white relative overflow-hidden">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-4">
              新闻动态
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              新闻中心
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              了解最新的公司动态和行业资讯
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- 左侧：新闻大图轮播 -->
            <div class="lg:col-span-2">
              <ClientOnly>
                <div class="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 h-[500px]"
                  v-if="isClientInitialized">
                  <!-- 轮播容器 -->
                  <div class="relative h-full overflow-hidden">
                    <div class="flex h-full transition-transform duration-700 ease-out"
                      :style="{ transform: `translateX(-${newsSlide * 100}%)` }">
                      <!-- 轮播项 -->
                      <div v-for="(news, index) in featuredNews" :key="news.id"
                        class="w-full flex-shrink-0 relative h-full">
                        <!-- 新闻图片 -->
                        <img :src="news.image" :alt="news.title" class="w-full h-full object-cover"
                          onerror="this.src='https://picsum.photos/seed/news/800/500.jpg'" />

                        <!-- 渐变遮罩 -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                        <!-- 新闻信息 -->
                        <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                          <div class="flex items-center space-x-2 mb-3">
                            <span class="px-3 py-1 bg-eco-600 rounded-full text-sm font-medium">
                              {{ news.category || '公司新闻' }}
                            </span>
                            <span class="text-sm text-gray-300">
                              {{ news.date }}
                            </span>
                          </div>
                          <h3 class="text-2xl md:text-3xl font-bold mb-2 line-clamp-2">
                            {{ news.title }}
                          </h3>
                          <p class="text-gray-200 line-clamp-2">
                            {{ news.summary }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- 轮播控制按钮 -->
                    <button @click="prevNewsSlide"
                      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-20 hover:scale-110"
                      aria-label="上一条">
                      <Icon name="heroicons:chevron-left" class="w-5 h-5" />
                    </button>

                    <button @click="nextNewsSlide"
                      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-20 hover:scale-110"
                      aria-label="下一条">
                      <Icon name="heroicons:chevron-right" class="w-5 h-5" />
                    </button>

                    <!-- 轮播指示器 -->
                    <div class="absolute bottom-4 right-4 flex space-x-2 z-20">
                      <button v-for="(_, index) in featuredNews" :key="index" @click="newsSlide = index"
                        class="transition-all duration-300"
                        :class="newsSlide === index ? 'w-8 h-2 bg-white rounded-full' : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'"
                        :aria-label="`切换到第${index + 1}条`">
                      </button>
                    </div>
                  </div>
                </div>
              </ClientOnly>
            </div>

            <!-- 右侧：公司新闻列表 -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-2xl shadow-xl p-6 h-[500px] flex flex-col">
                <!-- 标题和更多按钮 -->
                <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <h3 class="text-xl font-bold text-gray-900 flex items-center">
                    <Icon name="heroicons:newspaper" class="w-5 h-5 mr-2 text-eco-600" />
                    公司新闻
                  </h3>
                  <NuxtLink to="/news"
                    class="text-eco-600 hover:text-eco-700 text-sm font-medium flex items-center group transition-colors duration-200">
                    更多
                    <Icon name="heroicons:arrow-right"
                      class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                  </NuxtLink>
                </div>

                <!-- 新闻列表 -->
                <div class="flex-1 space-y-1 pr-2">
                  <div v-for="news in companyNews" :key="news.id"
                    class="group cursor-pointer transition-all duration-200 hover:bg-gray-50 rounded-lg p-2">
                    <div class="flex items-start justify-between">
                      <!-- 左侧：新闻名称 -->
                      <div class="flex-1 pr-3">
                        <h4
                          class="text-sm text-gray-900 font-medium group-hover:text-eco-600 transition-colors duration-200 line-clamp-2">
                          {{ news.title }}
                        </h4>
                        <p class="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {{ news.summary }}
                        </p>
                      </div>
                      <!-- 右侧：发布时间 -->
                      <div class="text-right flex-shrink-0">
                        <span class="text-xs text-gray-400 whitespace-nowrap">
                          {{ news.date }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 产品展示 -->
      <section
        class="product-section py-20 bg-gradient-to-br from-eco-50 to-white relative overflow-hidden animate-background-shift">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 opacity-5">
          <div class="parallax-element absolute top-1/4 right-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"
            data-speed="0.25"></div>
          <div class="parallax-element absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
            data-speed="0.15"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-16">
            <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-4">
              我们的产品
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              产品展示
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              我们提供全方位的新能源产品，满足不同场景的应用需求
            </p>
          </div>

          <div class="relative max-w-7xl mx-auto">
            <!-- 轮播容器 -->
            <ClientOnly>
              <div class="overflow-hidden rounded-2xl shadow-2xl bg-white">
                <div class="flex transition-transform duration-700 ease-out"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }" v-if="isClientInitialized">
                  <!-- 轮播项 -->
                  <div v-for="(product, index) in productsData" :key="product.id"
                    class="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-3 bg-white">
                    <!-- 左侧2/3：产品大图 -->
                    <div class="lg:col-span-2 bg-gray-100 h-96 lg:h-auto relative overflow-hidden group">
                      <img :src="product.image" :alt="product.name"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onerror="this.src='https://picsum.photos/seed/mzsy-product/800/600.jpg'" />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      </div>
                      <div
                        class="absolute top-6 left-6 bg-eco-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center space-x-2">
                        <Icon name="heroicons:tag" class="w-4 h-4" />
                        <span>{{ product.category }}</span>
                      </div>
                      <!-- 图片上的悬浮信息 -->
                      <div
                        class="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div class="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                          <p class="text-sm font-medium">{{ product.highlight || '行业领先技术，卓越性能表现' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- 右侧1/3：产品介绍 -->
                    <div class="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                      <div class="mb-2">
                        <span class="text-eco-600 font-medium text-sm uppercase tracking-wider">{{ product.series ||
                          'MZ系列' }}</span>
                      </div>
                      <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">{{ product.name }}
                      </h3>
                      <p class="text-gray-600 mb-8 leading-relaxed">{{ product.description }}</p>

                      <!-- 产品规格 -->
                      <div class="bg-white rounded-xl p-6 shadow-sm mb-8 border border-gray-100">
                        <h4 class="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                          <Icon name="heroicons:clipboard-document-list" class="w-4 h-4 mr-2 text-eco-600" />
                          技术规格
                        </h4>
                        <div class="space-y-3">
                          <div v-for="(value, key) in product.specifications" :key="key"
                            class="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                            <span class="text-gray-500 text-sm">{{ key }}:</span>
                            <span class="font-medium text-gray-900 text-sm bg-eco-50 px-2 py-1 rounded">{{ value
                            }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- 产品特点 -->
                      <div class="mb-8">
                        <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <Icon name="heroicons:star" class="w-4 h-4 mr-2 text-eco-600" />
                          产品特点
                        </h4>
                        <div class="flex flex-wrap gap-2">
                          <span v-for="feature in product.features || ['高效节能', '稳定可靠', '智能控制']" :key="feature"
                            class="px-3 py-1 bg-eco-100 text-eco-700 rounded-full text-xs font-medium">
                            {{ feature }}
                          </span>
                        </div>
                      </div>

                      <NuxtLink :to="`/productDetail/${product.id}`"
                        class="group inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-eco-500 to-eco-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden font-display mouse-follow"
                        data-speed="0.05" data-max-distance="20">
                        <span class="relative z-10">了解产品详情</span>
                        <Icon name="heroicons:arrow-right"
                          class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-eco-600 to-eco-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 轮播控制 -->
              <button @click="prevSlide"
                class="group absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 z-20"
                aria-label="上一个产品">
                <Icon name="heroicons:chevron-left"
                  class="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
              </button>

              <button @click="nextSlide"
                class="group absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 z-20"
                aria-label="下一个产品">
                <Icon name="heroicons:chevron-right"
                  class="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <!-- 轮播指示器 -->
              <div class="flex justify-center mt-8 space-x-2">
                <button v-for="(_, index) in productsData" :key="index" @click="currentSlide = index"
                  class="h-3 rounded-full transition-all duration-300"
                  :class="currentSlide === index ? 'w-10 bg-gradient-to-r from-eco-500 to-eco-600 shadow-lg' : 'w-3 bg-gray-300 hover:bg-gray-400'"
                  :aria-label="`切换到第${index + 1}个产品`"></button>
              </div>
            </ClientOnly>
          </div>
        </div>
      </section>

      <!-- 公司优势 -->
      <section class="py-20 relative overflow-hidden"
        style="background-image: url('https://picsum.photos/seed/mzsy-advantage/1920/1080.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
        <!-- 深色遮罩层 -->
        <div class="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/80"></div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                我们的优势
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">
                为什么选择淼泽松源
              </h2>
              <div class="space-y-8">
                <div class="advantage-card group flex items-start glow-element">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 mouse-follow"
                    data-speed="0.02">
                    <Icon name="heroicons:light-bulb" class="w-7 h-7 text-white" />
                  </div>
                  <div class="ml-6">
                    <h3
                      class="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      技术创新</h3>
                    <p class="text-gray-300 leading-relaxed">拥有多项核心技术专利，持续推动新能源技术突破，为客户提供更高效的解决方案。</p>
                  </div>
                </div>

                <div class="advantage-card group flex items-start glow-element">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-eco-500 to-eco-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 mouse-follow"
                    data-speed="0.02">
                    <Icon name="heroicons:sparkles" class="w-7 h-7 text-white" />
                  </div>
                  <div class="ml-6">
                    <h3
                      class="text-xl font-bold text-white mb-3 group-hover:text-eco-300 transition-colors duration-300">
                      绿色环保</h3>
                    <p class="text-gray-300 leading-relaxed">所有产品和技术均以环保为核心，致力于减少碳排放，推动可持续发展。</p>
                  </div>
                </div>

                <div class="advantage-card group flex items-start glow-element">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Icon name="heroicons:star" class="w-7 h-7 text-white" />
                  </div>
                  <div class="ml-6">
                    <h3
                      class="text-xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                      专业服务</h3>
                    <p class="text-gray-300 leading-relaxed">提供从咨询、设计到实施、维护的全流程服务，确保客户获得最佳体验。</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <div
                class="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md p-8 border border-white/20">
                <h3 class="text-2xl font-bold text-white mb-6 text-center">为什么选择淼泽松源</h3>

                <div class="space-y-6">
                  <div class="flex items-start space-x-4">
                    <div
                      class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="heroicons:check-circle" class="w-6 h-6 text-eco-400" />
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-white mb-2">行业领先经验</h4>
                      <p class="text-gray-300">深耕新能源领域多年，拥有丰富的项目实施经验和成功案例</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div
                      class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="heroicons:users" class="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-white mb-2">专业团队支持</h4>
                      <p class="text-gray-300">汇聚行业顶尖人才，提供从咨询到实施的全流程专业服务</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div
                      class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="heroicons:cog-6-tooth" class="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-white mb-2">定制化解决方案</h4>
                      <p class="text-gray-300">根据客户需求量身定制，确保每个项目都能达到最佳效果</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div
                      class="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="heroicons:shield-check" class="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-white mb-2">可靠品质保证</h4>
                      <p class="text-gray-300">严格的质量控制体系，确保产品稳定性和长期可靠运行</p>
                    </div>
                  </div>
                </div>

                <!-- 装饰元素 -->
                <div class="mt-8 text-center">
                  <div
                    class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full shadow-lg border border-white/30">
                    <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
                    持续创新，永不止步
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 服务介绍 -->
      <section class="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 opacity-5">
          <div class="parallax-element absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
            data-speed="0.2"></div>
          <div class="parallax-element absolute bottom-1/4 right-1/4 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"
            data-speed="0.3"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-16">
            <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-4">
              我们的服务
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              核心业务
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              我们专注于新能源技术研发与应用，为客户提供全方位的绿色能源解决方案
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="service in servicesData" :key="service.id"
              class="service-card group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden glow-element">
              <!-- 背景光效 -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-eco-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>

              <!-- 图标容器 -->
              <div class="relative mb-6">
                <div
                  class="absolute inset-0 bg-eco-100 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500 opacity-70">
                </div>
                <div
                  class="relative bg-gradient-to-br from-eco-500 to-eco-600 rounded-2xl p-4 text-white shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:rotate-3 flex items-center justify-center">
                  <Icon :name="`heroicons:${service.icon}`" class="w-8 h-8" />
                  <h3 class="ml-2 text-sm font-bold">{{ service.title }}</h3>
                </div>
              </div>

              <!-- 内容 -->
              <div class="relative z-10">
                <p class="text-gray-600 leading-relaxed mb-6">
                  {{ service.description }}
                </p>

                <!-- 特性标签 -->
                <div class="flex flex-wrap gap-2">
                  <span v-for="feature in service.features" :key="feature"
                    class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium group-hover:bg-eco-100 group-hover:text-eco-700 transition-colors duration-300">
                    {{ feature }}
                  </span>
                </div>
              </div>

              <!-- 悬浮效果 -->
              <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-eco-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 数据统计 -->
      <section class="py-20 bg-gradient-to-br from-eco-600 via-eco-700 to-blue-800 relative overflow-hidden">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 opacity-10">
          <div class="parallax-element absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"
            data-speed="0.15"></div>
          <div class="parallax-element absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"
            data-speed="0.25"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-12">
            <div
              class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
              我们的成就
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              数据说话
            </h2>
            <p class="text-lg text-white/80 max-w-2xl mx-auto">
              多年的行业积累，我们用实力和成果赢得客户信赖
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="stat-card text-center group">
              <div class="relative mb-4">
                <div
                  class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="relative text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <span class="stat-number" data-target="50" data-suffix="+">0</span>
                </div>
              </div>
              <div class="text-lg text-white/90 font-medium">技术专利</div>
              <div
                class="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto group-hover:bg-white/60 transition-colors duration-300">
              </div>
            </div>

            <div class="stat-card text-center group">
              <div class="relative mb-4">
                <div
                  class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="relative text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <span class="stat-number" data-target="100" data-suffix="+">0</span>
                </div>
              </div>
              <div class="text-lg text-white/90 font-medium">成功项目</div>
              <div
                class="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto group-hover:bg-white/60 transition-colors duration-300">
              </div>
            </div>

            <div class="stat-card text-center group">
              <div class="relative mb-4">
                <div
                  class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="relative text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <span class="stat-number" data-target="30" data-suffix="+">0</span>
                </div>
              </div>
              <div class="text-lg text-white/90 font-medium">合作伙伴</div>
              <div
                class="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto group-hover:bg-white/60 transition-colors duration-300">
              </div>
            </div>

            <div class="stat-card text-center group">
              <div class="relative mb-4">
                <div
                  class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="relative text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <span class="stat-number" data-target="99" data-suffix="%">0</span>
                </div>
              </div>
              <div class="text-lg text-white/90 font-medium">客户满意度</div>
              <div
                class="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto group-hover:bg-white/60 transition-colors duration-300">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 行动号召 -->
      <section class="cta-section py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 opacity-5">
          <div class="parallax-element absolute top-1/3 right-1/3 w-96 h-96 bg-eco-500 rounded-full filter blur-3xl"
            data-speed="0.2"></div>
          <div class="parallax-element absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
            data-speed="0.1"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div class="max-w-4xl mx-auto">
            <div class="inline-block px-4 py-2 bg-eco-100 text-eco-700 rounded-full text-sm font-medium mb-6">
              联系我们
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              准备好开启绿色能源之旅了吗？
            </h2>
            <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              联系我们的专业团队，了解更多关于新能源解决方案的信息，让我们一起为可持续发展贡献力量
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NuxtLink to="/contact"
                class="group relative px-8 py-4 bg-gradient-to-r from-eco-500 to-eco-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden font-display mouse-follow"
                data-speed="0.03" data-max-distance="15">
                <span class="relative z-10 flex items-center">
                  <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2" />
                  立即咨询
                </span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-eco-600 to-eco-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </NuxtLink>

              <NuxtLink to="/products"
                class="group relative px-8 py-4 bg-transparent border-2 border-eco-500 text-eco-600 font-semibold rounded-xl hover:bg-eco-50 transition-all duration-300 font-display">
                <span class="flex items-center">
                  <Icon name="heroicons:cube-transparent" class="w-5 h-5 mr-2" />
                  查看产品
                </span>
                <div
                  class="absolute inset-0 bg-eco-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </NuxtLink>
            </div>

            <!-- 联系信息 -->
            <div class="mt-12 pt-8 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-600">
                <div class="flex items-center">
                  <Icon name="heroicons:phone" class="w-5 h-5 mr-2 text-eco-600" />
                  <span>400-888-8888</span>
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:envelope" class="w-5 h-5 mr-2 text-eco-600" />
                  <span>contact@mzsy.com</span>
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:map-pin" class="w-5 h-5 mr-2 text-eco-600" />
                  <span>上海市浦东新区</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// 导入ThreeScene组件

// 导入动画组合式函数
import { useScrollAnimation, useMouseFollower, useParallax, useNumberAnimation, useAdvancedAnimations } from '~/composables/useAnimations.js'
import { useMobileOptimization } from '~/composables/useMobileOptimization.js'

// 解构动画函数
const { addScrollAnimation, addStaggeredAnimation, cleanup } = useScrollAnimation()
const { animateNumber } = useNumberAnimation()
const { scrollY, getParallaxOffset } = useParallax()
const {
  typewriterEffect,
  waveAnimation,
  staggerAnimation,
  parallaxScroll,
  mouseFollow,
  scrollProgress,
  flip3D,
  magneticEffect,
  parallaxLayers,
  particleEffect
} = useAdvancedAnimations()

// 鼠标位置
const mousePosition = reactive({ x: 50, y: 50 })

// 监听鼠标移动
onMounted(() => {
  const handleMouseMove = (e) => {
    mousePosition.x = (e.clientX / window.innerWidth) * 100
    mousePosition.y = (e.clientY / window.innerHeight) * 100
  }

  window.addEventListener('mousemove', handleMouseMove)

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })
})

// 解构移动设备优化函数
const {
  isMobile,
  isTablet,
  isDesktop,
  devicePerformance,
  getAnimationConfig,
  addOptimizedScrollAnimation,
  addOptimizedParallax,
  addOptimizedParticles,
  addOptimizedMagneticEffect,
  addOptimizedFlip3D
} = useMobileOptimization()

// 设置页面元数据
useHead({
  title: '首页 - 淼泽松源（上海）科技发展有限公司',
  meta: [
    { name: 'description', content: '淼泽松源（上海）科技发展有限公司，聚焦甲醇新能源、风能等核心技术研发，同步开展能源储存及设备销售、租赁等多元业态。' }
  ]
});

// 直接导入JSON数据
const { data: companyData } = await useAsyncData('company', async () => {
  const companyJson = await import('~/data/company.json');
  return companyJson.default.company;
});

// 确保 companyData 可用
const company = computed(() => companyData.value || {});

// 直接导入JSON数据
const { data: servicesData } = await useAsyncData('services', async () => {
  const companyJson = await import('~/data/company.json');
  return companyJson.default.services;
});

// 直接导入JSON数据
const { data: productsData } = await useAsyncData('products', async () => {
  const companyJson = await import('~/data/company.json');
  return companyJson.default.products;
});

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
    category: '展会动态',
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
  }
]);

// 精选新闻（用于轮播）
const featuredNews = computed(() => newsData.value.filter(news => news.featured));

// 公司新闻列表
const companyNews = computed(() => newsData.value.filter(news => news.category === '公司新闻'));

// 轮播控制
const currentSlide = ref(0);
const heroSlide = ref(0);
const newsSlide = ref(0);

// 客户端初始化标志
const isClientInitialized = ref(false);

// 视频引用
const heroVideo = ref(null);

// 视频加载失败标志
const videoLoadFailed = ref(false);

// 视频加载成功处理
const handleVideoLoaded = () => {
  console.log('视频加载成功');
  videoLoadFailed.value = false;
};

// 视频错误处理
const handleVideoError = (event) => {
  console.error('视频加载失败:', event);
  console.error('视频错误详情:', event.target.error);
  videoLoadFailed.value = true;
};

// 在客户端初始化轮播状态
onMounted(() => {
  isClientInitialized.value = true;

  // 尝试播放视频
  if (heroVideo.value) {
    heroVideo.value.play().catch(error => {
      console.error('视频播放失败:', error);
      videoLoadFailed.value = true;
    });
  }
});

const nextSlide = () => {
  if (!productsData.value) return;
  currentSlide.value = (currentSlide.value + 1) % productsData.value.length;
};

const prevSlide = () => {
  if (!productsData.value) return;
  currentSlide.value = currentSlide.value === 0 ? productsData.value.length - 1 : currentSlide.value - 1;
};

// 英雄轮播控制
const nextHeroSlide = () => {
  heroSlide.value = (heroSlide.value + 1) % 4;
  // 触发动画重置
  setTimeout(() => {
    const elements = document.querySelectorAll('.animate-fade-in-up');
    elements.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // 触发重排
      el.style.animation = null;
    });
  }, 100);
};

const prevHeroSlide = () => {
  heroSlide.value = heroSlide.value === 0 ? 3 : heroSlide.value - 1;
  // 触发动画重置
  setTimeout(() => {
    const elements = document.querySelectorAll('.animate-fade-in-up');
    elements.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // 触发重排
      el.style.animation = null;
    });
  }, 100);
};

// 新闻轮播控制
const nextNewsSlide = () => {
  if (!featuredNews.value.length) return;
  newsSlide.value = (newsSlide.value + 1) % featuredNews.value.length;
};

const prevNewsSlide = () => {
  if (!featuredNews.value.length) return;
  newsSlide.value = newsSlide.value === 0 ? featuredNews.value.length - 1 : newsSlide.value - 1;
};

// 自动轮播
let slideInterval = null;
let heroSlideInterval = null;
let newsSlideInterval = null;

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000); // 每5秒自动切换产品轮播
  // 英雄轮播不自动切换，只有点击才切换
  // heroSlideInterval = setInterval(nextHeroSlide, 6000); // 每6秒自动切换英雄轮播
  newsSlideInterval = setInterval(nextNewsSlide, 7000); // 每7秒自动切换新闻轮播

  // 为各个部分添加滚动动画
  nextTick(() => {
    // 获取动画配置
    const animConfig = getAnimationConfig({ threshold: 0.15, delay: 150 });

    // 服务部分动画 - 使用弹性增长效果
    const serviceCards = document.querySelectorAll('.service-card');

    // 根据设备类型选择动画
    if (isMobile.value) {
      // 移动设备使用简化动画
      staggerAnimation(serviceCards, 'animate-simple-slide-up', animConfig);
    } else {
      // 桌面设备使用弹性增长效果
      staggerAnimation(serviceCards, 'animate-elastic-grow', animConfig);
    }

    // 为服务卡片添加3D翻转效果
    serviceCards.forEach((card, index) => {
      // 延迟添加3D翻转效果
      setTimeout(() => {
        // 使用优化的3D翻转效果
        if (isMobile.value) {
          // 移动设备使用简化动画
          card.classList.add('animate-simple-scale');
        } else {
          // 桌面设备使用3D翻转效果
          addOptimizedFlip3D(card, 'y', 1200);
        }
      }, 1000 + index * 200);

      // 添加磁吸效果
      const magneticCleanup = addOptimizedMagneticEffect(card, 0.2, 80);
      card._magneticCleanup = magneticCleanup;
    });

    // 产品展示部分动画 - 使用波浪滑入效果
    const productSection = document.querySelector('.product-section');
    if (productSection) {
      // 使用优化的滚动动画
      if (isMobile.value) {
        addOptimizedScrollAnimation(productSection, 'animate-simple-slide-up', animConfig);
      } else {
        addScrollAnimation({ value: productSection }, 'animate-wave-in', animConfig);
      }

      // 为产品卡片添加波浪动画
      const productCards = productSection.querySelectorAll('.product-card');
      if (isMobile.value) {
        // 移动设备使用简化动画
        staggerAnimation(productCards, 'animate-simple-fade-in', animConfig);
      } else {
        // 桌面设备使用波浪动画
        waveAnimation(productCards, 100, 'animate-fade-in-up-stagger', animConfig);
      }

      // 为产品展示区域添加粒子效果
      if (!isMobile.value) {
        const particleCleanup = addOptimizedParticles(productSection, 15, {
          size: 3,
          color: 'rgba(34, 197, 94, 0.4)',
          duration: 4000
        });
        productSection._particleCleanup = particleCleanup;
      }
    }

    // 公司优势部分动画 - 使用旋转滑入效果
    const advantageCards = document.querySelectorAll('.advantage-card');

    // 根据设备类型选择动画
    if (isMobile.value) {
      // 移动设备使用简化动画
      staggerAnimation(advantageCards, 'animate-simple-slide-up', { threshold: 0.2, delay: 200 });
    } else {
      // 桌面设备使用旋转滑入效果
      staggerAnimation(advantageCards, 'animate-slide-in-left-rotate', { threshold: 0.2, delay: 200 });

      // 为优势卡片添加视差层叠效果
      const advantageDepths = [10, 20, 30, 40];
      const parallaxCleanup = parallaxLayers(advantageCards, advantageDepths, 0.3);
      advantageCards[0]._parallaxCleanup = parallaxCleanup;
    }

    // 数据统计部分动画 - 使用缩放旋转效果
    const statCards = document.querySelectorAll('.stat-card');

    // 根据设备类型选择动画
    if (isMobile.value) {
      // 移动设备使用简化动画
      staggerAnimation(statCards, 'animate-simple-scale', { threshold: 0.1, delay: 180 });
    } else {
      // 桌面设备使用缩放旋转效果
      staggerAnimation(statCards, 'animate-zoom-in-rotate', { threshold: 0.1, delay: 180 });
    }

    // 为数据统计部分添加数字递增动画
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
      // 创建观察器，当元素进入视口时触发数字动画
      const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const targetValue = parseInt(entry.target.getAttribute('data-target'));
            const suffix = entry.target.getAttribute('data-suffix') || '';

            // 根据设备性能调整动画持续时间
            const duration = isMobile.value ? 1000 : 2000;
            animateNumber(entry.target, targetValue, duration, suffix);
          }
        });
      }, { threshold: 0.5 });

      statNumbers.forEach(element => {
        numberObserver.observe(element);
      });
    }

    // CTA部分动画 - 使用弹性增长效果
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      // 根据设备类型选择动画
      if (isMobile.value) {
        addOptimizedScrollAnimation(ctaSection, 'animate-simple-scale', { threshold: 0.1 });
      } else {
        addScrollAnimation({ value: ctaSection }, 'animate-elastic-grow', { threshold: 0.1 });
      }

      // 为CTA按钮添加文字逐字显示效果
      const ctaButtons = ctaSection.querySelectorAll('a');
      ctaButtons.forEach((button, index) => {
        const buttonText = button.querySelector('span').textContent;
        const textElement = button.querySelector('span');
        if (textElement) {
          // 创建观察器，当元素进入视口时触发打字机效果
          const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed');

                // 移动设备不使用打字机效果
                if (!isMobile.value) {
                  typewriterEffect(entry.target, buttonText, 50);
                }
              }
            });
          }, { threshold: 0.8 });

          textObserver.observe(textElement);
        }

        // 为CTA按钮添加3D翻转效果
        setTimeout(() => {
          if (isMobile.value) {
            // 移动设备使用简化动画
            button.classList.add('animate-simple-scale');
          } else {
            // 桌面设备使用3D翻转效果
            addOptimizedFlip3D(button, 'x', 1000);
          }
        }, 1500 + index * 300);

        // 添加磁吸效果
        const magneticCleanup = addOptimizedMagneticEffect(button, 0.15, 60);
        button._magneticCleanup = magneticCleanup;
      });
    }

    // 为标题添加特殊动画 - 使用文字显示效果
    const sectionTitles = document.querySelectorAll('section h2');

    // 根据设备类型选择动画
    if (isMobile.value) {
      // 移动设备使用简化动画
      staggerAnimation(sectionTitles, 'animate-simple-slide-up', { threshold: 0.2, delay: 150 });
    } else {
      // 桌面设备使用文字显示效果
      staggerAnimation(sectionTitles, 'animate-text-reveal', { threshold: 0.2, delay: 150 });
    }

    // 添加视差滚动效果（使用改进版）
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
      const direction = element.getAttribute('data-direction') || 'y';

      // 根据设备类型选择是否添加视差效果
      if (!isMobile.value) {
        const cleanup = parallaxScroll(element, speed, direction);
        // 存储清理函数
        element._parallaxCleanup = cleanup;
      }
    });

    // 添加鼠标跟随效果（使用改进版）
    const mouseFollowElements = document.querySelectorAll('.mouse-follow');
    mouseFollowElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.1;
      const maxDistance = parseFloat(element.getAttribute('data-max-distance')) || 50;

      // 根据设备类型选择是否添加鼠标跟随效果
      if (!isMobile.value) {
        const cleanup = mouseFollow(element, speed, maxDistance);
        // 存储清理函数
        element._mouseFollowCleanup = cleanup;
      }
    });

    // 添加滚动进度指示器
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      // 根据设备类型选择是否添加滚动进度指示器
      if (!isMobile.value) {
        const cleanup = scrollProgress(progressBar);
        window._scrollProgressCleanup = cleanup;
      }
    }

    // 为背景装饰元素添加动态背景效果
    const backgroundElements = document.querySelectorAll('.animate-background-shift');
    backgroundElements.forEach(element => {
      element.classList.add('animate-background-shift');
    });

    // 为交互元素添加发光脉冲效果
    const glowElements = document.querySelectorAll('.glow-element');
    glowElements.forEach(element => {
      element.classList.add('animate-glow-pulse');
    });

    // 为英雄轮播添加3D浮动效果
    const heroElements = document.querySelectorAll('.hero-element');
    heroElements.forEach((element, index) => {
      element.classList.add('animate-float-3d');
      element.style.animationDelay = `${index * 0.5}s`;
    });
  });
});

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  if (heroSlideInterval) {
    clearInterval(heroSlideInterval);
  }
  if (newsSlideInterval) {
    clearInterval(newsSlideInterval);
  }
  cleanup();

  // 清理视差滚动效果
  const parallaxElements = document.querySelectorAll('.parallax-element');
  parallaxElements.forEach(element => {
    if (element._parallaxCleanup) {
      element._parallaxCleanup();
    }
  });

  // 清理鼠标跟随效果
  const mouseFollowElements = document.querySelectorAll('.mouse-follow');
  mouseFollowElements.forEach(element => {
    if (element._mouseFollowCleanup) {
      element._mouseFollowCleanup();
    }
  });

  // 清理滚动进度指示器
  if (window._scrollProgressCleanup) {
    window._scrollProgressCleanup();
  }
});
</script>
