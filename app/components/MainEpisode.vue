<template>
    <div class="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4 mx-2">
        <div class="w-full max-w-[300px] h-[300px] flex flex-col border p-4 rounded-lg"
            :class="isDarkmode ? 'bg-[#313234] border-gray-700 text-white' : 'bg-[#f9f9f9] border-none text-black'">
            <div class="flex flex-col gap-4 h-full justify-center">
                <h2 class="font-bold text-4xl text-center">{{ episode.name }}</h2>
                <div class="flex flex-col gap-2">
                    <p class="flex items-center gap-2 text-xl">
                        <Icon name="material-symbols:supervisor-account-outline" class="text-cyan-400" />
                        <span>{{ episode.episode }}</span>
                    </p>
                    <p class="flex items-center gap-2 text-xl">
                        <Icon name="material-symbols:calendar-month" class="text-cyan-400" />
                        <span>{{ episode.air_date }}</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="flex flex-col w-full gap-4 flex-1 h-full ml-4">
            <h3 class="text-3xl font-bold mb-4" :class="isDarkmode ? 'text-white' : 'text-black'">Personagens
                Participantes</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <CardCharacterItem v-for="character in charactersData" :key="character.id"
                    :currentCharacter="character" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Episode, Character } from '~/types';
import { characterService } from '~/services/characterService';
import { useIsdarkmodeStore } from '~/stores/isDarkmode';

const isDarkmodeStore = useIsdarkmodeStore()
const { isDarkmode } = storeToRefs(isDarkmodeStore)

const { episode } = defineProps<{ episode: Episode }>()

const charactersData = ref<Character[]>([])

const characterListIds = episode.characters.map((url) => Number(url.split('/').pop()))

const { data } = await characterService.getMany(characterListIds)

if (data.value) {
    charactersData.value = Array.isArray(data.value) ? data.value : [data.value]
}

</script>

<style></style>
