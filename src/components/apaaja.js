<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const name = ref('')
const activeMenu = ref('todos')
const input_content = ref('')
const input_category = ref(null)

const todos_asc = computed(() => todos.value.sort((a,b) => b.createdAt - a.createdAt))


const filter = ref('all')

watch(name, (newVal) => {
	localStorage.setItem('name', newVal)
})

watch(todos, (newVal) => {
	localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
})

const addTodo = () => {
	if (input_content.value.trim() === '' || input_category.value === null) {
		return
	}

	todos.value.push({
		content: input_content.value,
		category: input_category.value,
		done: false,
		editable: false,
		createdAt: new Date().getTime()
	})
}

const removeTodo = (todo) => {
	todos.value = todos.value.filter((t) => t !== todo)
}

onMounted(() => {
	name.value = localStorage.getItem('name') || ''
	todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

const filterTodos = (filter) => {
	if (filter === 'all') {
		return todos.value
	} else if (filter === 'completed') {
		return todos.value.filter(todo => todo.done)
	} else if (filter === 'ongoing') {
		return todos.value.filter(todo => !todo.done)
	}
}


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
				Halo, <input type="text" id="name" placeholder="Name here" v-model="name">
			</h2>
		</section>

		<section class="create-todo">
			<h2>CREATE A TO DO</h2>

			<form id="new-todo-form" @submit.prevent="addTodo">
				<input 
					type="text" 
					name="content" 
					id="content" 
					placeholder="Buat UTS PBK"
					v-model="input_content" />
				
				<h4>Pick a category</h4>
				<div class="options">

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category1" 
							value="todo"
							v-model="input_category" />
						<span class="bubble todo"></span>
						<div>To Do</div>
					</label>

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category2" 
							value="doing"
							v-model="input_category" />
						<span class="bubble doing"></span>
						<div>Doing</div>
					</label>

		  <label>
						<input 
							type="radio" 
							name="category" 
							id="category3" 
							value="future"
							v-model="input_category" />
						<span class="bubble future"></span>
						<div>Future</div>
					</label>
				</div>

				<input type="submit" value="Add todo" />
			</form>
		</section>

		<section class="todo-list">
			<h3>TO DO LIST</h3>
			<div class="list" id="todo-list">
				<div v-for="todo in filterTodos(filter)" :key="todo.id" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input type="checkbox" v-model="todo.done" />
						<span :class="`bubble ${todo.category === 'doing' ? 'doing' : todo.category === 'todo' ? 'todo' : 'future'}`"></span>
					</label>
					<div class="todo-content">
						<input type="text" v-model="todo.content" @click="scribble(todo)" />
					</div>
					<div class="actions">
						<button class="delete" @click="removeTodo(todo)">Delete</button>
					</div>
				</div>
			</div>
		</section>

		<div class="filters">
			<button class="filter-button" @click="filter = 'all'">All</button>
			<button class="filter-button" @click="filter = 'completed'">Completed</button>
			<button class="filter-button" @click="filter = 'ongoing'">Ongoing</button>
		</div>
    <section v-if="activeMenu == 'post'" class="post-section">
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