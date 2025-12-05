import { defineStore } from 'pinia'
import type { Character } from '~/types'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchTerm: '',
    searchResults: [] as Character[],
    isSearching: false,
  }),
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term
    },
    setSearchResults(results: Character[]) {
      this.searchResults = results
    },
    setIsSearching(value: boolean) {
      this.isSearching = value
    },
    clearSearch() {
      this.searchTerm = ''
      this.searchResults = []
      this.isSearching = false
    },
  },
})
