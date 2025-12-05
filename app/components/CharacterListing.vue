<template>
    <div>
        <HeaderMain :noCategory="noCategory" class="py-15 px-4" />

        <!-- Loading overlay -->
        <div v-if="isLoading" class="relative min-h-[400px] flex items-center justify-center">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p class="mt-4 text-gray-400">Carregando personagens...</p>

            </div>
        </div>

        <!-- Content -->
        <div v-else>
            <CardCharacter :listOfCharacters="displayedCharacters" :seeAll="!noCategory" />
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

const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const pagesStore = usePagesStore()
const searchStore = useSearchStore()

// Use storeToRefs to ensure reactivity
const { totalCount } = storeToRefs(pagesStore)
const { searchResults, isSearching, searchTerm } = storeToRefs(searchStore)

// Initialize from URL query or store
const initialPage = route.query.page ? Number(route.query.page) : pagesStore.currentPage

// Fetch initial data
const { data } = await characterService.list({ page: initialPage })

const dataCharacter = ref<Character[]>(data.value?.results || [])
const currentPage = ref(initialPage)

// Update store with initial values
pagesStore.setPage(initialPage)
pagesStore.setTotalCount(data.value?.info.count || 826)

// Computed para decidir quais personagens mostrar
const displayedCharacters = computed(() => {
    // Se houver uma busca ativa, mostra os resultados da busca
    if (searchTerm.value && searchResults.value.length > 0) {
        return searchResults.value
    }
    // Se está buscando mas não tem resultados, mostra array vazio
    if (searchTerm.value && isSearching.value) {
        return []
    }
    // Caso contrário, mostra os personagens da paginação normal
    return dataCharacter.value
})

const pagePath = computed(() => {
    if (route.path == '/') {
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
    } catch (error) {
        console.error('CharacterListing - Error updating page:', error)
    } finally {
        isLoading.value = false
    }
}

const { noCategory = true } = defineProps<{ noCategory?: boolean }>()
</script>

<style scoped></style>