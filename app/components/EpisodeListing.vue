<template>
    <div>
        <CardEpisode :listOfEpisodes="dataEpisode" />
    </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/types/index';
import CardEpisode from './CardEpisode.vue';

const { data } = await useFetch<ApiResponse>('https://rickandmortyapi.com/api/episode/', { cache: 'force-cache', key: 'episode-list' })

const dataEpisode = data.value?.results
</script>

<style scoped></style>