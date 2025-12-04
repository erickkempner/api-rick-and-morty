<template>
    <div>
        <HeaderMain v-if="!noCategory" class="py-15 px-4" />
        <CardCharacter :listOfCharacters="dataCharacter" :seeAll="noCategory" />
    </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/types/index';

const { data } = await useFetch<ApiResponse>('https://rickandmortyapi.com/api/character/', { key: 'character-list', cache: 'force-cache' })

const dataCharacter = data.value?.results

const { noCategory = true } = defineProps<{ noCategory?: boolean }>()
</script>

<style scoped></style>