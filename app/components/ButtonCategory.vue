<template>
    <button class="border-2 border-cyan-400 rounded-3xl p-2 cursor-pointer"
        :class="[isDarkmode ? 'bg-[#313234] text-white' : 'bg-[#f9f9f9] text-black', getCategory == category ? 'bg-black text-white' : '']">
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