<script setup>
import { ref, computed, watch } from 'vue'

const todos = ref([])
const input_content = ref('')
const input_category = ref(null)

const todos_asc = computed(() => todos.value.sort((a,b) => b.createdAt - a.createdAt))

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

watch(todos, (newVal) => {
	localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
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
</script>

<template>
	<section class="create-todo">
		<section class="greeting" style="display: flex; justify-content: center; align-items: center;">
			<h2 class="title">
				Halo, <input type="text" id="name" placeholder="Name here" v-model="name">
			</h2>
		</section>
		<h2>CREATE A TO DO</h2>

		<form id="new-todo-form" style="margin-top:10px" @submit.prevent="addTodo">
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
</section>
</template>
