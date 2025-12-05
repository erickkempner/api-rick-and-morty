<template>
    <div>
        <div v-if="isLoading" class="relative min-h-[400px] flex items-center justify-center">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
                <p class="mt-4 text-gray-400">Carregando episódios...</p>
            </div>
        </div>
        <div v-else>
            <CardEpisode :listOfEpisodes="dataEpisode" :seeAll="!noCategory" />
        </div>

        <Pagination v-if="pagePath" :current-page="currentPage" :total="totalCount" :items-per-page="20"
            @update:current-page="handlePageUpdate" />
    </div>
</template>

<script setup lang="ts">
import { episodesService } from '~/services/episodesService';
import type { Episode } from '~/types/index';
import { usePagesEpisodeStore } from '~/stores/pagesEpisode';

const pagesStore = usePagesEpisodeStore()
const isLoading = ref(false)
const route = useRoute()
const router = useRouter()

// Use storeToRefs to ensure reactivity
const { totalCount } = storeToRefs(pagesStore)

// Initialize from URL query or store
const initialPage = route.query.page ? Number(route.query.page) : pagesStore.currentPage

// Fetch initial data
const { data } = await episodesService.list({ page: initialPage })

const dataEpisode = ref<Episode[]>(data.value?.results || [])
const currentPage = ref(initialPage)

// Update store with initial values
pagesStore.setPage(initialPage)
pagesStore.setTotalCount(data.value?.info.count || 51)

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

const { noCategory = true } = defineProps<{ noCategory?: boolean }>()
</script>

<style scoped></style>