<template>
  <div class="album">
    <h2>Pilih Album:</h2>
    <select v-model="selectedAlbum" @change="fetchPhotos">
      <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.title }}</option>
    </select>
    <h5>Photos in Album {{ selectedAlbum }}</h5>
    <table class="albumt" v-if="photos.length" >
      <thead >
        <tr >
          <th >Album</th>
          <th>Judul</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="photo in photos" :key="photo.id">
          <td>
            <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" style="width: 100px; height: 100px; object-fit: cover; border: 1px solid #007bff; border-radius: 5px; cursor: pointer; transition: border-color 0.3s;">
          </td>
          <td>{{ photo.title }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else >
      <p>Tidak Ada Foto</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedAlbum = ref(route.params.id)
const albums = ref([])
const photos = ref([])

const fetchAlbums = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums`)
    albums.value = await response.json()
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
}

const fetchPhotos = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${selectedAlbum.value}/photos`)
    photos.value = await response.json()
  } catch (error) {
    console.error('Error fetching photos:', error)
  }
}

const showPhoto = (url) => {
  window.open(url, '_blank')
}

onMounted(() => {
  fetchAlbums()
  fetchPhotos()
})
</script>

<style scoped>
.body{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}

.album{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
}

.album select{
  padding: 10px 20px;
  margin-bottom: 20px;
  border: 2.5px solid #ff5479;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.album h2{
  color: #ff5479;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}

.album h5{
  color: #ff5479;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
}

.AlbumDetails-container {
  display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-size: cover;
    background-position: center;
 
}

.albumt{
  border-collapse: collapse;
  border-spacing: 10 10px;
  padding:20px;
}
</style>
