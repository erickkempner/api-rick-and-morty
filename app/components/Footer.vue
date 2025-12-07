<template>
    <div class="py-10 sm:py-20 flex flex-col w-full justify-center px-4">
        <hr :class="isDarkmode ? 'border-white' : 'border-black'">
        <div class="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end py-5 gap-2 md:gap-0">
            <p :class="isDarkmode ? 'text-white' : 'text-black'" class="text-sm sm:text-base text-center md:text-left">©
                2025 Copyright. Todos os direitos reservados.</p>
            <p :class="isDarkmode ? 'text-white' : 'text-black'" class="text-sm sm:text-base text-center md:text-right">
                Desenvolvido por Erick Kempner</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { isDarkmode } = storeToRefs(useIsdarkmodeStore())
</script>

<style></style>