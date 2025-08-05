<template>
    <div class="container mt-5">
      <h1>Sign in</h1>
      <p><input type="text" placeholder="Email" v-model="email" class="form-control" /></p>
      <p><input type="password" placeholder="Password" v-model="password" class="form-control" /></p>
      <p><button class="btn btn-success" @click="signin">Sign in via Firebase</button></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  
  const email = ref("")
  const password = ref("")
  const router = useRouter()
  const auth = getAuth()
  
  const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log("Firebase Login Successful")
        console.log(auth.currentUser)  
        router.push('/')
      })
      .catch((error) => {
        console.log(error.code)
      })
  }
  </script>
  