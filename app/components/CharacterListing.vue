<template>
    <div>
        <CardCharacter :listOfCharacters="dataCharacter"/>
        
    </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/types/index';

const {data} = await useFetch<ApiResponse>('https://rickandmortyapi.com/api/character/')

const dataCharacter = data.value?.results
</script>

<style scoped>

</style>