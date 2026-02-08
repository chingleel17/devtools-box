<script setup lang="ts">
import { ref, onMounted } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

// 切換順序：Light -> Dark -> Terminal -> Light
function toggleTheme() {
    if (theme.value === 'light') {
        theme.value = 'dark'
    } else if (theme.value === 'dark') {
        theme.value = 'terminal'
    } else {
        theme.value = 'light'
    }

    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('theme', theme.value)
}

// 獲取對應的圖示
function getThemeIcon() {
    switch (theme.value) {
        case 'dark':
            return 'bi-moon-fill'
        case 'terminal':
            return 'bi-terminal-fill'
        default:
            return 'bi-sun-fill'
    }
}

onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme.value)
})
</script>

<template>
    <button class="theme-switcher-btn" @click="toggleTheme"
        :title="theme === 'light' ? '切換至深色模式' : (theme === 'dark' ? '切換至終端機模式' : '切換至亮色模式')">
        <i :class="['bi', getThemeIcon()]"></i>
    </button>
</template>

<style scoped>
.theme-switcher-btn {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    background: transparent;
    border: none;
    color: var(--theme-text);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    cursor: pointer;
}

.theme-switcher-btn:hover {
    background: var(--theme-bg-hover);
    color: var(--theme-accent);
}
</style>
