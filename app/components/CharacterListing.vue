<template>
    <div>
        <HeaderMain v-if="!noCategory" class="py-15 px-4" />

        <!-- Loading overlay -->
        <div v-if="isLoading" class="relative min-h-[400px] flex items-center justify-center">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p class="mt-4 text-gray-400">Carregando personagens...</p>
            </div>
        </div>

        <!-- Content -->
        <div v-else>
            <CardCharacter :listOfCharacters="dataCharacter" :seeAll="noCategory" />
        </div>

        <Pagination />
    </div>
</template>

<script setup lang="ts">
import { characterService } from '~/services/characterService';
import type { Character } from '~/types/rickandmorty';
import { usePagesStore } from '~/stores/pages';

const pagesStore = usePagesStore()
const isLoading = ref(false)
const route = useRoute()

// Load initial data
const { data } = await characterService.list({ page: route.query.page ? Number(route.query.page) : pagesStore.currentPage })

const dataCharacter = ref<Character[]>(data.value?.results || [])

pagesStore.setPage(route.query.page ? Number(route.query.page) : pagesStore.currentPage)
pagesStore.setTotalCount(data.value?.info.count || 0)

// Watch for page changes and reload data
watch(() => pagesStore.currentPage, async (newPage) => {
    isLoading.value = true
    try {
        const { data: newData } = await characterService.list({ page: newPage })
        dataCharacter.value = newData.value?.results || []
    } finally {
        isLoading.value = false
    }
})

const { noCategory = true } = defineProps<{ noCategory?: boolean }>()
</script>

<style scoped></style>