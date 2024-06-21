<template>
  <div class="table">
    <h2>Album</h2>
    <div v-if="albums.length">
      <table class="album-table">
        <tbody>
          <tr v-for="album in albums" :key="album.id" @click="viewAlbum(album.id)" class="album-item" style="cursor: pointer;">
            <td class="album-id">{{ album.id }}</td>
            <td class="album-title">{{ album.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Tidak Ada Album</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAlbumsStore } from '../stores/albums'
import { useRouter } from 'vue-router'

const albumsStore = useAlbumsStore()
const albums = ref([])
const router = useRouter()

const fetchAlbums = async () => {
  await albumsStore.fetchAlbums()
  albums.value = albumsStore.albums
}

const viewAlbum = (id) => {
  router.push(`/albums/${id}`)
}

onMounted(fetchAlbums)
</script>

<style>
.body {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.table {
  margin: 0 auto;
  width: 60%;
  text-align: center;
}

.table h2 {
  color: #ff5479;
  text-align: center;
  font-weight:700;
}

.album-table {
  width: 60%;
  border-collapse:collapse;
  border-spacing: 0 10px;
  margin: 0 auto;
  
}

.album-item {
  transition: background-color 0.3s, color 0.3s;
  border-radius: 60px;

}

.album-item:hover {
  background-color: #ff5479;
  color: white;
}

.album-id, .album-title {
  padding: 10px;
  border: 2px solid #ff5479;
  margin: 5px;

}

.album-id {
  font-weight: bold;
}

</style>
