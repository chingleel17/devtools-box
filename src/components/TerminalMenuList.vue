<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem, MenuCategory } from '../types/menu'

interface Props {
    categories: MenuCategory[]
    menuItems: MenuItem[]
    getItemsByCategory: (categoryId: string) => MenuItem[]
    currentToolId: string
    onNavigate: (toolId: string) => void
}

const props = defineProps<Props>()

// 展開的類別集合
const expandedCategories = ref<Set<string>>(new Set(props.categories.map((c) => c.id)))

const toggleCategory = (categoryId: string) => {
    if (expandedCategories.value.has(categoryId)) {
        expandedCategories.value.delete(categoryId)
    } else {
        expandedCategories.value.add(categoryId)
    }
}

const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.value.has(categoryId)
}
</script>

<template>
    <div class="terminal-menu-list">
        <div v-for="category in categories" :key="category.id" class="menu-category">
            <!-- 類別標題 -->
            <button class="category-header" @click="toggleCategory(category.id)">
                <span class="category-toggle">{{ isCategoryExpanded(category.id) ? '▼' : '▶' }}</span>
                <i v-if="category.icon" :class="['bi', category.icon]"></i>
                <span class="category-label">{{ category.label }}</span>
                <span class="category-count">{{ getItemsByCategory(category.id).length }}</span>
            </button>

            <!-- 類別下的菜單項 -->
            <ul v-if="isCategoryExpanded(category.id)" class="category-items">
                <li v-for="item in getItemsByCategory(category.id)" :key="item.id" class="menu-item">
                    <button class="menu-link" :class="{ active: currentToolId === item.id }"
                        @click="onNavigate(item.id)" :title="item.description">
                        <span class="menu-indicator">{{ currentToolId === item.id ? '▶' : '›' }}</span>
                        <i :class="['bi', item.icon]"></i>
                        <span class="menu-label">{{ item.label }}</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.terminal-menu-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* 菜單類別 */
.menu-category {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.category-header {
    width: 100%;
    background: transparent;
    border: 1px solid transparent;
    color: var(--theme-accent);
    padding: 0.75rem 0.75rem;
    text-align: left;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: bold;
    font-family: inherit;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.category-header:hover {
    background: var(--theme-bg-header);
    border-color: var(--theme-accent);
}

.category-toggle {
    min-width: 1rem;
    text-align: center;
    font-weight: bold;
}

.category-header .bi {
    width: 1.2rem;
    text-align: center;
    font-size: 1rem;
}

.category-label {
    flex: 1;
}

.category-count {
    font-size: 0.75rem;
    opacity: 0.7;
}

/* 類別下的菜單項 */
.category-items {
    list-style: none;
    margin: 0;
    padding: 0.25rem 0;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.menu-item {
    margin: 0;
    padding: 0 0.5rem;
}

.menu-link {
    width: 100%;
    background: transparent;
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
    min-width: 1.2rem;
    font-weight: bold;
    color: var(--theme-accent);
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
</style>
