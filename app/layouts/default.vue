<template>
    <div class="w-screen h-screen overflow-x-hidden">
        <!-- Header com hero -->
        <div class="w-full flex justify-center" :class="isDarkAndPathValid">
            <div class="max-w-[1400px] w-full">
                <Header />
                <Hero v-show="showHero" v-bind="heroProps" />
            </div>
        </div>

        <!-- Main Content -->
        <main class="w-full flex justify-center" :class="isDarkmode ? 'bg-[#313234]' : 'bg-white'">
            <div class="max-w-[1420px] w-full mx-auto h-full">
                <slot />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useIsdarkmodeStore } from '~/stores/isDarkmode';

const isDarkmodeStore = useIsdarkmodeStore()
const { isDarkmode } = storeToRefs(isDarkmodeStore)

const route = useRoute()

// Determine if Hero should be shown
const showHero = computed(() => {
    return route.path === '/' || route.path === '/favorites'
})

// Dynamic props for Hero based on route
const heroProps = computed(() => {
    if (route.path === '/favorites') {
        return {
            text: "Todos os seus",
            textSuper: "favoritos",
            paragraph: "Personagens, episódios e localizações que você salvou."
        }
    }
    return {
        text: "Saiba tudo em um só",
        textSuper: "lugar",
        paragraph: "Personagens, localizações, episódios e muito mais."
    }
})

const isDarkAndPathValid = computed(() => {
    // Black background for Home and Favorites in dark mode
    if (showHero.value && isDarkmode.value) {
        return 'bg-black'
    }
    // Dark gray for other pages in dark mode
    else if (!showHero.value && isDarkmode.value) {
        return 'bg-[#313234]'
    }
    // White for light mode
    return 'bg-white'
})
</script>

<style></style>