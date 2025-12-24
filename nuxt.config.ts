// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: {
    // 配置静态资源规则
    routeRules: {
      "/video/**": {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Type": "video/mp4",
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
        "https://fc-mp-a8d810ca-99cf-4f32-babc-6547a65799b4.next.bspapp.com/http/router",
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
  },
  // 启用源码映射以便调试
  sourcemap: {
    client: true,
    server: true,
  },
});
