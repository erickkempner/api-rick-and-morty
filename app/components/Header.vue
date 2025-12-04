<template>
    <header
        class="flex flex-col md:flex-row justify-between items-center h-auto md:h-40 py-4 md:py-0 gap-4 md:gap-0 px-4 md:px-0"
        :class="isDarkmodeStore.isDarkmode ? 'text-white' : 'text-black'">
        <div class="flex justify-center md:justify-start w-full md:w-auto">
            <NuxtImg :src="logo" alt="Logo" class="w-48 sm:w-52 md:w-60 cursor-pointer" />
        </div>
        <div class="flex flex-row gap-3 md:gap-4 justify-center w-full md:w-auto">
            <div
                class="py-1 px-3 flex flex-row border-2 border-cyan-400 rounded-4xl hover:scale-105 active:scale-110 cursor-pointer items-center hover:bg-cyan-400 hover:text-black transition-colors">
                <Icon name="material-symbols:bookmark-heart" class="text-3xl md:text-4xl cursor-pointer" />
                <span class="text-sm md:text-base">Meus Favoritos</span>
            </div>
            <div @click="isDarkmodeStore.toggleDarkmode()"
                class="py-1 px-3 flex flex-row border-2 border-cyan-400 rounded-full hover:scale-105 active:scale-110 cursor-pointer items-center hover:bg-cyan-400 hover:text-black transition-colors">
                <Icon :name="isDarkmodeStore.isDarkmode ? 'material-symbols:sunny' : 'material-symbols:mode-night'"
                    class="text-3xl md:text-4xl cursor-pointer" />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import logo from '/images/logo.png';

import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const isDarkmodeStore = useIsdarkmodeStore()

</script>

<style scoped></style>