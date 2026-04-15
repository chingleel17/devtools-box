<script setup lang="ts">
import TerminalSidebar from '../components/TerminalSidebar.vue'
import { useTerminalMode } from '../composables/useTerminalMode'

const { isCollapsed, toggleCollapsed } = useTerminalMode()

// 點擊遮罩關閉 sidebar
const handleOverlayClick = () => {
    if (!isCollapsed.value) toggleCollapsed()
}
</script>

<template>
    <div class="app-layout">
        <TerminalSidebar />

        <!-- 手機遮罩：sidebar 展開時顯示，點擊關閉 -->
        <Transition name="fade">
            <div v-if="!isCollapsed" class="mobile-overlay" @click="handleOverlayClick" aria-hidden="true" />
        </Transition>

        <div class="app-main" :class="{ 'sidebar-collapsed': isCollapsed }">
            <!-- 手機頂部導覽列 -->
            <header class="mobile-topbar">
                <button class="mobile-menu-btn" @click="toggleCollapsed" aria-label="開啟選單">
                    <i class="bi bi-list"></i>
                </button>
                <span class="mobile-topbar-title">
                    <i class="bi bi-tools"></i> DevTools Box
                </span>
            </header>

            <main class="container-fluid flex-grow-1 p-2 d-flex flex-column">
                <slot />
            </main>

            <footer class="container-fluid text-center p-1 mt-auto"
                style="backdrop-filter: blur(20px); margin-top: 2rem;">
                <small class="text-muted d-flex align-items-center justify-content-center gap-2 flex-wrap">
                    <i class="bi bi-tools" aria-hidden="true"></i>
                    <span>開發者工具箱 DevTools Box</span>
                    <span>Copyright &copy; 2025</span>
                    <span itemscope itemtype="https://schema.org/Person">
                        <span itemprop="name">YC.L</span>
                    </span>
                    <span>。All rights reserved.</span>
                </small>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.app-layout {
    display: flex;
    min-height: 100vh;
    background: var(--theme-bg-gradient);
}

.app-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 250px;
    transition: margin-left 0.3s ease;
}

.app-main.sidebar-collapsed {
    margin-left: 60px;
}

/* 手機遮罩 */
.mobile-overlay {
    display: none;
}

/* 手機頂部導覽列 */
.mobile-topbar {
    display: none;
}

@media (max-width: 768px) {
    .app-main {
        margin-left: 0 !important;
    }

    .mobile-overlay {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        z-index: 999;
        /* 低於 sidebar (1000) */
    }

    .mobile-topbar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.65rem 1rem;
        background: var(--theme-bg-header);
        border-bottom: 1px solid var(--theme-border);
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .mobile-menu-btn {
        width: 36px;
        height: 36px;
        border: none;
        background: transparent;
        color: var(--theme-text);
        font-size: 1.4rem;
        cursor: pointer;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .mobile-menu-btn:hover {
        background: var(--theme-bg-hover);
        color: var(--theme-accent);
    }

    .mobile-topbar-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--theme-text);
        font-family: 'JetBrains Mono', monospace;
    }
}

/* 遮罩淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>