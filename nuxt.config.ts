// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // 优化应用配置，防止FOUC
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      ],
      // 预加载关键CSS
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: true,
        },
      ],
      // 添加高德地图脚本
      script: [
        {
          type: 'text/javascript',
          src: 'https://webapi.amap.com/maps?v=2.0&key=d689295bd13850e7d2a985fd1f737a78'
        }
      ],
      // 添加noscript标签，当JavaScript禁用时显示内容
      noscript: [
        { innerHTML: "<style>body { opacity: 1 !important; }</style>" },
      ],
    },
    // 启用页面过渡
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  nitro: {
    // 配置静态资源规则
    routeRules: {
      "/video/**": {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Type": "video/mp4",
        },
      },
      // 优化静态资源缓存
      "/_nuxt/**": {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },
    },
  },
  modules: ["@nuxt/icon", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // 配置运行时选项
  runtimeConfig: {
    // 公共配置，可在客户端和服务端访问
    public: {
      // 设置 API 基础 URL
      apiBase:
        "https://fc-mp-6dcc09dd-1236-43d8-99fa-f4368884f556.next.bspapp.com/http/router/",
    },
    // 私有配置，仅在服务端访问
    // privateSecret: process.env.PRIVATE_SECRET
  },
  // 配置构建选项，保留生产模式下的 console 日志
  build: {
    transpile: [],
  },
  // 配置 Vite 构建选项，保留生产模式下的 console 日志
  vite: {
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: false,
          pure_funcs: [],
        },
        format: {
          comments: false,
        },
      },
    },
    optimizeDeps: {
      include: [],
    },
    // 优化CSS加载
    css: {
      devSourcemap: true,
    },
  },
  // 启用源码映射以便调试
  sourcemap: {
    client: true,
    server: true,
  },
});
