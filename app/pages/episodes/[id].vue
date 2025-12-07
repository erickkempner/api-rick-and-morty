<template>
    <div>
        <h1 class="sr-only">Detalhes do Episódio</h1>
        <MainEpisode v-if="episode" :episode="episode" />
        <hr class="border border-cyan-400 my-8">
        <EpisodeListing title="Mais Episódios" :showSearchBar="false" :noCategory="true" />
    </div>
</template>

<script setup lang="ts">
import { episodesService } from '~/services/episodesService';

const route = useRoute()

const { data: episode } = await episodesService.getOne(Number(route.params.id))

</script>

<style scoped></style>