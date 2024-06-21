<template>
  <div class="home-container">
    <div class="home-content">
      <h1 class="home-title">Selamat Datang di Website Tugas UAS PBK</h1>
      <p class="home-description">Ini merupakan tugas <strong> Alif Muhammad Aditya</strong> dengan <strong> 223510695</strong> dari kelas <strong>4F</strong></p>
      <div class="button-container">
        <button class="btn" @click="handleTodoClick">Todo</button>
        <button class="btn" @click="handlePostClick">Post</button>
        <button class="btn" @click="handleAlbumsClick">Albums</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleTodoClick() {
      this.$router.push('/todos');
    },
    handlePostClick() {
      this.$router.push('/posts');
    },
    handleAlbumsClick() {
      this.$router.push('/albums');
    }
  }
}
</script>

<style>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  height: 105vh;
  background-image: url('https://images.unsplash.com/photo-1499796683658-b659bc751db1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
}

.home-content {
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 253, 235, 0.945);
  border-radius: 100px;
}

.home-content:hover {
  transform:scale(.98);
}

.home-title {
  font-size: 36px;
  font-weight: 620;
  color: #ff5479;
  margin-bottom: 2px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.home-description {
  font-size: 18px;
  color: #ff5f81;
  margin-bottom: 30px;
  font-weight: 400;
}
.btn {
  padding: 10px 20px;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 20px;
  background-color: #ff5479;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  outline: 0; 
}

.btn:hover {
  background-color: #ffffff;
  color: #ff5479;
  transform: scale(1.1); 
}

</style>