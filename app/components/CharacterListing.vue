<template>
    <div>
        <HeaderMain class="py-15 px-4" />
        <CardCharacter :listOfCharacters="dataCharacter" />
    </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/types/index';

const { data } = await useFetch<ApiResponse>('https://rickandmortyapi.com/api/character/', { key: 'character-list', cache: 'force-cache' })

const dataCharacter = data.value?.results
</script>

<style scoped></style>