import { defineStore } from 'pinia'

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: []
  }),
  actions: {
    async fetchAlbums() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums')
        this.albums = await response.json()
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    }
  }
})
