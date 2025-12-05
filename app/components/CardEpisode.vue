<template>
    <div class="px-2 py-4 sm:px-4 sm:py-6" v-show="getCategory == 'episodes' || getCategory == 'all'">


        <div class="flex flex-col sm:flex-row justify-between items-center text-white mb-8 gap-4">


        </div>
        <CardHeader title="Episódios" toUrl="/episodes/" :seeAll="!seeAll" />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">

            <div v-for="currentEpisode in listOfEpisodes?.slice(0, maxPosts()) || []" :key="currentEpisode.id"
                class=" rounded-lg p-5 w-full max-w-[340px] h-[230px] flex flex-col shadow-lg border border-gray-700 transition-transform hover:-translate-y-1"
                :class="isDarkmode ? 'bg-[#313234] border-gray-700 text-white' : 'bg-[#f9f9f9] border-none text-black'">

                <!-- <NuxtImg :src="currentCharacter.image" class="rounded-lg w-full h-[220px] object-cover" /> -->

                <div class="flex w-full justify-between flex-1 overflow-hidden">

                    <div class=" text-left flex flex-col pr-2">
                        <h2 class="py-2 text-xl font-bold " :title="currentEpisode.name">
                            {{ currentEpisode.name }}
                        </h2>

                        <div class="space-y-2 text-sm ">
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:supervisor-account-outline"
                                    class="shrink-0 text-cyan-400" />
                                <span class="truncate">{{ currentEpisode.episode }}</span>
                            </p>
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:supervisor-account-outline"
                                    class="shrink-0 text-cyan-400" />
                                <span class="truncate">{{ currentEpisode.air_date }}</span>
                            </p>
                            <p class="flex items-center gap-2 truncate">
                                <Icon name="material-symbols:globe-uk-sharp" class="shrink-0 text-cyan-400" />
                                <span class="truncate">{{ currentEpisode.created }}</span>
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



                <OpenDetails :actionUrl="currentEpisode.url" class="mt-4" />

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { Episode } from '~/types/index';
import { useFavoriteEpisodeStore } from '~/stores/favoriteEpisode'
import { useIsdarkmodeStore } from '~/stores/isDarkmode';

const isDarkmodeStore = useIsdarkmodeStore()
const { isDarkmode } = storeToRefs(isDarkmodeStore)

const favoriteEpisodeStore = useFavoriteEpisodeStore()
const { toggleFavorite } = favoriteEpisodeStore
const { isFavorite } = storeToRefs(favoriteEpisodeStore);

const categoryStore = useCategorySearchStore()
const { getCategory } = storeToRefs(categoryStore)

const maxPosts = () => {
    return seeAll ? listOfEpisodes.length : 8
}
const { listOfEpisodes, seeAll } = defineProps<{
    listOfEpisodes: Episode[],
    seeAll: boolean
}>()
</script>

<style scoped></style>