<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const name = ref('')
const input_content = ref('')
const input_category = ref(null)
const activeMenu = ref('todos') 

const todos_asc = computed(() => todos.value.sort((a, b) => b.createdAt - a.createdAt))

const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return
  }

  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime()
  })

  input_content.value = ''
  input_category.value = null
}

const removeTodo = todo => {
  todos.value = todos.value.filter(t => t !== todo)
}

watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep: true })

watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})

onMounted(() => {
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

const selectedUser = ref(null)
const users = ref([])
const posts = ref([])
const selectedUserName = ref('')

const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const fetchPosts = async () => {
  if (!selectedUser.value) return
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`)
    posts.value = await response.json()
    selectedUserName.value = users.value.find(user => user.id === selectedUser.value)?.name || ''
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

onMounted(fetchUsers)
</script>

<template>
  <main class="app">
    <header class="header">
      <nav class="menu">
        <ul>
          <li @click="activeMenu = 'post'"><a href="#">Post</a></li>
          <li @click="activeMenu = 'todos'"><a href="#">Todos</a></li>
        </ul>
      </nav>
    </header>
    <section class="greeting">
      <h2 class="title">
        WELCOME TO, <input class="text" type="text" placeholder="MY FIRST TODO LIST APP" v-model="name" />
      </h2>
    </section>
    <section v-if="activeMenu === 'todos'" class="create-todo">
      <h3>APA YANG KAMU INGIN LAKUKAN HARI INI</h3>
      <form @submit.prevent="addTodo">
        <h4>Masukkan kegiatan atau tugas yang ingin Anda lakukan:</h4>
        <input type="text" placeholder="Masukkan kegiatan atau tugas" v-model="input_content" />
        <h4>Pilih kategori:</h4>
        <div class="options">
          <label>
            <input type="radio" name="category" value="home" v-model="input_category" />
            <span class="bubble business"></span>
            <div>Rumah</div>
          </label>
          <label>
            <input type="radio" name="category" value="task" v-model="input_category" />
            <span class="bubble"></span>
            <div>Tugas</div>
          </label>
          <label>
            <input type="radio" name="category" value="work" v-model="input_category" />
            <span class="bubble work"></span>
            <div>Kerja</div>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
    <section v-if="activeMenu === 'todos'" class="todo-list">
      <h3>HASIL YANG SUDAH ANDA LAKUKAN</h3>
      <div class="list">
        <div v-for="todo in todos_asc" :key="todo.createdAt" :class="`todo-item ${todo.done && 'done'}`">
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.category}`"></span>
          </label>
          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">delete</button>
          </div>
        </div>
      </div>
    </section>
    <section v-if="activeMenu === 'post'" class="post-section">
      <h2>Postingan Pengguna</h2>
      <div class="select-user">
        <label>Pilih Pengguna:</label>
        <select v-model="selectedUser" @change="fetchPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div v-if="posts.length > 0" class="user-posts">
        <h3>Postingan Pengguna: {{ selectedUserName }}</h3>
        <ul>
          <li v-for="post in posts" :key="post.id">
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>
          </li>
        </ul>
      </div>
    </section>
    </main>
</template>
<script>
</script>