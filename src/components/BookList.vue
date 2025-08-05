<template>
    <div class="container mt-5">
      <h2 class="mb-4">Book List (Unfiltered - All)</h2>
      <ul class="list-group mb-4">
        <li v-for="book in books" :key="book.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div v-if="editId !== book.id">
            <strong>{{ book.name }}</strong> (ISBN: {{ book.isbn }})
          </div>
  
          <div v-else class="d-flex flex-column flex-sm-row gap-2 align-items-start">
            <input v-model="editName" class="form-control" placeholder="Book Name" />
            <input v-model.number="editIsbn" class="form-control" placeholder="ISBN" />
          </div>
  
          <div>
            <button v-if="editId !== book.id" class="btn btn-warning btn-sm me-2" @click="startEdit(book)">
              Edit
            </button>
            <button v-else class="btn btn-success btn-sm me-2" @click="confirmEdit(book.id)">
              Save
            </button>
            <button v-if="editId === book.id" class="btn btn-secondary btn-sm me-2" @click="cancelEdit">
              Cancel
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteBook(book.id)">
              Delete
            </button>
          </div>
        </li>
      </ul>
  
      <h2 class="mb-4">Filtered Book List (isbn > 1000, ordered, limited)</h2>
      <ul class="list-group">
        <li v-for="book in filteredBooks" :key="book.id" class="list-group-item">
          <strong>{{ book.name }}</strong> (ISBN: {{ book.isbn }})
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import db from '../firebase/init'
  import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    updateDoc
  } from 'firebase/firestore'
  
  const books = ref([])
  const filteredBooks = ref([])
  
  const editId = ref(null)
  const editName = ref('')
  const editIsbn = ref('')
  
  const fetchBooks = async () => {
    const snapshot = await getDocs(collection(db, 'books'))
    books.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
  
  const fetchFilteredBooks = async () => {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(3)
    )
    const snapshot = await getDocs(q)
    filteredBooks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
  
  const deleteBook = async id => {
    await deleteDoc(doc(db, 'books', id))
    fetchBooks()
    fetchFilteredBooks()
  }
  
  const startEdit = book => {
    editId.value = book.id
    editName.value = book.name
    editIsbn.value = book.isbn
  }
  
  const cancelEdit = () => {
    editId.value = null
    editName.value = ''
    editIsbn.value = ''
  }
  
  const confirmEdit = async id => {
    const docRef = doc(db, 'books', id)
    await updateDoc(docRef, {
      name: editName.value,
      isbn: Number(editIsbn.value)
    })
    cancelEdit()
    fetchBooks()
    fetchFilteredBooks()
  }
  
  onMounted(() => {
    fetchBooks()
    fetchFilteredBooks()
  })
  </script>
  