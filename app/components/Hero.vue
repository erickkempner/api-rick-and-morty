<template>
    <div id="hero" class="items-center justify-between flex flex-col-reverse md:flex-row gap-6 md:gap-10 px-4 md:px-0"
        :class="isDarkmodeStore.isDarkmode ? 'text-white ' : 'text-black border-b-2 border-cyan-400'">
        <div class="flex flex-col text-center md:text-left px-2 md:px-0">
            <h1 class="mb-4 md:mb-5 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl max-w-full md:max-w-[500px]">
                {{ text }} <span class="text-cyan-400">{{ textSuper }}</span>.</h1>
            <p class="py-2 md:py-4 mb-6 md:mb-15 text-lg sm:text-xl md:text-2xl">{{ paragraph }}</p>
        </div>
        <div class="flex flex-1 justify-center items-center w-full md:w-auto">
            <NuxtPicture :src="imageUrl"
                :class="isDarkmodeStore.isDarkmode ? 'bg-black w-full max-w-[350px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[730px] h-auto object-contain' : 'bg-white mb-1 w-full max-w-[350px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[730px] h-auto object-containw-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[430px] md:h-[430px]'"
                alt="Rick Sanchez Image" />
        </div>

    </div>
</template>

<script setup lang="ts">
import rickDark from '/images/rickdark.webp'
import rickWhite from '/images/rickwhite.webp'

import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const isDarkmodeStore = useIsdarkmodeStore()

const {
    text = "Saiba tudo em um só",
    textSuper = "lugar",
    paragraph = "Personagens, localizações, episódios e muito mais.",
} = defineProps<{
    isFavorite?: boolean
    text?: string
    textSuper?: string
    paragraph?: string
}>()

// Computed para determinar qual imagem usar
const imageUrl = computed(() => {
    return isDarkmodeStore.isDarkmode ? rickDark : rickWhite
})
</script>

<style scoped></style>