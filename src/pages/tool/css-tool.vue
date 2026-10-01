<script setup lang="ts">
import CssToolPage from '../../features/tools/views/CssTool.vue'

const pageUrl = 'https://markdown-json-viewer.pages.dev/tool/css-tool'
const title = 'CSS 格式化工具 - 免費線上美化與壓縮 CSS | 開發者工具箱'
const description = '免費線上 CSS 工具，可格式化、美化與壓縮 CSS 樣式。所有轉換都在瀏覽器本機進行。'

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: pageUrl,
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: title,
    twitterDescription: description,
})

useHead({
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'CSS 格式化工具',
                description,
                url: pageUrl,
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                isAccessibleForFree: true,
                inLanguage: 'zh-TW',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
            }),
        },
    ],
})
</script>

<template>
    <h1 class="visually-hidden">CSS 格式化工具 - 線上美化與壓縮 CSS</h1>
    <CssToolPage />
    <details class="tool-info-section container-fluid mt-2 mb-2 px-3"
        style="font-size: 0.8rem; color: var(--theme-text-muted, #6c757d);">
        <summary style="font-size: 0.9rem; font-weight: 600; cursor: pointer; user-select: none;">關於 CSS 工具</summary>
        <p>CSS 工具可將樣式規則整理成縮排格式，或壓縮 CSS 以減少空白與註解。輸入內容在瀏覽器本機處理，不會傳送至應用程式伺服器。</p>
        <nav aria-label="相關工具">
            <span>其他工具：</span>
            <a href="/tool/json-tool">JSON 格式化工具</a>、
            <a href="/tool/markdown-tool">Markdown 即時預覽編輯器</a>、
            <a href="/tool/diff-viewer">文字差異比較工具</a>、
            <a href="/tool/toon-converter">TOON 格式轉換器</a>
        </nav>
    </details>
</template>
