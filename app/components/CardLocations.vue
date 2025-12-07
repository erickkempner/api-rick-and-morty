<template>
    <div class="px-2 py-4 sm:px-4 sm:py-6" v-show="getCategory == 'locations' || getCategory == 'all'">
        <div class="flex flex-col sm:flex-row justify-between items-center text-white mb-8 gap-4" />
        <CardHeader title="Localizações" toUrl="/locations" class="mb-6 sm:mb-10" :seeAll="true" />


        <div
            class="mt-15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4 sm:gap-x-6 sm:gap-y-12 justify-items-center">

            <CardLocationsCharacter v-for="currentLocation in listOfLocations.slice(0, maxPosts())"
                :key="currentLocation.id" :current-location="currentLocation" />

        </div>
    </div>
</template>

<script setup lang="ts">
import type { Location } from '~/types';

const categoryStore = useCategorySearchStore()
const { getCategory } = storeToRefs(categoryStore)


const route = useRoute()
const maxPosts = (): number => {
    if (route.path === '/') {
        return 12
    }
    return 20
}
const { listOfLocations } = defineProps<{
    listOfLocations: Location[],
}>()
</script>

<style scoped></style>