export type MenuMode = 'list' | 'search'

export function useTerminalMode() {
    const storageKey = 'terminal-sidebar-collapsed'
    const isCollapsed = useState<boolean>('terminal-sidebar-collapsed', () => false)
    const menuMode = useState<MenuMode>('terminal-menu-mode', () => 'list')
    const searchFocused = useState<boolean>('terminal-search-focused', () => false)

    onMounted(() => {
        const stored = localStorage.getItem(storageKey)
        if (stored !== null) {
            isCollapsed.value = stored === 'true'
        }
    })

    const toggleCollapsed = () => {
        isCollapsed.value = !isCollapsed.value
        if (import.meta.client) {
            localStorage.setItem(storageKey, String(isCollapsed.value))
        }
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
