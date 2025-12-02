<template>
    <div>
        <Card :listOfCharacters="data.results"/>
    </div>
</template>

<script setup lang="ts">
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const {data, status, error, refresh, clear} = await useFetch('https://rickandmortyapi.com/api/character/')

</script>

<style scoped>

</style>