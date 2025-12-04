<template>
    <div id="hero" class=" items-center justify-between flex flex-row gap-10" :class="isDarkmodeStore.isDarkmode ? 'text-white' : 'text-black border-b-2 border-cyan-400'">
        <div class="flex flex-col">
            <h1 class="mb-5 font-bold text-6xl max-w-[500px]">Saiba tudo em um só <span class="text-cyan-400">lugar</span>.</h1>
            <p class="py-4 mb-15 text-2xl">Personagens, localizações, episódios e muito mais.</p>
        </div>
        <div>
            <NuxtPicture :src="isDarkmodeStore.isDarkmode ? rickDark : rickWhite" :class="isDarkmodeStore.isDarkmode ? 'w-[730px] h-[440px]' : 'w-[430px] h-[430px]'" alt="Rick Sanchez Image"/>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import rickDark from '/images/rickdark.webp'
import rickWhite from '/images/rickwhite.webp'

import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const isDarkmodeStore = useIsdarkmodeStore()
</script>

<style scoped>

</style>