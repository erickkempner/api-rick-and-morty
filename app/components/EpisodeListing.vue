<template>
    <div>
        <HeaderMain v-if="pagePath" :noCategory="noCategory" class="py-15 px-4" />


        <div v-if="isLoading" class="relative min-h-[400px] flex items-center justify-center">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
                <p class="mt-4 text-gray-400">Carregando episódios...</p>
            </div>
        </div>
        <div v-else>
            <CardEpisode :listOfEpisodes="displayedEpisodes" :seeAll="noCategory" />
        </div>

        <Pagination v-if="pagePath && !searchTerm" :currentPage="currentPage" :totalCount="totalCount / 2"
            :itemsPerPage="20" @update:currentPage="handlePageUpdate" />
    </div>
</template>

<script setup lang="ts">
import { episodesService } from '~/services/episodesService';
import type { Episode } from '~/types';
import { usePagesEpisodeStore } from '~/stores/pagesEpisode';
import { useSearchStore } from '~/stores/search';

const { noCategory } = defineProps<{ noCategory: boolean }>();

const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const pagesStore = usePagesEpisodeStore()
const searchStore = useSearchStore()

// Use storeToRefs to ensure reactivity
const { totalCount } = storeToRefs(pagesStore)
const { episodeResults, isSearching, searchTerm } = storeToRefs(searchStore)

// Initialize from URL query or store
const initialPage = route.query.page ? Number(route.query.page) : pagesStore.currentPage

// Fetch initial data
const { data } = await episodesService.list({ page: initialPage })

const dataEpisode = ref<Episode[]>(data.value?.results || [])
const currentPage = ref(initialPage)

// Update store with initial values
pagesStore.setPage(initialPage)
pagesStore.setTotalCount(data.value?.info.count || 51)

// Clear search when component mounts to ensure clean state
onMounted(() => {
    searchStore.clearSearch()
})

// Computed para decidir quais episódios mostrar
const displayedEpisodes = computed(() => {
    // Se houver uma busca ativa, mostra os resultados da busca
    if (searchTerm.value && episodeResults.value.length > 0) {
        return episodeResults.value
    }
    // Se está buscando mas não tem resultados, mostra array vazio
    if (searchTerm.value && isSearching.value) {
        return []
    }
    // Caso contrário, mostra os episódios da paginação normal
    return dataEpisode.value
})

const pagePath = computed(() => {
    if (route.path === '/') {
        return false
    }
    return true
})

// Handle page update from Pagination component
const handlePageUpdate = async (newPage: number) => {
    if (newPage === currentPage.value) {
        return
    }

    currentPage.value = newPage
    isLoading.value = true

    try {
        // Update store
        pagesStore.setPage(newPage)

        // Update URL
        await router.push({ query: { page: newPage.toString() } })

        // Fetch new data
        const { data: newData } = await episodesService.list({ page: newPage })
        dataEpisode.value = newData.value?.results || []
        pagesStore.setTotalCount(newData.value?.info.count || 51)
        console.log('EpisodeListing - Data loaded successfully')
    } catch (error) {
        console.error('EpisodeListing - Error updating page:', error)
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped></style>