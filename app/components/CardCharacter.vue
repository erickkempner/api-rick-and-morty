<template>

    <div class="px-4 py-6">
        

        <CardHeader title="Personagens" toUrl="/"/>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">

            <div v-for="currentCharacter in listOfCharacters.splice(0, 8)" :key="currentCharacter.id"
                class="bg-[#313234] rounded-lg p-5 w-full max-w-[340px] h-[500px] flex flex-col shadow-lg border  transition-transform hover:-translate-y-1"
                :class="isDarkmodeStore.isDarkmode ? 'bg-[#313234] border-gray-700 text-white' : 'bg-[#f9f9f9] border-none text-black'">
                
                <NuxtImg :src="currentCharacter.image" class="rounded-lg w-full h-[220px] object-cover" />

                <div class="flex justify-between mt-4 flex-1 overflow-hidden">

                    <div class=" text-left flex flex-col w-full pr-2">
                        <h2 class="py-2 text-xl font-bold truncate" :title="currentCharacter.name">
                            {{ currentCharacter.name }}
                        </h2>
                        
                        <div class="space-y-2 text-sm ">
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:supervisor-account-outline" class="shrink-0 text-cyan-400" /> 
                                <span class="truncate">{{ currentCharacter.species }}</span>
                            </p>
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:globe-uk-sharp" class="shrink-0 text-cyan-400" /> 
                                <span class="truncate">{{ currentCharacter.origin.name }}</span>
                            </p>
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:ecg-heart-sharp" class="shrink-0 text-cyan-400" /> 
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
                
                <OpenDetails :actionUrl="currentCharacter.url"/>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Character } from "~/types/index";
import { useFavoriteStore } from '~/stores/favoriteCharacter'
import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const isDarkmodeStore = useIsdarkmodeStore()

const favoriteStore = useFavoriteStore()

defineProps<{
    listOfCharacters: Character[]
}>()
</script>