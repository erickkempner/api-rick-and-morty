<template>
    <div>
        <MainCharacter :character="character" />
        <hr class="border border-cyan-400">
        <CharacterListing text="Mais Personagens" noSearch="true" />
    </div>
</template>

<script setup lang="ts">
import { characterService } from '~/services/characterService';

const route = useRoute()

const { data: character } = await characterService.getOne(Number(route.params.id))

</script>

<style scoped></style>