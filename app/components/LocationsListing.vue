<template>
    <div>
        <HeaderMain v-if="pagePath" :noCategory="true" class="py-15 px-4" />


        <!-- Loading overlay -->
        <div v-if="isLoading" class="relative min-h-[400px] flex items-center justify-center">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p class="mt-4 text-gray-400">Carregando localizações...</p>
            </div>
        </div>

        <!-- Content -->
        <div v-else>
            <CardLocations :listOfLocations="displayedLocations" :seeAll="true" />
        </div>

        <!-- Hide pagination when searching -->
        <Pagination v-if="pagePath && !searchTerm" :current-page="currentPage" :total-count="totalCount / 2"
            :items-per-page="20" @update:current-page="handlePageUpdate" />
    </div>
</template>

<script setup lang="ts">
import { locationService } from '~/services/locationService';
import type { Location } from '~/types';
import { usePagesLocationStore } from '~/stores/pagesLocation';
import { useSearchStore } from '~/stores/search';


const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const pagesStore = usePagesLocationStore()
const searchStore = useSearchStore()

// Use storeToRefs to ensure reactivity
const { totalCount } = storeToRefs(pagesStore)
const { locationResults, isSearching, searchTerm } = storeToRefs(searchStore)

// Initialize from URL query or store
const initialPage = route.query.page ? Number(route.query.page) : pagesStore.currentPage

// Fetch initial data
const { data } = await locationService.list({ page: initialPage })

const dataLocation = ref<Location[]>(data.value?.results || [])
const currentPage = ref(initialPage)

// Update store with initial values
pagesStore.setPage(initialPage)
pagesStore.setTotalCount(data.value?.info.count || 126)

// Computed para decidir quais localizações mostrar
const displayedLocations = computed(() => {
    // Se há um termo de busca ativo
    if (searchTerm.value) {
        // Se está buscando, mostra vazio (loading)
        if (isSearching.value) {
            return []
        }
        // Se terminou de buscar, mostra os resultados (pode ser array vazio)
        return locationResults.value
    }
    // Caso contrário, mostra as localizações da paginação normal
    return dataLocation.value
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
        const { data: newData } = await locationService.list({ page: newPage })
        dataLocation.value = newData.value?.results || []
        pagesStore.setTotalCount(newData.value?.info.count || 126)
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped></style>