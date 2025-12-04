<template>
    <div class="flex flex-col sm:flex-row justify-between items-center  mb-8 gap-4" :class="isDarkmodeStore.isDarkmode ? 'text-white' : ''">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        
        <NuxtLink :to="toUrl" :class="isDarkmodeStore.isDarkmode ? ' hover:text-black text-white' : 'hover:text-white text-black'"
            class="border-2 text-md border-cyan-400 rounded-3xl flex items-center px-4 py-2 cursor-pointer hover:bg-cyan-400 transition-colors">
            <Icon name="material-symbols:border-all" class="text-xl"/>
            <span class="ml-2 font-semibold">Ver Todos</span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const isDarkmodeStore = useIsdarkmodeStore()

defineProps<{
    toUrl: string,
    title: string
}>()
</script>

<style scoped>

</style>