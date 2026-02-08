<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { MenuItem } from '../types/menu'

interface Props {
    searchQuery: string
    onSearch: (query: string) => void
    onClear: () => void
    onBack: () => void
    focused: boolean
    onFocus: () => void
    searchResults: MenuItem[]
    onNavigate: (toolId: string) => void
}

const props = defineProps<Props>()

// 搜尋輸入框引用
const searchInput = ref<HTMLInputElement>()

// 選中的建議項索引
const selectedIndex = ref<number>(-1)

// 監聽 focused props 變化，自動聚焦
const focusSearch = async () => {
    await nextTick()
    searchInput.value?.focus()
}

// 處理搜尋輸入
const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    props.onSearch(target.value)
    selectedIndex.value = -1
}

// 處理鍵盤事件
const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'Escape':
            props.onClear()
            props.onBack()
            break

        case 'ArrowDown':
            event.preventDefault()
            if (props.searchResults.length > 0) {
                selectedIndex.value = Math.min(selectedIndex.value + 1, props.searchResults.length - 1)
            }
            break

        case 'ArrowUp':
            event.preventDefault()
            if (selectedIndex.value > -1) {
                selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
            }
            break

        case 'Enter':
            event.preventDefault()
            if (selectedIndex.value >= 0 && selectedIndex.value < props.searchResults.length) {
                const selected = props.searchResults[selectedIndex.value]
                if (selected) props.onNavigate(selected.id)
            } else if (props.searchResults.length > 0) {
                const first = props.searchResults[0]
                if (first) props.onNavigate(first.id)
            }
            break
    }
}

// 監聽 focused prop 變化
const handleFocus = () => {
    props.onFocus()
    focusSearch()
}

const handleClickResult = (toolId: string) => {
    props.onNavigate(toolId)
}
</script>

<template>
    <div class="terminal-search">
        <!-- 搜尋框 -->
        <div class="search-input-wrapper">
            <span class="search-prompt">$</span>
            <input ref="searchInput" type="text" class="search-input" :value="searchQuery" @input="handleInput"
                @keydown="handleKeyDown" @focus="handleFocus" placeholder="search..." spellcheck="false" />
            <button v-if="searchQuery" class="search-clear-btn" @click="onClear" title="清除搜尋">
                <i class="bi bi-x-circle-fill"></i>
            </button>
        </div>

        <!-- 搜尋結果下拉列表（快速預覽） -->
        <div v-if="focused && searchQuery && searchResults.length > 0" class="search-suggestions">
            <ul class="suggestions-list">
                <li v-for="(item, index) in searchResults.slice(0, 5)" :key="item.id"
                    :class="['suggestion-item', { active: selectedIndex === index }]"
                    @click="handleClickResult(item.id)">
                    <span class="suggestion-indicator">{{ selectedIndex === index ? '▶' : '·' }}</span>
                    <i :class="['bi', item.icon]"></i>
                    <span class="suggestion-label">{{ item.label }}</span>
                </li>
            </ul>
            <div v-if="searchResults.length > 5" class="suggestions-more">
                <small>+{{ searchResults.length - 5 }} 更多</small>
            </div>
        </div>
    </div>
</template>

<style scoped>
.terminal-search {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

/* 搜尋框 */
.search-input-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: var(--theme-bg-input);
    border: 1px solid var(--theme-border);
    border-radius: 4px;
    transition: all 0.2s ease;
}

.search-input-wrapper:focus-within {
    border-color: var(--theme-accent);
    background: var(--theme-bg-header);
}

.search-prompt {
    color: var(--theme-accent);
    font-weight: bold;
    user-select: none;
    flex-shrink: 0;
}

.search-input {
    flex: 1;
    background: none;
    border: none;
    color: var(--theme-text);
    outline: none;
    font-family: inherit;
    font-size: 0.9rem;
    min-width: 0;
}

.search-input::placeholder {
    color: var(--theme-text-muted);
}

.search-clear-btn {
    background: none;
    border: none;
    color: var(--theme-text);
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    flex-shrink: 0;
    transition: color 0.2s ease;
}

.search-clear-btn:hover {
    color: var(--theme-accent);
}

/* 搜尋建議列表 */
.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 5px;
    background: var(--theme-bg-header);
    border: 1px solid var(--theme-border);
    border-radius: 4px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 100;
    box-shadow: var(--shadow-lg);
}

.suggestions-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.suggestion-item {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--theme-text);
    transition: all 0.2s ease;
    border-bottom: 1px solid var(--theme-border);
}

.suggestion-item:last-child {
    border-bottom: none;
}

.suggestion-item:hover,
.suggestion-item.active {
    background: rgba(78, 201, 176, 0.1);
    color: var(--theme-accent);
}

.suggestion-indicator {
    min-width: 1.2rem;
    color: var(--theme-accent);
    font-weight: bold;
}

.suggestion-item .bi {
    width: 1.2rem;
    text-align: center;
    font-size: 0.9rem;
}

.suggestion-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.9rem;
}

.suggestions-more {
    padding: 0.5rem 0.75rem;
    text-align: center;
    color: var(--theme-text-muted);
    border-top: 1px solid var(--theme-border);
}
</style>
