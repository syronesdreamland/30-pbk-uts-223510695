<template>
  <div class="body">
    <section class="create-todo">
      <h5 class="title">
        Hello, <input type="text" id="name" placeholder="Name here" v-model="name">
      </h5>
      <p class="counter">You have <strong style="color: pink;">{{ tasksThisMonth }} tasks</strong> this month.</p>
      <form @submit.prevent="addTodo">
        <h4>Ada Rencana Apa Hari Ini?</h4>
        <input type="text" placeholder="Buat UAS PBK" v-model="inputContent" />
        <h4>Pilih kategori:</h4>
        <div class="options">
          <label>
            <input type="radio" name="category1" value="todo" v-model="inputCategory" />
            <span class="bubble todo"></span>
            <div>To Do</div>
          </label>
          <label>
            <input type="radio" name="category2" value="doing" v-model="inputCategory" />
            <span class="bubble doing"></span>
            <div>Doing</div>
          </label>
          <label>
            <input type="radio" name="category3" value="later" v-model="inputCategory" />
            <span class="bubble later"></span>
            <div>Later</div>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      
      <div class="filter-container">
        <h4>Filter Kategori:</h4>
        <div class="filters">
          <button class="filter-button" @click="filter = 'all'">All</button>
          <button class="filter-button" @click="filter = 'todo'">To Do</button>
          <button class="filter-button" @click="filter = 'doing'">Doing</button>
          <button class="filter-button" @click="filter = 'later'">Later</button>
        </div>
      </div>

      <div class="todo-list">
        <table>
          <thead>
            <tr>
              <th>Kegiatan</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in filteredTodos" :key="todo.createdAt" :class="`todo-item ${todo.done ? 'done' : ''}`">
              <td :class="{ strikethrough: todo.done }">{{ todo.content }}</td>
              <td>{{ todo.category }}</td>
              <td>
                <button class="delete" @click="removeTodo(todo)">Delete</button>
                <button class="mark-done" @click="toggleDone(todo)">{{ todo.done ? 'Undo' : 'Done' }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const todos = ref([])
const inputContent = ref('')
const inputCategory = ref(null)
const filter = ref('all')
const name = ref('')

const todosAsc = computed(() => todos.value.slice().sort((a, b) => b.createdAt - a.createdAt))

const addTodo = () => {
  if (inputContent.value.trim() === '' || inputCategory.value === null) {
    return
  }

  todos.value.push({
    content: inputContent.value,
    category: inputCategory.value,
    done: false,
    createdAt: new Date().getTime()
  })

  inputContent.value = ''
  inputCategory.value = null
}

const removeTodo = todo => {
  todos.value = todos.value.filter(t => t !== todo)
}

const toggleDone = todo => {
  todo.done = !todo.done
}

const filteredTodos = computed(() => {
  if (filter.value === 'all') {
    return todosAsc.value
  }
  return todosAsc.value.filter(todo => todo.category === filter.value)
})

watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep: true })

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

const tasksThisMonth = computed(() => {
  const currentMonth = new Date().getMonth()
  return todos.value.filter(todo => new Date(todo.createdAt).getMonth() === currentMonth).length
})
</script>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-color: #fffcf5;
}

.greeting {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: #007bff;
  border-radius: 20px;
  padding: 10px;
  text-align: center;
}

input[type=text] {
  border: 3px solid #ff5479;
  border-radius: 10px;
  background: none;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.counter {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  color: white;
  background-color: #ff5479;
  border-radius: 20px;
}

.create-todo, .todo-list {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.create-todo h4 {
  font-size: 30px;
  font-weight: 500;
  color: #ff5479;
}

.create-todo form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 20px;
  border: 4px solid #ff5479;
  margin-bottom: 20px;
}

.create-todo form:hover {
  transform: scale(1.01);
}

.create-todo .options {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  font-weight: 500;
  font-size: 15px;
}

.create-todo .options label {
  margin: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.create-todo .options input[type="radio"] {
  display: none;
}

.create-todo .options .bubble {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.create-todo .options input[type="radio"]:checked + .bubble {
  border-color: #d61414;
}

.create-todo .options .todo {
  background: #ffcccb;
}

.create-todo .options .todo:hover {
  background: #ff5479;
}

.create-todo .options .doing {
  background: #f7ccff;
}

.create-todo .options .doing:hover {
  background: #ed87ff;
}

.create-todo .options .later {
  background: #fffccc;
}

.create-todo .options .later:hover {
  background: #ffea00;
}

button[type="submit"] {
  padding: 10px 20px;
  border: none;
  background: #ffcccb;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
  font-weight: 700;
}

button[type="submit"]:hover {
  background: #ff5479;
}

.filter-container {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 20px;
  border: 4px solid #ff5479;
  margin-bottom: 20px;
  text-align: center;
}

.filter-container h4 {
  font-size: 30px;
  font-weight: 500;
  color: #ff5479;
}

.filters {
  display: flex;
  justify-content: center;
}

.filter-button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  background: #ff5479;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
  font-weight: 700;
}

.filter-button:hover {
  background: #ffcccb;
}
.todo-list table {
  width: 100%;
  border-collapse:collapse;
  background-color: #fff;
  border-radius: 50px;
  border: 4px solid #ff5479;
  font-weight: 500;
  font-size: 16px;
}

.todo-list th{
  background-color: #ff5479;
  color: white;
  padding: 10px;

}
.todo-list td {
  padding: 10px;
  color: #333;
  border-bottom: 1px solid #bbbbbb;
}

.todo-list th {
  background-color: #ff5479;
}

.todo-list tr:hover {
  background-color: #f5f5f5;
  color: #ff5479;
}

.todo-list .todo-item.done {
  background-color: #e2e2e2;
  color: #e2e2e2;
}

.delete {
  background: red;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 15px;
  padding: 8px;
  font-weight: 700;
  margin-right: 5px;
}

.delete:hover {
  color: #c82333;
  background-color: white ;
  border: 1px solid #c82333;
  transition: background-color 0.3s, color 0.3s;
}

.strikethrough {
  text-decoration: line-through;
  color: #aaa;
}

.mark-done {
  background: #ff5479;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 15px;
  padding: 8px;
  font-weight: 700;
}

.mark-done:hover {
  color: #ff5479;
  background-color: white;
  border: 1px solid #ff5479;
  transition: background-color 0.3s, color 0.3s;
}


.todo-list .todo-item {
  transition: background-color 0.3s;
}


</style>