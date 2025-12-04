<template>
    <div id="hero" class="items-center justify-between flex flex-col-reverse md:flex-row gap-6 md:gap-10 px-4 md:px-0"
        :class="isDarkmodeStore.isDarkmode ? 'text-white' : 'text-black border-b-2 border-cyan-400'">
        <div class="flex flex-col text-center md:text-left px-2 md:px-0">
            <h1 class="mb-4 md:mb-5 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl max-w-full md:max-w-[500px]">
                Saiba tudo em um só <span class="text-cyan-400">lugar</span>.</h1>
            <p class="py-2 md:py-4 mb-6 md:mb-15 text-lg sm:text-xl md:text-2xl">Personagens, localizações, episódios e
                muito mais.</p>
        </div>
        <div class="flex flex-1 justify-center items-center w-full md:w-auto">
            <NuxtPicture :src="isDarkmodeStore.isDarkmode ? rickDark : rickWhite"
                :class="isDarkmodeStore.isDarkmode ? 'w-full max-w-[350px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[730px] h-auto object-contain' : 'mb-1 w-full max-w-[350px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[730px] h-auto object-containw-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[430px] md:h-[430px]'"
                alt="Rick Sanchez Image" />
        </div>

    </div>
</template>

<script setup lang="ts">
import rickDark from '/images/rickdark.webp'
import rickWhite from '/images/rickwhite.webp'

import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const isDarkmodeStore = useIsdarkmodeStore()
</script>

<style scoped></style>