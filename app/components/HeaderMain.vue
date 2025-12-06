<template>
    <div class="justify-between flex flex-col md:flex-row gap-4">
        <div class="flex items-center gap-3 rounded-3xl px-4 py-3 w-full md:min-w-[400px] md:w-auto"
            :class="isDarkmode ? 'bg-[#1a1a1a] text-white' : 'bg-[#f9f9f9] text-black border-2 border-black'">
            <input type="text" v-model="search" class="flex-1 outline-none placeholder:opacity-50 bg-transparent"
                :class="isDarkmode ? 'text-white placeholder:text-gray-400' : 'text-black placeholder:text-gray-500'"
                placeholder="Personagens, episódios ou localizações" @keyup.enter.prevent="searchFunc()">

            <Icon name="material-symbols:search-rounded" class="w-6 h-6 shrink-0 cursor-pointer"
                :class="isDarkmode ? 'text-white' : 'text-black'" @click.prevent="searchFunc()" />
        </div>
        <div v-if="categoryShow()" class="flex flex-row gap-2 md:gap-3 items-center justify-center flex-wrap">
            <ButtonCategory title="Personagens" category="characters"
                @click="getCategory == 'characters' ? categoryStore.setCategory('all') : categoryStore.setCategory('characters')"
                icon="material-symbols:person-3-outline" />
            <ButtonCategory title="Episódios" category="episodes"
                @click="getCategory == 'episodes' ? categoryStore.setCategory('all') : categoryStore.setCategory('episodes')"
                icon="material-symbols:movie-outline" />
            <ButtonCategory title="Localizações" category="locations"
                @click="getCategory == 'locations' ? categoryStore.setCategory('all') : categoryStore.setCategory('locations')"
                icon="material-symbols:location-on-outline" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { characterService } from '~/services/characterService'
import { episodesService } from '~/services/episodesService'
import { locationService } from '~/services/locationService'
import { useSearchStore } from '~/stores/search';

const route = useRoute()

const isDarkmodeStore = useIsdarkmodeStore()
const { isDarkmode } = storeToRefs(isDarkmodeStore)

const categoryStore = useCategorySearchStore()
const { getCategory }: { getCategory: Ref<string> } = storeToRefs(categoryStore)

const categoryShow = (): boolean => {
    if (route.path == '/') {
        return true
    }
    return false
}

const search = ref('')
const searchStore = useSearchStore()

const searchFunc = async () => {
    // Se a busca for vazia ou muito curta, limpa os resultados
    if (search.value.length < 2) {
        searchStore.clearSearch()
        return
    }

    try {
        searchStore.setIsSearching(true)
        const searchValue = search.value
        searchStore.setSearchTerm(searchValue)


        // Limpa resultados anteriores antes de buscar
        searchStore.setCharacterResults([])
        searchStore.setEpisodeResults([])
        searchStore.setLocationResults([])

        // Busca em paralelo nos 3 endpoints
        const [charactersData, episodesData, locationsData] = await Promise.all([
            characterService.search(searchValue).catch(() => {
                return { data: { value: null } }
            }),
            episodesService.search(searchValue).catch(() => {
                return { data: { value: null } }
            }),
            locationService.search(searchValue).catch(() => {
                return { data: { value: null } }
            })
        ])

        // Salva resultados (se vazio, mantém array vazio)
        const charResults = charactersData.data.value?.results || []
        const episResults = episodesData.data.value?.results || []
        const locResults = locationsData.data.value?.results || []


        searchStore.setCharacterResults(charResults)
        searchStore.setEpisodeResults(episResults)
        searchStore.setLocationResults(locResults)


    } catch (error) {

        // Em caso de erro, garante que tudo está limpo MAS mantém o searchTerm
        searchStore.setCharacterResults([])
        searchStore.setEpisodeResults([])
        searchStore.setLocationResults([])
    } finally {
        searchStore.setIsSearching(false)
    }
}

// Limpa a busca quando o campo fica vazio
watch(search, (newValue) => {
    if (newValue.length === 0) {
        searchStore.clearSearch()
    }
})

// Limpa a busca quando muda de página (qualquer mudança de rota)
watch(() => route.path, () => {
    search.value = ''
    searchStore.clearSearch()
})
</script>

<style scoped></style>