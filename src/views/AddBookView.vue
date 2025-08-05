<template>
    <div class="container mt-5">
      <h2 class="mb-4">Add a New Book</h2>
  
      <form @submit.prevent="addBook" class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="isbn" class="form-label">ISBN</label>
          <input
            type="text"
            v-model="isbn"
            id="isbn"
            class="form-control"
            required
          />
        </div>
  
        <div class="mb-3">
          <label for="name" class="form-label">Book Name</label>
          <input
            type="text"
            v-model="name"
            id="name"
            class="form-control"
            required
          />
        </div>
  
        <button type="submit" class="btn btn-success">Add Book</button>
      </form>
  
      <hr class="my-5" />
  
      <!-- 显示 BookList 组件，列出 ISBN > 1000 的图书 -->
      <BookList />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import db from '../firebase/init.js'
  import { collection, addDoc } from 'firebase/firestore'
  import BookList from '../components/BookList.vue' // ✅ 导入组件
  
  const isbn = ref('')
  const name = ref('')
  
  const addBook = async () => {
    try {
      const isbnNumber = Number(isbn.value)
      if (isNaN(isbnNumber)) {
        alert('ISBN must be a valid number')
        return
      }
  
      await addDoc(collection(db, 'books'), {
        isbn: isbnNumber,
        name: name.value
      })
  
      alert('✅ Book added successfully!')
      isbn.value = ''
      name.value = ''
    } catch (error) {
      console.error('❌ Error adding book:', error)
      alert('Error adding book. Please try again.')
    }
  }
  </script>
  