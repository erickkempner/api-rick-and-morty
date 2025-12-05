<template>
    <div class="flex justify-center items-center py-8">
        <UPagination v-model:page="currentPage" :total="totalCount" :items-per-page="20" color="primary" size="xl"
            :show-edges="false" />
    </div>
</template>

<script setup lang="ts">
import { usePagesStore } from '~/stores/pages';
const router = useRouter()
const pagesStore = usePagesStore()
const currentPage = ref(pagesStore.currentPage)
const totalCount = computed(() => pagesStore.totalCount)


watch(currentPage, (newPage) => {
    if (newPage !== pagesStore.currentPage) {
        pagesStore.setPage(newPage)
        router.push({ query: { page: newPage.toString() } })
    }
})


watch(() => pagesStore.currentPage, (newPage) => {
    if (newPage !== currentPage.value) {
        currentPage.value = newPage
    }
})
</script>

<style scoped></style>