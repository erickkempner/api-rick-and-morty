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
        <div v-if="!noCategory" class="flex flex-row gap-2 md:gap-3 items-center justify-center flex-wrap">
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
import { useSearchStore } from '~/stores/search';

const isDarkmodeStore = useIsdarkmodeStore()
const { isDarkmode } = storeToRefs(isDarkmodeStore)

const categoryStore = useCategorySearchStore()
const { getCategory }: { getCategory: Ref<string> } = storeToRefs(categoryStore)

const { noCategory } = defineProps<{ noCategory: boolean }>()

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
        searchStore.setSearchTerm(search.value)

        const { data } = await characterService.search(search.value)

        if (data.value?.results) {
            searchStore.setSearchResults(data.value.results)
        } else {
            searchStore.setSearchResults([])
        }
    } catch (error) {
        console.error('Erro na busca:', error)
        searchStore.setSearchResults([])
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
</script>

<style scoped></style>