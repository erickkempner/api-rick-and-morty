<template>
    <button
        class="border-2 border-cyan-400 rounded-3xl px-3 py-2 md:px-4 md:py-2 cursor-pointer text-sm md:text-base whitespace-nowrap"
        :class="[isDarkmode ? 'bg-[#313234] text-white' : 'bg-[#f9f9f9] text-black', getCategory == category ? 'bg-cyan-400 text-black font-bold' : '']">
        <Icon :name="icon" class="shrink-0" /> {{ title }}
    </button>
</template>

<script lang="ts" setup>
const isDarkmodeStore = useIsdarkmodeStore()
const { isDarkmode } = storeToRefs(isDarkmodeStore)

const { title, category, icon } = defineProps<{ title: string, category: string, icon: string }>()
const categoryStore = useCategorySearchStore()
const { getCategory }: { getCategory: Ref<string> } = storeToRefs(categoryStore)

</script>

<style></style>