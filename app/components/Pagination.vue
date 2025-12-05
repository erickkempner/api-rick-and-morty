<template>
    <div class="flex justify-center items-center py-8">
        <UPagination v-model:page="localPage" :total="totalCount" :page-count="itemsPerPage" color="primary" size="xl"
            :show-edges="false" />
    </div>
</template>

<script setup lang="ts">
const { currentPage, totalCount, itemsPerPage = 20 } = defineProps<{
    currentPage: number
    totalCount: number
    itemsPerPage?: number
}>()

const emit = defineEmits<{
    'update:currentPage': [page: number]
}>()

const localPage = computed({
    get: () => currentPage,
    set: (value: number) => {
        emit('update:currentPage', value)
    }
})
</script>

<style scoped></style>