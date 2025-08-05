<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label>Username</label>
        <input v-model="username" class="form-control" />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control" />
      </div>
      <div v-if="error" class="text-danger">{{ error }}</div>
      <button class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = () => {
  if (username.value === 'admin' && password.value === '123456') {
    isAuthenticated.value = true
    router.push('/about') // 登录成功跳转
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>
