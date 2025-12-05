<template>
    <div class="w-screen h-screen overflow-x-hidden" :class="isDarkmode ? 'bg-[#313234]' : 'bg-white'">
        <!-- Header com hero -->
        <div class="w-full flex justify-center" :class="isDarkAndPathValid">
            <div class="max-w-[1400px] w-full">
                <Header />
                <Hero v-show="pathValid" />
            </div>
        </div>

        <!-- Main Content -->
        <main class="w-full flex justify-center">
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

// Use computed to make it reactive to route changes
const pathValid = computed(() => {
    return route.path === '/'
})

const isDarkAndPathValid = computed(() => {
    if (pathValid.value && isDarkmode.value) {
        return 'bg-black'
    } else if (!pathValid.value && isDarkmode.value) {
        return 'bg-[#313234]'
    }
    return 'bg-white'
})
</script>

<style></style>