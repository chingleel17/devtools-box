<script setup lang="ts">
import ToonToolPage from '../../features/tools/views/ToonTool.vue'

const pageUrl = 'https://markdown-json-viewer.pages.dev/tool/toon-converter'

useSeoMeta({
    title: 'TOON 格式轉換器 - 免費線上資料格式快速轉換，支援多種輸入輸出 | 開發者工具箱',
    description: '免費線上 TOON 格式轉換工具，支援多種資料格式快速互轉，操作簡便直覺，適合開發者日常資料處理、格式轉換與快速驗證需求。',
    ogTitle: 'TOON 格式轉換器 - 免費線上資料格式快速轉換，支援多種輸入輸出',
    ogDescription: '免費線上 TOON 格式轉換工具，支援多種資料格式快速互轉，適合開發者日常資料處理需求。',
    ogUrl: pageUrl,
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'TOON 格式轉換器 - 免費線上資料格式快速轉換，支援多種輸入輸出',
    twitterDescription: '免費線上 TOON 格式轉換工具，支援多種資料格式快速互轉，適合開發者日常資料處理需求。',
})

useHead({
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'WebApplication',
                        name: 'TOON 格式轉換器',
                        description: '免費線上 TOON 格式轉換工具，快速轉換資料格式，支援多種輸入輸出格式，適合開發者日常資料處理。',
                        url: pageUrl,
                        applicationCategory: 'DeveloperApplication',
                        operatingSystem: 'All',
                        isAccessibleForFree: true,
                        inLanguage: 'zh-TW',
                        datePublished: '2024-01-01',
                        dateModified: '2025-03-29',
                        author: {
                            '@type': 'Person',
                            name: 'YC.L',
                            jobTitle: 'Full Stack Developer',
                            knowsAbout: ['Data Format Conversion', 'TOON Format', 'JSON', 'Data Serialization', 'Developer Tools'],
                            url: 'https://markdown-json-viewer.pages.dev',
                            description: 'YC.L 專注於結構化資料格式的解析與互轉工具開發，熟悉多種輕量化資料序列化格式的設計原理與實作。',
                            sameAs: ['https://github.com/chingleel17'],
                        },
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
                    },
                    {
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'TOON 格式轉換器支援哪些格式？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '支援多種資料格式的相互轉換，適合開發者快速處理不同系統間的資料格式需求。',
                                },
                            },
                        ],
                    },
                    {
                        '@type': 'Organization',
                        name: '開發者工具箱',
                        url: 'https://markdown-json-viewer.pages.dev',
                        description: '提供開發者日常使用的免費線上工具集，包含 JSON 格式化、Markdown 編輯、文字差異比對等工具。',
                        founder: { '@type': 'Person', name: 'YC.L' },
                    },
                ],
            }),
        },
    ],
})
</script>

<template>
    <h1 class="visually-hidden">TOON 格式轉換器 - 線上資料格式轉換工具</h1>
    <ToonToolPage />
    <details class="tool-info-section container-fluid mt-2 mb-2 px-3"
        style="font-size: 0.8rem; color: var(--theme-text-muted, #6c757d);">
        <summary style="font-size: 0.9rem; font-weight: 600; cursor: pointer; user-select: none;">關於 TOON 格式轉換器
        </summary>
        <p>TOON 格式轉換器專為 TOON 與 JSON 雙向轉換設計。TOON
            是一種輕量化的結構化資料表示格式，本工具提供即時轉換、語法驗證與錯誤提示，轉換過程完全在瀏覽器本地執行，無需後端服務，離線也可使用，輸出結果可一鍵複製。</p>
        <p><strong>主要功能：</strong>TOON 轉 JSON、JSON 轉 TOON、雙向格式轉換、語法驗證、即時預覽、一鍵複製結果、完全瀏覽器本地運算。</p>
        <nav aria-label="相關工具">
            <span>其他工具：</span>
            <a href="/tool/json-tool">JSON 格式化工具</a>、
            <a href="/tool/markdown-tool">Markdown 即時預覽編輯器</a>、
            <a href="/tool/diff-viewer">文字差異比較工具</a>、
            <a href="/tool/password-generator">強密碼產生器</a>、
            <a href="/tool/document-viewer">線上文檔檢視器</a>
        </nav>
    </details>
</template>