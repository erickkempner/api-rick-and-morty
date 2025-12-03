<template>
    <NuxtLink :to="actionUrl"
        class="mt-auto block w-full border-2 text-center text-white border-cyan-400 rounded-lg text-sm font-bold p-2 cursor-pointer hover:bg-cyan-400 hover:text-black transition-colors uppercase tracking-wide">
        Saiba Mais
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    actionUrl: string
}>()
</script>

<style scoped>

</style>