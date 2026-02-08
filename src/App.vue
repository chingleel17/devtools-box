<script setup lang="ts">
import TerminalSidebar from './components/TerminalSidebar.vue'
import { useTerminalMode } from './composables/useTerminalMode'

const { isCollapsed } = useTerminalMode()
</script>
<template>
  <div class="app-layout">
    <!-- 側邊菜單 -->
    <TerminalSidebar />

    <!-- 主內容區 -->
    <div class="app-main" :class="{ 'sidebar-collapsed': isCollapsed }">
      <!-- 頁面內容 -->
      <main class="container-fluid flex-grow-1 p-2 d-flex flex-column">
        <router-view />
      </main>

      <!-- 頁腳 -->
      <footer class="container-fluid text-center p-1 mt-auto" style="backdrop-filter: blur(20px); margin-top: 2rem;">
        <small class="text-muted">Copyright © 2025 ching lee. All rights reserved.</small>
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

/* 響應式：平板設備 */
@media (max-width: 768px) {
  .app-main {
    margin-left: 0;
  }

  .app-main.sidebar-collapsed {
    margin-left: 0;
  }
}

/* 響應式：手機設備 */
@media (max-width: 480px) {
  .app-main {
    margin-left: 0;
  }
}
</style>