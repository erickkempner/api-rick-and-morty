<template>
    <Transition name="fade">
        <div v-if="loading"
            class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div class="relative flex flex-col items-center">
                <!-- Portal Animation -->
                <div class="relative w-32 h-32">
                    <div
                        class="absolute inset-0 rounded-full border-4 border-cyan-400 animate-[spin_3s_linear_infinite] ">
                    </div>
                    <div
                        class="absolute inset-2 rounded-full border-4 border-cyan-400 animate-[spin_2s_linear_infinite_reverse] opacity-70">
                    </div>
                    <div
                        class="absolute inset-4 rounded-full border-4 border-cyan-400 animate-[pulse_1s_ease-in-out_infinite] opacity-50">
                    </div>
                </div>

                <h2 class="mt-8 text-2xl font-bold text-cyan-400 animate-pulse tracking-widest uppercase">
                    Carregando...
                </h2>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const loading = ref(true)

nuxtApp.hook('page:start', () => {
    loading.value = true
})

nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
        loading.value = false
    }, 800)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
