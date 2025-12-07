<template>
    <div>
        <HeaderMain v-if="shouldShowSearchBar" :noCategory="true" class="py-15 px-4" />


        <div v-if="isLoading" class="relative min-h-[400px] flex items-center justify-center">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
                <p class="mt-4 text-gray-400">Carregando episódios...</p>
            </div>
        </div>
        <div v-else>
            <CardEpisode :title="props.title" :listOfEpisodes="displayedEpisodes" :seeAll="false" />
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
import { useFavoriteEpisodeStore } from '~/stores/favoriteEpisode';

const props = withDefaults(defineProps<{ noCategory?: boolean, showSearchBar?: boolean, title?: string }>(), {
    noCategory: true,
    showSearchBar: undefined,
    title: 'Episódios'
});





const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const pagesStore = usePagesEpisodeStore()
const searchStore = useSearchStore()

const favoriteStore = useFavoriteEpisodeStore()
const { favoriteList } = storeToRefs(favoriteStore)
const favoriteEpisodesData = ref<Episode[]>([])

// Use storeToRefs to ensure reactivity
const { totalCount } = storeToRefs(pagesStore)
const { episodeResults, isSearching, searchTerm } = storeToRefs(searchStore)

// Initialize from URL query or store
const initialPage = route.query.page ? Number(route.query.page) : pagesStore.currentPage

// Fetch initial data
const { data } = await episodesService.list({ page: initialPage })

const dataEpisode = ref<Episode[]>(data.value?.results || [])
const currentPage = ref(initialPage)

const shouldShowSearchBar = computed(() => {
    if (props.showSearchBar !== undefined) {
        return props.showSearchBar
    }
    return route.path.replace(/\/$/, '') === '/episodes'
})

// Update store with initial values
pagesStore.setPage(initialPage)
pagesStore.setTotalCount(data.value?.info.count || 51)

// Computed para decidir quais episódios mostrar
const displayedEpisodes = computed(() => {
    // Se há um termo de busca ativo
    if (searchTerm.value) {
        // Se está buscando, mostra vazio (loading)
        if (isSearching.value) {
            return []
        }
        // Se terminou de buscar, mostra os resultados (pode ser array vazio)
        return episodeResults.value
    }
    // Caso contrário, mostra os episódios da paginação normal
    if (route.path === '/favorites') {
        return favoriteEpisodesData.value
    }
    return dataEpisode.value
})

const pagePath = computed(() => {
    if (route.path === '/' || route.path === '/favorites') {
        return false
    }
    return true
})

// Handle page update from Pagination component
if (route.path === '/favorites') {
    if (favoriteList.value.length > 0) {
        const { data: favoritesData } = await episodesService.getMany(favoriteList.value)
        // Handle single object return from API when only one ID is requested
        if (Array.isArray(favoritesData.value)) {
            favoriteEpisodesData.value = favoritesData.value
        } else if (favoritesData.value) {
            favoriteEpisodesData.value = [favoritesData.value]
        }
    }
}

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
    } finally {
        isLoading.value = false
    }
}




</script>

<style scoped></style>