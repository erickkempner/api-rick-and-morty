<template>

    <div class="px-2 py-4 sm:px-4 sm:py-6" v-show="getCategory == 'characters' || getCategory == 'all'">


        <CardHeader :title="props.text" toUrl="/characters" :seeAll="true" />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">

            <CardCharacterItem v-for="currentCharacter in props.listOfCharacters.slice(0, maxPosts())"
                :key="currentCharacter.id" :currentCharacter="currentCharacter" />
        </div>
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

const categoryStore = useCategorySearchStore()
const { getCategory } = storeToRefs(categoryStore)

const route = useRoute()
const maxPosts = (): number => {
    if (route.path == '/') {
        return 8
    }
    return 20
}

const props = withDefaults(defineProps<{
    listOfCharacters: Character[],
    seeAll?: boolean,
    text?: string
}>(), {
    text: 'Personagem'
})
</script>