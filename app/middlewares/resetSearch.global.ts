import { useSearchStore } from '~/stores/search'

export default defineNuxtRouteMiddleware(() => {
  const searchStore = useSearchStore()
  searchStore.clearSearch()
})
