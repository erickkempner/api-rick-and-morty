<template>
    <div class="bg-[#313234] rounded-lg p-5 w-full max-w-[340px] h-[500px] flex flex-col shadow-lg border transition-transform hover:-translate-y-1"
        :class="isDarkmode ? 'bg-[#313234] border-gray-700 text-white' : 'bg-[#f9f9f9] border-none text-black'">

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
                    <Icon
                        :name="isFavorite(currentCharacter.id) ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
                        class="cursor-pointer hover:scale-110 transition-transform active:scale-95"
                        @click="toggleFavorite(currentCharacter.id)" />
                </div>
            </ClientOnly>

        </div>

        <OpenDetails :id="currentCharacter.id" :category="'characters'" />

    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { Character } from "~/types/index";
import { useFavoriteStore } from '~/stores/favoriteCharacter'
import { useIsdarkmodeStore } from '~/stores/isDarkmode';

const isDarkmodeStore = useIsdarkmodeStore()
const { isDarkmode } = storeToRefs(isDarkmodeStore)

const favoriteStore = useFavoriteStore();
const { toggleFavorite } = favoriteStore
const { isFavorite } = storeToRefs(favoriteStore);

const { currentCharacter } = defineProps<{
    currentCharacter: Character
}>()
</script>
