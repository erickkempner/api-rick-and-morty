<template>
    <div class="relative rounded-lg p-5 pt-12 w-full max-w-[220px] h-[250px] flex flex-col shadow-lg border border-gray-700 transition-transform hover:-translate-y-1"
        :class="isDarkmode ? 'bg-[#313234] border-gray-700 text-white' : 'bg-[#f9f9f9] border-none text-black'">

        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full">
            <Icon class="text-6xl text-cyan-400" :name="locationIcon" />
        </div>

        <div class="flex w-full   flex-1 overflow-hidden">
            <div class=" text-left flex flex-col pr-2 ">
                <h2 class="py-2 text-xl font-bold " :title="currentLocation.name">
                    {{ currentLocation.name }}
                </h2>
                <div class="space-y-2 text-sm ">
                    <p class="flex items-center gap-2 truncate">
                        <Icon name="material-symbols:location-on-outline" class="shrink-0 text-cyan-400" />
                        <span class="">{{ currentLocation.type }}</span>
                    </p>
                    <p class="flex items-center gap-2 truncate">
                        <Icon name="material-symbols:public" class="shrink-0 text-cyan-400" />
                        <span class="">{{ currentLocation.dimension }}</span>
                    </p>
                </div>
            </div>

        </div>
        <ClientOnly>
            <div class="text-5xl text-cyan-400 flex flex-col justify-center items-center pt-2">
                <Icon
                    :name="isFavorite(currentLocation.id) ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
                    class="cursor-pointer hover:scale-110 transition-transform active:scale-95"
                    @click="toggleFavorite(currentLocation.id)" />
            </div>
        </ClientOnly>

    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { Location } from '~/types';
import { useIsdarkmodeStore } from '~/stores/isDarkmode';

const isDarkmodeStore = useIsdarkmodeStore()
const { isDarkmode } = storeToRefs(isDarkmodeStore)

const favoriteLocationStore = useFavoriteLocationStore()
const { toggleFavorite } = favoriteLocationStore
const { isFavorite } = storeToRefs(favoriteLocationStore);

const props = defineProps<{
    currentLocation: Location
}>()

const locationIcon = computed(() => {
    const type = props.currentLocation.type.toLowerCase()
    if (type.includes('planet')) return 'material-symbols:planet-outline'
    if (type.includes('cluster')) return 'material-symbols:bubble-chart-outline'
    if (type.includes('space station')) return 'material-symbols:satellite-alt'
    if (type.includes('microverse')) return 'material-symbols:science'
    if (type.includes('tv')) return 'material-symbols:tv'
    if (type.includes('resort')) return 'material-symbols:beach-access'
    if (type.includes('fantasy town')) return 'material-symbols:castle'
    if (type.includes('dream')) return 'material-symbols:cloud'
    if (type.includes('dimension')) return 'material-symbols:public'
    return 'material-symbols:location-on-outline'
})
</script>

<style scoped></style>