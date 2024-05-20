<!-- App.vue -->
<template>
	<main class="app">
	  <header class="header">
		<nav class="menu">
		  <button @click="switchToPost" class="btn btn-primary" style="color: green; margin-right: 10px; padding: 5px 5px; border-radius: 5px; font-size: 16px; font-weight: bold;" :class="{ active: activeMenu === 'post' }">Post</button>
		  <button @click="switchToTodos" class="btn btn-primary" style="color: green; margin-right: 10px; padding: 5px 5px; border-radius: 5px; font-size: 16px; font-weight: bold;" :class="{ active: activeMenu === 'todos' }">Todos</button>
		</nav>
	  </header>
  
	  <todo v-if="activeMenu === 'todos'" />
  
	  <post v-if="activeMenu === 'post'" />
	</main>
  </template>
  
  <script setup>
  import Todo from './Todo.vue'
  import Post from './Post.vue'
  import { ref } from 'vue'
  
  const activeMenu = ref('todos')
  
  const switchToTodos = () => {
	activeMenu.value = 'todos'
  }
  
  const switchToPost = () => {
	activeMenu.value = 'post'
  }
  </script>
  
  <style scoped>
  /* Tambahkan styling CSS sesuai kebutuhan Anda */
  </style>
  