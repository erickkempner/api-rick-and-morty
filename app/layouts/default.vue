<template>
    <div class=" w-screen h-screen overflow-x-hidden "
        :class="isDarkmodeStore.isDarkmode ? 'bg-[#313234]' : 'bg-white'">
        <div class=" w-full flex justify-center" :class="isDarkAndPathValid()">
            <div class="max-w-[1400px] w-full">
                <Header />
                <Hero v-show="pathValid()" />
            </div>

        </div>
        <div class="max-w-[1420px] w-full mx-auto h-full">
            <slot />
        </div>
    </div>

</template>

<script setup lang="ts">
import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const route = useRoute()
const routePath = route.path

const pathValid = () => {
    if (routePath === '/') {
        return true
    }
    return false
}

const isDarkAndPathValid = () => {
    if (pathValid() && isDarkmodeStore.isDarkmode) {
        return 'bg-black'
    } else if (!pathValid() && isDarkmodeStore.isDarkmode) {
        return 'bg-[#313234]'
    }
    return 'bg-white'
}

const isDarkmodeStore = useIsdarkmodeStore()
</script>

<style></style>