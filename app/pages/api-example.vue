<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">API 示例</h1>

    <!-- 获取数据示例 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">获取数据示例</h2>
      <button @click="fetchData" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
        :disabled="fetchLoading">
        {{ fetchLoading ? '获取中...' : '获取数据' }}
      </button>

      <div v-if="fetchDataResult" class="mt-4 p-4 bg-gray-100 rounded">
        <h3 class="font-semibold mb-2">获取结果：</h3>
        <pre>{{ JSON.stringify(fetchDataResult, null, 2) }}</pre>
      </div>

      <div v-if="fetchError" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
        <h3 class="font-semibold mb-2">错误信息：</h3>
        <pre>{{ fetchError.message }}</pre>
      </div>
    </section>

    <!-- 提交数据示例 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">提交数据示例</h2>
      <div class="mb-4">
        <label class="block mb-2">示例数据：</label>
        <input v-model="postData" type="text" class="w-full p-2 border rounded" placeholder="输入要提交的数据" />
      </div>

      <button @click="submitData" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-4"
        :disabled="submitLoading">
        {{ submitLoading ? '提交中...' : '提交数据' }}
      </button>

      <div v-if="submitResult" class="mt-4 p-4 bg-gray-100 rounded">
        <h3 class="font-semibold mb-2">提交结果：</h3>
        <pre>{{ JSON.stringify(submitResult, null, 2) }}</pre>
      </div>

      <div v-if="submitError" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
        <h3 class="font-semibold mb-2">错误信息：</h3>
        <pre>{{ submitError.message }}</pre>
      </div>
    </section>

    <!-- 使用 Composable 示例 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">使用 Composable 示例</h2>
      <button @click="refreshData" class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mr-4"
        :disabled="pending">
        {{ pending ? '刷新中...' : '刷新数据' }}
      </button>

      <div v-if="data" class="mt-4 p-4 bg-gray-100 rounded">
        <h3 class="font-semibold mb-2">数据：</h3>
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      </div>

      <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
        <h3 class="font-semibold mb-2">错误信息：</h3>
        <pre>{{ error.message }}</pre>
      </div>
    </section>

    <!-- API 基础 URL 显示 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">API 配置</h2>
      <div class="p-4 bg-gray-100 rounded">
        <p><strong>API 基础 URL:</strong> {{ apiBaseUrl }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * API 示例页面
 * 展示如何使用配置的 API 端点进行数据请求
 */

// 设置页面元数据
useHead({
  title: 'API 示例 - 淼泽松源',
  meta: [
    { name: 'description', content: 'API 使用示例页面' }
  ]
});

// 获取 API 基础 URL
const { $api } = useNuxtApp();
const apiBaseUrl = $api.base();

// 获取数据的状态
const fetchDataResult = ref(null);
const fetchError = ref(null);
const fetchLoading = ref(false);

// 提交数据的状态
const postData = ref('示例数据');
const submitResult = ref(null);
const submitError = ref(null);
const submitLoading = ref(false);

// 使用 Composable 获取数据
const { data, error, pending, refresh } = await useApiFetch('example');

// 获取数据函数
const fetchData = async () => {
  fetchLoading.value = true;
  fetchError.value = null;

  try {
    fetchDataResult.value = await $api.get('example');
  } catch (err) {
    fetchError.value = err;
  } finally {
    fetchLoading.value = false;
  }
};

// 提交数据函数
const submitData = async () => {
  submitLoading.value = true;
  submitError.value = null;

  try {
    submitResult.value = await $api.post('example', { data: postData.value });
  } catch (err) {
    submitError.value = err;
  } finally {
    submitLoading.value = false;
  }
};

// 刷新数据函数
const refreshData = async () => {
  await refresh();
};
</script>