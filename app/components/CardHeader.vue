<template>
    <div class="flex flex-col sm:flex-row justify-between items-center text-white mb-8 gap-4">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        
        <NuxtLink :to="toUrl"
            class="border-2 text-md border-cyan-400 rounded-3xl flex items-center px-4 py-2 cursor-pointer hover:bg-cyan-400 hover:text-black transition-colors">
            <Icon name="material-symbols:border-all" class="text-xl"/>
            <span class="ml-2 font-semibold">Ver Todos</span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    toUrl: string,
    title: string
}>()
</script>

<style scoped>

</style>