<template>
  <div>
    <header class="header">
      <img src="./assets/cloud.svg" alt="Cloud Logo" class="logo" />
      <nav class="menu">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/todos">To Do</router-link></li>
          <li><router-link to="/posts">Post</router-link></li>
          <li><router-link to="/albums">Album</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<style>
.header {
  font-family: Roboto, sans-serif;
  background-color: #fffcf5;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
  margin-top: 0;
}

.menu ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: flex-end;
  align-items: center;
}

.menu ul li {
  margin: 0 5px;
}

.menu ul li a {
  text-decoration: none;
  color: #ff5479;
  font-weight: 500;
  font-size: 18px;
  padding: 5px 20px;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.3s;
}

.menu ul li a:hover {
  background-color: #ff5479;
  color: #f5f5ff;
  font-weight: 700;
  transform: scale(1.1);
}

.logo {
  width: 30px;
  height: 30px;
  margin-left: 20px;
}
</style>
