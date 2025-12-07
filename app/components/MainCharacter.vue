<template>
    <div class="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4 mx-2">
        <div class="w-full max-w-[340px] h-[500px] flex flex-col border">
            <NuxtImg :src="character.image" alt="" class="w-full h-full object-cover rounded-lg" />
        </div>
        <div class="flex flex-col w-full gap-4 flex-1 h-full ml-4">
            <div class="flex flex-row justify-between ">
                <div id="descricao" class="flex flex-col gap-3" :class="isDarkmode ? 'text-white' : 'text-black'">
                    <h2 class="font-bold text-6xl mb-3">{{ character.name }}</h2>
                    <span class="flex flex-row gap-2 items-center">
                        <Icon name="material-symbols:videocam-outline-sharp" class="text-cyan-400 text-xl" />
                        <h3 class=" text-3xl">Participou de {{ character.episode.length }} episódios</h3>
                    </span>
                    <div id="status" class="flex flex-row gap-4">
                        <span class="flex flex-row gap-2 items-center">
                            <Icon name="material-symbols:ecg-heart-sharp" class="text-cyan-400 text-xl" />
                            <p class="text-2xl">{{ character.status }}</p>
                        </span>
                        <span class="flex flex-row gap-2 items-center">
                            <Icon name="material-symbols:frame-bug-outline-rounded" class="text-cyan-400 text-xl" />
                            <p class="text-2xl">{{ character.species }}</p>
                        </span>
                        <span class="flex flex-row gap-2 items-center">
                            <Icon name="material-symbols:transgender" class="text-cyan-400 text-xl" />
                            <p class="text-2xl">{{ character.gender }}</p>
                        </span>
                    </div>
                </div>
                <div id="cardLocation">
                    <CardLocationsCharacter v-if="location" :currentLocation="location" />
                </div>
            </div>
            <h1 class="text-2xl font-bold" :class="isDarkmode ? 'text-white' : 'text-black'">Episódios que participou
            </h1>
            <div id="cardEpisodes"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4">
                <CardEpisodeCharacters v-for="currentEpisode in episodeData" :key="currentEpisode.id"
                    :currentEpisode="currentEpisode" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Character, Episode } from '~/types';
import { locationService } from '~/services/locationService';
import { episodesService } from '~/services/episodesService';

import { useIsdarkmodeStore } from '~/stores/isDarkmode'

const { isDarkmode } = useIsdarkmodeStore()



const { character } = defineProps<{ character: Character }>()

const locationId = character.location.url ? Number(character.location.url.split('/').pop()) : null

const { data: location } = locationId
    ? await locationService.getOne(locationId)
    : { data: ref(null) }

const episodeData = ref<Episode[]>([])

const episodeListIds = character.episode.map((url) => Number(url.split('/').pop()))

const { data } = await episodesService.getMany(episodeListIds)

if (data.value) {
    episodeData.value = Array.isArray(data.value) ? data.value : [data.value]
}

console.log(episodeData.value)


</script>

<style></style>