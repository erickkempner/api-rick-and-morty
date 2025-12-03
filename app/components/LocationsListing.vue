<template>
    <div>
        <CardLocations :listOfLocations="dataLocation"/>
    </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/types/index';

const {data} = await useFetch<ApiResponse>('https://rickandmortyapi.com/api/location/')

const dataLocation = data.value?.results
</script>

<style scoped>

</style>