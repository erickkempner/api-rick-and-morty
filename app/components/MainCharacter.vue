<template>
    <div class="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4">
        <div class="w-full max-w-[340px] h-[500px] flex flex-col shadow-lg border">
            <NuxtImg :src="character.image" alt="" class="w-full h-full object-cover rounded-lg" />
        </div>
        <div class="flex flex-col w-full gap-4 flex-1 h-full ml-4">
            <div class="flex flex-row justify-between ">
                <div id="descricao" class="text-white flex flex-col gap-3">
                    <h2 class="font-bold text-6xl">{{ character.name }}</h2>
                    <span class="flex flex-row gap-2 items-center">
                        <Icon name="material-symbols:videocam-outline-sharp" class="text-cyan-400 text-xl" />
                        <h3 class=" text-2xl">Participou de {{ character.episode.length }} episódios</h3>
                    </span>
                    <div id="status" class="flex flex-row gap-2">
                        <p>{{ character.status }}</p>
                        <p>{{ character.species }}</p>
                        <p>{{ character.gender }}</p>
                    </div>
                </div>
                <div id="cardLocation"></div>
            </div>
            <div id="cardEpisodes"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Character } from '~/types';


const { character } = defineProps<{ character: Character }>()
</script>

<style></style>