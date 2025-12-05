import { defineStore } from 'pinia'
import type { Character, Episode, Location } from '~/types'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchTerm: '',
    characterResults: [] as Character[],
    episodeResults: [] as Episode[],
    locationResults: [] as Location[],
    isSearching: false,
  }),
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term
    },
    setCharacterResults(results: Character[]) {
      this.characterResults = results
    },
    setEpisodeResults(results: Episode[]) {
      this.episodeResults = results
    },
    setLocationResults(results: Location[]) {
      this.locationResults = results
    },
    setIsSearching(value: boolean) {
      this.isSearching = value
    },
    clearSearch() {
      this.searchTerm = ''
      this.characterResults = []
      this.episodeResults = []
      this.locationResults = []
      this.isSearching = false
    },
  },
})
