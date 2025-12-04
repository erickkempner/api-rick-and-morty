
<template>
    <header class="flex flex-row justify-between items-center h-40 " :class="isDarkmodeStore.isDarkmode ? 'text-white' : 'text-black'">
        <div>
            <NuxtImg :src="logo" alt="Logo" class="w-60 cursor-pointer " />
        </div>
        <div class="flex flex-row-reverse gap-4">
            <div class="py-1 px-3 flex flex-row  border-2 border-cyan-400 rounded-4xl hover:scale-105 active:scale-110 cursor-pointer items-center hover:bg-cyan-400 hover:text-black transition-colors">
                <Icon name="material-symbols:bookmark-heart" class="text-4xl cursor-pointer" />
                <span>Meus Favoritos</span>
            </div>
            <div @click="isDarkmodeStore.toggleDarkmode()" class="py-1 px-3 flex flex-row  border-2 border-cyan-400 rounded-full hover:scale-105 active:scale-110 cursor-pointer items-center hover:bg-cyan-400 hover:text-black transition-colors">
                <Icon :name="isDarkmodeStore.isDarkmode ? 'material-symbols:sunny' : 'material-symbols:mode-night'" class="text-4xl cursor-pointer" />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import logo from '/images/logo.png';

import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const isDarkmodeStore = useIsdarkmodeStore()
</script>

<style scoped>


</style>