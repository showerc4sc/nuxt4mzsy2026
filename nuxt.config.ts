// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: {
    // 配置静态资源规则
    routeRules: {
      '/video/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Content-Type': 'video/mp4'
        }
      }
    }
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
        "https://env-00jxt6g9928j.dev-hz.cloudbasefunction.cn/http/router/",
    },
    // 私有配置，仅在服务端访问
    // privateSecret: process.env.PRIVATE_SECRET
  },
});
