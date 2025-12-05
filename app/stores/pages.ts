import { defineStore } from 'pinia'

export const usePagesStore = defineStore('pages', {
  state: () => ({
    currentPage: 1,
    totalCount: 0,
  }),
  actions: {
    setPage(page: number) {
      this.currentPage = page
    },
    setTotalCount(totalCount: number) {
      this.totalCount = totalCount
    },
    nextPage() {
      this.currentPage++
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
  },
})