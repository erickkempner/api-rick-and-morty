<template>

    <div class="w-full mx-auto max-w-[1420px] bg-[#313234] min-h-screen px-4 py-6">
        

        <div class="flex flex-col sm:flex-row justify-between items-center text-white mb-8 gap-4">
            <h1 class="text-3xl font-bold">Personagens</h1>
            
            <NuxtLink to="/favorites"
                class="border-2 text-md border-cyan-400 rounded-3xl flex items-center px-4 py-2 cursor-pointer hover:bg-cyan-400 hover:text-black transition-colors">
                <Icon name="material-symbols:border-all" class="text-xl"/>
                <span class="ml-2 font-semibold">Ver Todos</span>
            </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">

            <div v-for="currentCharacter in listOfCharacters" :key="currentCharacter.id"
                class="bg-[#313234] rounded-lg p-5 w-full max-w-[340px] h-[500px] flex flex-col shadow-lg border border-gray-700 transition-transform hover:-translate-y-1">
                
                <NuxtImg :src="currentCharacter.image" class="rounded-lg w-full h-[220px] object-cover" />

                <div class="flex justify-between mt-4 flex-1 overflow-hidden">

                    <div class="text-white text-left flex flex-col w-full pr-2">
                        <h2 class="py-2 text-xl font-bold truncate" :title="currentCharacter.name">
                            {{ currentCharacter.name }}
                        </h2>
                        
                        <div class="space-y-2 text-sm text-gray-300">
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:supervisor-account-outline" class="flex-shrink-0 text-cyan-400" /> 
                                <span class="truncate">{{ currentCharacter.species }}</span>
                            </p>
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:globe-uk-sharp" class="flex-shrink-0 text-cyan-400" /> 
                                <span class="truncate">{{ currentCharacter.origin.name }}</span>
                            </p>
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:ecg-heart-sharp" class="flex-shrink-0 text-cyan-400" /> 
                                <span class="truncate">{{ currentCharacter.status }}</span>
                            </p>
                        </div>
                    </div>

                    <ClientOnly>
                        <div class="text-4xl text-cyan-400 flex flex-col justify-start pt-1">
                            <icon
                                :name="favoriteStore.isFavorite(currentCharacter.id) ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
                                class="cursor-pointer hover:scale-110 transition-transform active:scale-95" 
                                @click="favoriteStore.toggleFavorite(currentCharacter.id)" />
                        </div>
                    </ClientOnly>

                </div>
                
                <OpenDetails />

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Character } from "~/types/index";
import { useFavoriteStore } from '~/stores/favorite.client'

const favoriteStore = useFavoriteStore()

defineProps<{
    listOfCharacters: Character[]
}>()
</script>