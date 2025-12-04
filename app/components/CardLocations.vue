<template>
    <div class="px-4 py-6">
        <div class="flex flex-col sm:flex-row justify-between items-center text-white mb-8 gap-4">
        </div>
        <CardHeader title="Localizações" toUrl="/" class="mb-10"/>

        <!-- Este é o container de GRID. As classes aqui estão corretas. -->
        <div class="mt-15 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-x-6 gap-y-12 justify-items-center">

            <!-- CARD CORRIGIDO: Removi as classes de grid daqui. -->
            <div v-for="currentLocation in listOfLocations.splice(0, 6)" :key="currentLocation.id"
                class="relative bg-[#313234] rounded-lg p-5 pt-12 w-full max-w-[220px] h-[250px] flex flex-col shadow-lg border border-gray-700 transition-transform hover:-translate-y-1">

                <!-- Container do Ícone (já estava correto) -->
                <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full">
                    <Icon class="text-6xl text-cyan-400" name="material-symbols:planet-outline" />
                </div>

                <!-- O resto do seu conteúdo permanece o mesmo -->
                <div class="flex w-full   flex-1 overflow-hidden">
                    <div class="text-white text-left flex flex-col pr-2 ">
                        <h2 class="py-2 text-xl font-bold " :title="currentLocation.name">
                            {{ currentLocation.name }}
                        </h2>
                        <div class="space-y-2 text-sm text-gray-300">
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:supervisor-account-outline"
                                    class="shrink-0 text-cyan-400" />
                                <span class="">{{ currentLocation.type }}</span>
                            </p>
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:supervisor-account-outline"
                                    class="shrink-0 text-cyan-400" />
                                <span class="">{{ currentLocation.dimension }}</span>
                            </p>
                        </div>
                    </div>
                    
                </div>
                <ClientOnly>
                        <div class="text-5xl text-cyan-400 flex flex-col justify-center items-center pt-2">
                            <icon
                                :name="favoriteLocationStore.isFavorite(currentLocation.id) ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
                                class="cursor-pointer hover:scale-110 transition-transform active:scale-95"
                                @click="favoriteLocationStore.toggleFavorite(currentLocation.id)" />
                        </div>
                    </ClientOnly>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Location } from '~/types/index';

import { useFavoriteLocationStore } from '~/stores/favoriteLocation'

const favoriteLocationStore = useFavoriteLocationStore()

const {listOfLocations} = defineProps<{
    listOfLocations: Location[]
}>()
</script>

<style scoped></style>