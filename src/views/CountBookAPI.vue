<template>
    <div class="container mt-5">
      <h2>📊 Count Book API</h2>
  
      <!-- 加载中 / 错误 -->
      <div v-if="loading" class="alert alert-info">Loading data…</div>
      <div v-if="error"   class="alert alert-danger">{{ error }}</div>
  
      <!-- 成功后展示 JSON -->
      <div v-if="apiResponse" class="api-response">
        <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const authors       = ref([])
  const loading       = ref(false)
  const error         = ref(null)
  const apiResponse   = ref(null)
  const authorsCount  = ref(0)
  const totalBooks    = ref(0)
  
  // 计算作者数量和书籍总数
  const calculateStats = () => {
    authorsCount.value = authors.value.length
    totalBooks.value   = authors.value.reduce((sum, a) => sum + a.famousWorks.length, 0)
  }
  
  // 异步读取本地 JSON，组装 API 返回格式
  const getApiData = async () => {
    loading.value = true
    error.value   = null
  
    try {
      const res = await fetch('/src/assets/json/authors.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      authors.value = data
      calculateStats()
  
      apiResponse.value = {
        success: true,
        data: {
          authorsCount: authorsCount.value,
          totalBooks:   totalBooks.value,
          authors:      authors.value.map(a => ({
            name:      a.name,
            bookCount: a.famousWorks.length
          }))
        },
        timestamp: new Date().toISOString()
      }
    }
    catch (e) {
      error.value = `Failed to load authors.json: ${e.message}`
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }
  
  onMounted(getApiData)
  
  // 如果你需要在模板外调用重新拉取：
  defineExpose({ getApiData })
  </script>
  
  <style scoped>
  .api-response {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 0.25rem;
    overflow-x: auto;
  }
  </style>
  