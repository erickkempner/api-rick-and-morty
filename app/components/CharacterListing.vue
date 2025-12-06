<template>
    <div>
        <HeaderMain :noCategory="noCategory" v-if="!showSearchBar" class="py-15 px-4" />

        <!-- Loading overlay -->
        <div v-if="isLoading" class="relative min-h-[400px] flex items-center justify-center">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p class="mt-4 text-gray-400">Carregando personagens...</p>

            </div>
        </div>

        <!-- Content -->
        <div v-else>
            <CardCharacter :text="text" :listOfCharacters="displayedCharacters" :seeAll="noCategory" />
        </div>

        <!-- Hide pagination when searching -->
        <Pagination v-if="pagePath && !searchTerm" :current-page="currentPage" :total-count="totalCount / 2"
            :items-per-page="20" @update:current-page="handlePageUpdate" />
    </div>
</template>

<script setup lang="ts">
import { characterService } from '~/services/characterService';
import type { Character } from '~/types';
import { usePagesStore } from '~/stores/pagesCharacter';
import { useSearchStore } from '~/stores/search';
import { useFavoriteStore } from '~/stores/favoriteCharacter';


const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const pagesStore = usePagesStore()
const searchStore = useSearchStore()

// Use storeToRefs to ensure reactivity
const { totalCount } = storeToRefs(pagesStore)
const { characterResults, isSearching, searchTerm } = storeToRefs(searchStore)

// Initialize from URL query or store
const initialPage = route.query.page ? Number(route.query.page) : pagesStore.currentPage

// Fetch initial data
const { data } = await characterService.list({ page: initialPage })

const dataCharacter = ref<Character[]>(data.value?.results || [])
const currentPage = ref(initialPage)
const favoriteStore = useFavoriteStore()
const { favoriteList } = storeToRefs(favoriteStore)
const favoriteCharactersData = ref<Character[]>([])

// Fetch favorites if on favorites page
if (route.path === '/favorites') {
    if (favoriteList.value.length > 0) {
        const { data: favoritesData } = await characterService.getMany(favoriteList.value)
        // Handle single object return from API when only one ID is requested
        if (Array.isArray(favoritesData.value)) {
            favoriteCharactersData.value = favoritesData.value
        } else if (favoritesData.value) {
            favoriteCharactersData.value = [favoritesData.value]
        }
    }
}

// Update store with initial values
pagesStore.setPage(initialPage)
pagesStore.setTotalCount(data.value?.info.count || 826)

// Computed para decidir quais personagens mostrar
const displayedCharacters = computed(() => {
    // Se há um termo de busca ativo
    if (searchTerm.value) {
        // Se está buscando, mostra vazio (loading)
        if (isSearching.value) {
            return []
        }
        // Se terminou de buscar, mostra os resultados (pode ser array vazio)
        return characterResults.value
    }
    // Caso contrário, mostra os personagens da paginação normal
    if (route.path === '/favorites') {
        return favoriteCharactersData.value
    }
    return dataCharacter.value
})

const pagePath = computed(() => {
    if (route.path === '/' || route.path === '/favorites') {
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
        const { data: newData } = await characterService.list({ page: newPage })
        dataCharacter.value = newData.value?.results || []
        pagesStore.setTotalCount(newData.value?.info.count || 826)
    } finally {
        isLoading.value = false
    }
}


const { noCategory = true, showSearchBar = true, text = 'Personagens' } = defineProps<{ noCategory?: boolean, showSearchBar?: boolean, text?: string }>()
</script>

<style scoped></style>