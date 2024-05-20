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
			<div style="margin-bottom:10px">Pilih Pengguna:</div>
			<select v-model="selectedUser" @change="fetchPosts">
				<option v-for="user in users" :key="user.id" :value="user.id" style="margin-bottom:10px; margin-left: 5%">{{ user.name }}</option>
			</select>
		</div>
		<div v-if="posts.length > 0" class="user-posts">
			<section class="post-section">
				<h3><strong><div style="margin-bottom: 10px; margin-top:50px">Postingan Pengguna:   {{ selectedUserName }}</div></strong></h3>
				<ul>
					<li v-for="post in posts" :key="post.id">
						<h3><strong>{{ post.title }}</strong></h3>
						<p style="margin-bottom: 20px">{{ post.body }}</p>
					</li>
				</ul>
			</section>
		</div>
	</section>
</template>
