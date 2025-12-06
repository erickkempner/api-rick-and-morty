import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [] as number[],
  }),

  getters: {
    isFavorite: (state) => (id: number | string): boolean => {
      return state.favorites.includes(Number(id))
    },
    
    favoriteList: (state): number[] => state.favorites,
    
    count: (state): number => state.favorites.length,
  },

  actions: {
    toggleFavorite(id: number | string) {
      const numId = Number(id)
      const index = this.favorites.indexOf(numId)

      if (index !== -1) {

        this.favorites.splice(index, 1)
      } else {

        this.favorites.push(numId)
      }
    },
    
    clearAll() {
      this.favorites = []
    },
  },

  persist: {
    // Apenas verificamos o window, sem precisar de serializer complexo
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})