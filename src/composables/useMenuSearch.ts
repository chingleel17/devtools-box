import { computed, ref } from 'vue'
import { searchMenuItems } from '../config/menuConfig'
import type { MenuItem } from '../types/menu'

export function useMenuSearch() {
    const searchQuery = ref<string>('')
    const searchResults = computed<MenuItem[]>(() => searchMenuItems(searchQuery.value))

    const clearSearch = () => {
        searchQuery.value = ''
    }

    const setSearchQuery = (query: string) => {
        searchQuery.value = query
    }

    return {
        searchQuery,
        searchResults,
        clearSearch,
        setSearchQuery,
    }
}
