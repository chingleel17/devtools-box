import { ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export type MenuMode = 'list' | 'search'

// 全局單例狀態，確保跨組件同步
const isCollapsed = useLocalStorage<boolean>('terminal-sidebar-collapsed', false)
const menuMode = ref<MenuMode>('list')
const searchFocused = ref<boolean>(false)

export function useTerminalMode() {
    const toggleCollapsed = () => {
        isCollapsed.value = !isCollapsed.value
    }

    const toggleMenuMode = (mode: MenuMode) => {
        menuMode.value = mode
    }

    const setSearchFocused = (focused: boolean) => {
        searchFocused.value = focused
    }

    const focusSearch = () => {
        if (isCollapsed.value) {
            isCollapsed.value = false
        }
        menuMode.value = 'search'
        searchFocused.value = true
    }

    return {
        isCollapsed,
        toggleCollapsed,
        menuMode,
        toggleMenuMode,
        searchFocused,
        setSearchFocused,
        focusSearch,
    }
}
