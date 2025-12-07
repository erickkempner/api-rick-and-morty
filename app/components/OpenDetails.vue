<template>
    <NuxtLink :to="`/${category}/${id}`"
        class="mt-auto block w-full border-2 text-center border-cyan-400 rounded-lg text-sm font-bold p-2 cursor-pointer hover:bg-cyan-400  transition-colors uppercase tracking-wide"
        :class="isDarkmodeStore.isDarkmode ? 'text-white hover:text-black' : 'text-black hover:text-white'">
        Saiba Mais
    </NuxtLink>
</template>

<script setup lang="ts">
import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const isDarkmodeStore = useIsdarkmodeStore()

const { category = 'characters', id = 1 } = defineProps<{
    id?: number,
    category?: string
}>()
</script>

<style scoped></style>