<template>
    <div>

        <CharacterListing />
        <EpisodeListing />
        <LocationsListing />
    </div>
</template>

<script setup lang="ts">
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import EpisodeListing from '~/components/EpisodeListing.vue'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

</script>

<style scoped>

</style>