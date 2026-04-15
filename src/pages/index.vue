<script setup lang="ts">
import { menuItems, menuCategories } from '~/config/menuConfig'

useHead({
    title: '開發者工具箱 | DevTools Box',
    meta: [{ name: 'description', content: '現代化開發者工具箱，集合 JSON 格式化、Markdown 預覽、Diff 比較、密碼產生器等實用工具' }],
})

const categoryIconMap: Record<string, string> = {
    'text-tools': 'bi-file-code',
    'converters': 'bi-arrow-left-right',
    'generators': 'bi-lightning-charge',
    'viewers': 'bi-eye',
}
</script>

<template>
    <div class="home-page">
        <!-- Hero -->
        <section class="hero-section">
            <div class="hero-badge">
                <i class="bi bi-tools"></i>
                <span>Developer Utilities</span>
            </div>
            <h1 class="hero-title">
                <span class="hero-title-main">DevTools Box</span>
                <span class="hero-title-sub">開發者工具箱</span>
            </h1>
            <p class="hero-desc">集合常用開發工具，快速處理 JSON、Markdown、文字差異比較等日常任務</p>
            <div class="hero-stats">
                <span class="stat-item"><i class="bi bi-grid-3x3-gap"></i> {{ menuItems.length }} 個工具</span>
                <span class="stat-divider">·</span>
                <span class="stat-item"><i class="bi bi-lightning"></i> 即時處理，無需上傳</span>
                <span class="stat-divider">·</span>
                <span class="stat-item"><i class="bi bi-shield-check"></i> 資料不離開瀏覽器</span>
            </div>
        </section>

        <!-- Tool Grid by Category -->
        <section class="tools-section">
            <div v-for="cat in menuCategories" :key="cat.id" class="category-block">
                <div class="category-header">
                    <i :class="['bi', categoryIconMap[cat.id] || 'bi-grid']"></i>
                    <span>{{ cat.label }}</span>
                </div>
                <div class="tools-grid">
                    <NuxtLink v-for="item in menuItems.filter(m => m.category === cat.id)" :key="item.id"
                        :to="item.route" class="tool-card">
                        <div class="tool-card-icon">
                            <i :class="['bi', item.icon]"></i>
                        </div>
                        <div class="tool-card-body">
                            <h3 class="tool-card-title">{{ item.label }}</h3>
                            <p class="tool-card-desc">{{ item.description }}</p>
                        </div>
                        <div class="tool-card-arrow">
                            <i class="bi bi-arrow-right"></i>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.home-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
}

/* Hero */
.hero-section {
    text-align: center;
    padding: 3rem 1rem 2.5rem;
    margin-bottom: 2rem;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--theme-accent);
    background: color-mix(in srgb, var(--theme-accent) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--theme-accent) 25%, transparent);
    padding: 0.3rem 0.85rem;
    border-radius: 2rem;
    margin-bottom: 1.5rem;
}

.hero-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 1rem;
}

.hero-title-main {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(2rem, 6vw, 3.2rem);
    font-weight: 700;
    color: var(--theme-text);
    letter-spacing: -0.02em;
    line-height: 1;
}

.hero-title-sub {
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    font-weight: 400;
    color: var(--theme-text-muted);
    letter-spacing: 0.08em;
}

.hero-desc {
    color: var(--theme-text-muted);
    font-size: 0.95rem;
    max-width: 480px;
    margin: 0 auto 1.5rem;
    line-height: 1.7;
}

.hero-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--theme-text-light);
}

.stat-item {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}

.stat-divider {
    opacity: 0.4;
}

/* Tools Section */
.tools-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.category-block {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.category-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--theme-text-muted);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--theme-border);
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 0.75rem;
}

/* Tool Card */
.tool-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.1rem;
    background: var(--theme-bg-card);
    border: 1px solid var(--theme-border);
    border-radius: 10px;
    text-decoration: none;
    color: var(--theme-text);
    transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
    cursor: pointer;
}

.tool-card:hover {
    border-color: var(--theme-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-accent) 12%, transparent),
        var(--shadow-md);
    transform: translateY(-2px);
    color: var(--theme-text);
    text-decoration: none;
}

.tool-card-icon {
    flex-shrink: 0;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 8px;
    background: color-mix(in srgb, var(--theme-accent) 12%, transparent);
    color: var(--theme-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: background 0.18s;
}

.tool-card:hover .tool-card-icon {
    background: color-mix(in srgb, var(--theme-accent) 20%, transparent);
}

.tool-card-body {
    flex: 1;
    min-width: 0;
}

.tool-card-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0 0 0.2rem;
    color: var(--theme-text);
}

.tool-card-desc {
    font-size: 0.78rem;
    color: var(--theme-text-muted);
    margin: 0;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tool-card-arrow {
    flex-shrink: 0;
    color: var(--theme-text-light);
    font-size: 0.85rem;
    transition: transform 0.18s, color 0.18s;
}

.tool-card:hover .tool-card-arrow {
    transform: translateX(3px);
    color: var(--theme-accent);
}

@media (max-width: 480px) {
    .home-page {
        padding: 1rem 1rem 3rem;
    }

    .hero-section {
        padding: 1.5rem 0.5rem 1.5rem;
    }

    .tools-grid {
        grid-template-columns: 1fr;
    }
}
</style>
