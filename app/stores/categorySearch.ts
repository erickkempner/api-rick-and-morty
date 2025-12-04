import { defineStore } from 'pinia'

export const useCategorySearchStore = defineStore('categorySearch', {
    state: () => ({
        category: 'all' as string,
    }),
    actions: {
        setCategory(category: string) {
            this.category = category
        },
        resetCategory() {
            this.category = 'all'
        }
    },
    getters: {
        getCategory: (state) => state.category
    }
})
