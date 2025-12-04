import {defineStore} from 'pinia'

export const useIsdarkmodeStore = defineStore('isDarkmode', {
    state: () => ({
        isDarkmode: true
    }),

    actions: {
        toggleDarkmode() {
            this.isDarkmode = !this.isDarkmode
        }
    }
})