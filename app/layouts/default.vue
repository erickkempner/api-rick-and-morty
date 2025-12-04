<template>
    <div class=" w-screen h-screen overflow-x-hidden " :class="isDarkmodeStore.isDarkmode ? 'bg-[#313234]' : 'bg-white'">
        <div class=" w-full flex justify-center" :class="isDarkmodeStore.isDarkmode ? 'bg-black' : 'bg-white'">
            <div class="max-w-[1400px] w-full">
                <Header />
                <Hero />
            </div>
            
        </div>
        <div class="max-w-[1420px] w-full mx-auto h-full">
            <slot />
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { useIsdarkmodeStore } from '~/stores/isDarkmode';
const isDarkmodeStore = useIsdarkmodeStore()
</script>

<style>

</style>