<script setup lang="ts">
import TerminalSidebar from '../components/TerminalSidebar.vue'
import { useTerminalMode } from '../composables/useTerminalMode'

const { isCollapsed } = useTerminalMode()

</script>

<template>
    <div class="app-layout">
        <TerminalSidebar />

        <div class="app-main" :class="{ 'sidebar-collapsed': isCollapsed }">
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
    margin-left: 55px;
}

@media (max-width: 768px) {
    .app-main {
        margin-left: 0;
    }

    .app-main.sidebar-collapsed {
        margin-left: 0;
    }
}

@media (max-width: 480px) {
    .app-main {
        margin-left: 0;
    }
}
</style>