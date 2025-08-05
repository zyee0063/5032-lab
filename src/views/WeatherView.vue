<template>
    <div class="container mt-5">
      <h1 class="mb-4 text-center">🌤️ Weather App</h1>
  
      <!-- 搜索栏 -->
      <div class="input-group mb-4">
        <input
          v-model="city"
          type="text"
          class="form-control"
          placeholder="Enter city name (e.g. Clayton, AU)"
        />
        <button @click="searchByCity" class="btn btn-primary">Search</button>
      </div>
  
      <!-- 错误提示 -->
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
  
      <!-- 显示天气信息 -->
      <div v-if="weatherData" class="card text-center mx-auto" style="max-width: 24rem;">
        <div class="card-body">
          <h2 class="card-title">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <img :src="iconUrl" alt="Weather Icon" />
          <p class="display-4">{{ temperature }}°C</p>
          <p class="lead text-capitalize">{{ weatherData.weather[0].description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  // TODO: 替换成你从 OpenWeatherMap 控制台获取的真实 API Key
  const apiKey = '21f152f5641bb89b5963817013838524'
  
  const city = ref('')
  const weatherData = ref(null)
  const error = ref('')
  
  // 根据浏览器定位获取当前天气
  const fetchCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported by your browser.'
      return
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        await fetchWeatherData(url)
      },
      () => {
        error.value = 'Unable to retrieve your location.'
      }
    )
  }
  
  // 根据城市名称查询天气
  const searchByCity = async () => {
    error.value = ''
    weatherData.value = null
  
    if (!city.value.trim()) {
      error.value = 'Please enter a city name.'
      return
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city.value
    )}&appid=${apiKey}&units=metric`
  
    await fetchWeatherData(url)
  }
  
  const fetchWeatherData = async (url) => {
    try {
      const resp = await axios.get(url)
      weatherData.value = resp.data
    } catch (err) {
      error.value = 'Failed to fetch weather data.'
      console.error(err)
    }
  }
  
  onMounted(() => {
    // 页面加载时先获取当前定位天气
    fetchCurrentLocationWeather()
  })
  
  // 计算属性：温度（已是摄氏度，不需转换）
  const temperature = computed(() =>
    weatherData.value ? Math.round(weatherData.value.main.temp) : ''
  )
  
  // 计算属性：图标 URL
  const iconUrl = computed(() =>
    weatherData.value
      ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
      : ''
  )
  </script>
  
  <style scoped>
  .container {
    max-width: 640px;
  }
  .card img {
    width: 100px;
    height: 100px;
  }
  </style>
  