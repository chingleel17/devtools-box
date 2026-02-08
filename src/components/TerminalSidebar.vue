<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { menuItems, menuCategories, getMenuItemsByCategory } from '../config/menuConfig'
import { useTerminalMode } from '../composables/useTerminalMode'
import { useMenuSearch } from '../composables/useMenuSearch'
import TerminalSearch from './TerminalSearch.vue'
import TerminalMenuList from './TerminalMenuList.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

const router = useRouter()
const route = useRoute()

const { isCollapsed, toggleCollapsed, menuMode, toggleMenuMode, focusSearch } = useTerminalMode()
const { searchQuery, searchResults, clearSearch, setSearchQuery } = useMenuSearch()

// 獲取當前選中的工具 ID
const currentToolId = computed(() => {
    const segments = route.path.split('/')
    return segments[segments.length - 1] || '' || 'home'
})

// 回到列表視圖
const backToList = () => {
    clearSearch()
    toggleMenuMode('list')
}

// 導航到工具
const navigateToTool = (toolId: string) => {
    const currentId = menuItems.find((item) => item.id === toolId)?.route || `/tool/${toolId}`
    router.push(currentId)
    backToList()
    // 在移動設備上自動收折側邊欄
    if (window.innerWidth < 768) {
        if (!isCollapsed.value) toggleCollapsed()
    }
}

const navigateToHome = () => {
    router.push('/')
    // 在移動設備上自動收折側邊欄
    if (window.innerWidth < 768) {
        if (!isCollapsed.value) toggleCollapsed()
    }
}
</script>

<template>
    <aside :class="['terminal-sidebar', { collapsed: isCollapsed }]">
        <!-- 固定頂部區域 (包含 Brand 和 Search) -->
        <div class="sidebar-fixed-top">
            <!-- Brand / Header 區域 -->
            <div class="sidebar-header" @click="navigateToHome">
                <!-- 始終顯示 Icon (收折時作為 Home/Logo, 展開時作為 Logo) -->
                <div class="header-brand-icon">
                    <i class="bi bi-tools"></i>
                </div>

                <!-- 展開時顯示標題與收折按鈕 -->
                <div class="header-content" v-if="!isCollapsed">
                    <div class="brand-info">
                        <div class="brand-title">DevToolkit</div>
                        <div class="brand-subtitle">開發者工具箱</div>
                    </div>
                </div>

                <!-- 展開時的收折按鈕 (靠右) -->
                <button v-if="!isCollapsed" class="toggle-btn" @click.stop="toggleCollapsed" title="收折菜單">
                    <i class="bi bi-layout-sidebar-inset"></i>
                </button>
            </div>

            <!-- 搜尋區塊 (位於 Header 下方) -->
            <div class="sidebar-search-section">
                <!-- 展開時顯示完整搜尋框 -->
                <div class="search-wrapper" v-if="!isCollapsed">
                    <TerminalSearch :search-query="searchQuery" :on-search="setSearchQuery" :on-clear="clearSearch"
                        :on-back="backToList" :focused="menuMode === 'search'" :on-focus="focusSearch"
                        :on-navigate="navigateToTool" :search-results="menuMode === 'search' ? searchResults : []
                            " />
                </div>
                <!-- 收折時顯示搜尋按鈕 -->
                <button v-else class="mini-icon-btn" @click="focusSearch" title="搜尋 / 展開">
                    <i class="bi bi-search"></i>
                </button>

                <!-- 收折時顯示展開按鈕 -->
                <button v-if="isCollapsed" class="mini-icon-btn mt-2" @click="toggleCollapsed" title="展開菜單">
                    <i class="bi bi-list"></i>
                </button>
            </div>

            <div class="divider" v-if="isCollapsed"></div>
        </div>

        <!-- 菜單內容區 -->
        <div class="sidebar-content" v-if="!isCollapsed">
            <!-- 搜尋結果視圖 -->
            <template v-if="menuMode === 'search' && searchQuery">
                <div class="search-results-container">
                    <div class="results-header">
                        <span class="results-count">{{ searchResults.length }} 個結果</span>
                        <button class="back-btn" @click="backToList" title="返回列表">
                            <i class="bi bi-arrow-left"></i>
                        </button>
                    </div>
                    <ul class="menu-list search-results">
                        <li v-for="item in searchResults" :key="item.id" class="menu-item">
                            <button class="menu-link" :class="{ active: currentToolId === item.id }"
                                @click="navigateToTool(item.id)">
                                <span class="menu-indicator">{{ currentToolId === item.id ? '▶' : '›' }}</span>
                                <i :class="['bi', item.icon]"></i>
                                <span class="menu-label">{{ item.label }}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </template>

            <!-- 分類列表視圖 -->
            <template v-else>
                <TerminalMenuList :categories="menuCategories" :menu-items="menuItems"
                    :get-items-by-category="getMenuItemsByCategory" :current-tool-id="currentToolId"
                    :on-navigate="navigateToTool" />
            </template>
        </div>

        <!-- 收折時的迷你模式菜單 -->
        <div class="sidebar-collapsed-content" v-if="isCollapsed">
            <button v-for="item in menuItems" :key="item.id" class="mini-menu-btn"
                :class="{ active: currentToolId === item.id }" :title="item.label" @click="navigateToTool(item.id)">
                <i :class="['bi', item.icon]"></i>
            </button>
        </div>

        <!-- 底部功能區 (主題 + Github) -->
        <div class="sidebar-footer">
            <template v-if="!isCollapsed">
                <div class="footer-actions">
                    <ThemeSwitcher />
                    <a href="https://github.com/chingleel17/document-viewer" target="_blank" class="footer-link"
                        title="GitHub">
                        <i class="bi bi-github"></i>
                    </a>

                    <div class="footer-copyright">
                        <small>© 2025</small>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="d-flex flex-column align-items-center gap-2 w-100">
                    <ThemeSwitcher class="mini-icon-btn" />
                    <a href="https://github.com/chingleel17/document-viewer" target="_blank" class="mini-icon-btn"
                        title="GitHub">
                        <i class="bi bi-github"></i>
                    </a>
                </div>
            </template>
        </div>
    </aside>
</template>

<style scoped>
.terminal-sidebar {
    --sidebar-width: 250px;
    --sidebar-collapsed-width: 60px;
    --header-height: 60px;

    display: flex;
    flex-direction: column;
    width: var(--sidebar-width);
    height: 100vh;
    background: var(--theme-bg-card);
    border-right: 1px solid var(--theme-border);
    transition: width 0.3s ease;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    overflow: hidden;
}

.terminal-sidebar.collapsed {
    width: var(--sidebar-collapsed-width);
}

.sidebar-fixed-top {
    flex-shrink: 0;
    background: var(--theme-bg-header);
    border-bottom: 1px solid var(--theme-border);
    display: flex;
    flex-direction: column;
}

/* 頂部 Header Block */
.sidebar-header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    cursor: pointer;
    transition: background 0.2s;
}

.sidebar-header:hover {
    background: var(--theme-bg-hover);
}

.header-brand-icon {
    font-size: 1.5rem;
    color: var(--theme-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
}

.header-content {
    flex: 1;
    margin-left: 0.75rem;
    overflow: hidden;
}

.brand-title {
    font-weight: bold;
    color: var(--theme-text);
    font-size: 1rem;
    white-space: nowrap;
}

.brand-subtitle {
    font-size: 0.7rem;
    color: var(--theme-text-muted);
    white-space: nowrap;
}

.toggle-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: var(--theme-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-left: 0.5rem;
}

.toggle-btn:hover {
    color: var(--theme-accent);
    background: rgba(0, 0, 0, 0.05);
}

/* 搜尋區域 */
.sidebar-search-section {
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.search-wrapper {
    width: 100%;
}

.mini-icon-btn {
    width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    color: var(--theme-text-muted);
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
}

.mini-icon-btn:hover {
    color: var(--theme-accent);
    background: var(--theme-bg-hover);
}

.mt-2 {
    margin-top: 0.5rem;
}

/* 菜單內容區 */
.sidebar-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0.5rem;
}

.sidebar-content::-webkit-scrollbar {
    width: 4px;
}

.sidebar-content::-webkit-scrollbar-thumb {
    background: var(--theme-border);
}

/* 底部區 */
.sidebar-footer {
    padding: 0.75rem;
    border-top: 1px solid var(--theme-border);
    background: var(--theme-bg-card);
}

.footer-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.25rem;
}

.footer-link {
    color: var(--theme-text);
    font-size: 1.2rem;
    padding: 4px;
    transition: color 0.2s;
}

.footer-link:hover {
    color: var(--theme-accent);
}

.footer-copyright {
    text-align: center;
    color: var(--theme-text-muted);
    font-size: 0.7rem;
}

/* 收折迷你模式 */
.sidebar-collapsed-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 0.25rem;
    align-items: center;
    flex: 1;
    overflow-y: auto;
}

.mini-menu-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    color: var(--theme-text-muted);
    cursor: pointer;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: all 0.2s;
}

.mini-menu-btn:hover {
    background: var(--theme-bg-hover);
    color: var(--theme-accent);
}

.mini-menu-btn.active {
    background: var(--theme-bg-hover);
    color: var(--theme-accent);
    position: relative;
}

.mini-menu-btn.active::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 20px;
    background: var(--theme-accent);
    border-radius: 0 2px 2px 0;
}

.divider {
    height: 1px;
    width: 80%;
    background: var(--theme-border);
    margin: 0 auto;
}

/* 搜尋結果和其他部分樣式保持不變... */
.search-results-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    color: var(--theme-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--theme-border);
}

.results-count {
    font-weight: bold;
}

.back-btn {
    background: none;
    border: none;
    color: var(--theme-text);
    cursor: pointer;
    font-size: 1rem;
    padding: 0 0.25rem;
    transition: color 0.2s ease;
}

.back-btn:hover {
    color: var(--theme-accent);
}

.menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.search-results {
    padding: 0.5rem;
}

.menu-item {
    margin: 0.25rem 0;
}

.menu-link {
    width: 100%;
    background: none;
    border: 1px solid transparent;
    color: var(--theme-text);
    padding: 0.5rem 0.75rem;
    text-align: left;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-family: inherit;
}

.menu-link:hover {
    background: var(--theme-bg-header);
    color: var(--theme-accent);
}

.menu-link.active {
    background: var(--theme-bg-header);
    color: var(--theme-accent);
    border-color: var(--theme-accent);
}

.menu-indicator {
    font-weight: bold;
    color: var(--theme-accent);
    min-width: 1.2rem;
}

.menu-link .bi {
    width: 1.2rem;
    text-align: center;
}

.menu-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 響應式 */
@media (max-width: 768px) {
    .terminal-sidebar {
        position: fixed;
        height: 100vh;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transform: translateX(0);
    }

    .terminal-sidebar.collapsed {
        transform: translateX(-100%);
        width: var(--sidebar-width);
        /* MObile collapse = hidden */
    }
}
</style>
