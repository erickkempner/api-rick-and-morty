<template>
    <div class="px-2 py-4 sm:px-4 sm:py-6" v-show="getCategory == 'episodes' || getCategory == 'all'">


        <div class="flex flex-col sm:flex-row justify-between items-center text-white mb-8 gap-4">


        </div>
        <CardHeader :title="title" toUrl="/episodes/" :seeAll="true" />

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <CardEpisodeCharacters v-for="currentEpisode in listOfEpisodes?.slice(0, maxPosts()) || []"
                :key="currentEpisode.id" :currentEpisode="currentEpisode" class="" />
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

const route = useRoute()
const maxPosts = (): number => {
    if (route.path === '/') {
        return 8
    }
    return 20
}
const { listOfEpisodes, seeAll, title } = defineProps<{
    listOfEpisodes: Episode[],
    seeAll: boolean,
    title: string
}>()
</script>

<style scoped></style>