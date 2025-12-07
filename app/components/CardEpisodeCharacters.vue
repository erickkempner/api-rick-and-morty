<template>
    <div class=" rounded-lg p-5 w-full max-w-[340px] h-[230px] flex flex-col shadow-lg border border-gray-700 transition-transform hover:-translate-y-1"
        :class="isDarkmode ? 'bg-[#313234] border-gray-700 text-white' : 'bg-[#f9f9f9] border-none text-black'">

        <!-- <NuxtImg :src="currentCharacter.image" class="rounded-lg w-full h-[220px] object-cover" /> -->

        <div class="flex w-full justify-between flex-1 overflow-hidden">

            <div class=" text-left flex flex-col pr-2">
                <h2 class="py-2 text-xl font-bold " :title="currentEpisode.name">
                    {{ currentEpisode.name }}
                </h2>

                <div class="space-y-2 text-sm ">
                    <p class="flex items-center gap-2 truncate">
                        <Icon name="material-symbols:movie-outline" class="shrink-0 text-cyan-400" />
                        <span class="truncate">{{ currentEpisode.episode }}</span>
                    </p>
                    <p class="flex items-center gap-2 truncate">
                        <Icon name="material-symbols:calendar-month" class="shrink-0 text-cyan-400" />
                        <span class="truncate">{{ currentEpisode.air_date }}</span>
                    </p>
                </div>
            </div>
            <ClientOnly>
                <div class="text-4xl text-cyan-400 flex flex-col justify-start pt-2">
                    <Icon
                        :name="isFavorite(currentEpisode.id) ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
                        class="cursor-pointer hover:scale-110 transition-transform active:scale-95"
                        @click="toggleFavorite(currentEpisode.id)" />
                </div>
            </ClientOnly>
        </div>

        <OpenDetails :id="currentEpisode.id" :category="'episodes'" class="mt-4" />

    </div>
</template>

<script lang="ts" setup>
import type { Episode } from '~/types';

const isDarkmodeStore = useIsdarkmodeStore()
const { isDarkmode } = storeToRefs(isDarkmodeStore)

const favoriteEpisodeStore = useFavoriteEpisodeStore()
const { toggleFavorite } = favoriteEpisodeStore
const { isFavorite } = storeToRefs(favoriteEpisodeStore);

const { currentEpisode } = defineProps<{ currentEpisode: Episode }>()



</script>

<style></style>