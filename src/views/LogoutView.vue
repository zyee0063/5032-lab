<template>
  <div class="container mt-5 text-center">
    <h2>✅ You have been logged out</h2>
    <p class="text-muted">Redirecting to login page in 3 seconds...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()

onMounted(() => {
  signOut(auth)
    .then(() => {
      console.log('✅ User signed out.')
      // 再次监听当前用户（应为 null）
      onAuthStateChanged(auth, (user) => {
        console.log('👤 Current user:', user) // null
      })

      // 3 秒后跳转到 Firebase 登录页
      setTimeout(() => {
        router.push('/FireLogin')
      }, 3000)
    })
    .catch((error) => {
      console.error('❌ Error signing out:', error)
    })
})
</script>

<style scoped>
h2 {
  color: #275fda;
}
</style>
