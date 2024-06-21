<script setup>
import { ref, onMounted } from 'vue'

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
  <section class="post-section">
    <h2>Postingan Pengguna</h2>
    <div class="select-user">
      <label style="color: #ff5479; font-weight: 500;font-size: 18px;"> Pilih Pengguna: </label>
      <select v-model="selectedUser" @change="fetchPosts" class="select-box">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <div v-if="posts.length > 0" class="user-posts">
      <h5 style="color: #ff5479;font-weight: 500;">Postingan Pengguna: {{ selectedUserName }}</h5>
      <table class="post-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Isi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<style scoped>
.body {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
}


.post-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  border:3px solid #ff5479;
  border-radius: 30px;
  text-align: center;
}

.post-section h2 {
  margin-bottom: 50px;
  color: #ff5479;
  font-weight: 700;
}

.select-box {
  padding: 8px 12px;
  font-size: 16px;
  border: 3px solid #ff5479;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  transition: border-color 0.3s, background-color 0.3s;;
}

.select-box:focus {
  outline: none;
  border-color: #ff5479;
  background-color: white;
}

.user-posts {
  background-color: #fffcf5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
}

.post-table th,
.post-table td {
  padding: 12px;
  border-radius: 20px;
  border: 3px solid #ff5479;
}

.post-table th {
  background-color: #fff5f7;
}

.post-table td {
  background-color: white;
}

.post-table tr:hover {
  background-color: #f0f0f0;
}

/* Background Image Styling */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fffcf5; 
 background-size: cover;
  background-position: center;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; 
}

/* Text Color Styling */
h2, h3, h4, label {
  color: white;
}
</style>
