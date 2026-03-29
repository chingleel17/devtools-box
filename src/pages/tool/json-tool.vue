<script setup lang="ts">
import JsonToolPage from '../../features/tools/views/JsonTool.vue'

const pageUrl = 'https://markdown-json-viewer.pages.dev/tool/json-tool'

useSeoMeta({
    title: 'JSON 格式化工具 - 免費線上解析、驗證與美化 JSON 資料 | 開發者工具箱',
    description: '免費線上 JSON 格式化工具，支援即時美化、語法驗證、壓縮與錯誤修復。支援帶註解的 JSON，提供樹狀檢視，協助開發者快速分析複雜巢狀結構。',
    ogTitle: 'JSON 格式化工具 - 免費線上解析、驗證與美化 JSON 資料',
    ogDescription: '免費線上 JSON 格式化工具，支援即時美化、語法驗證、壓縮與錯誤修復。提供樹狀檢視，協助開發者快速分析複雜 JSON 結構。',
    ogUrl: pageUrl,
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'JSON 格式化工具 - 免費線上解析、驗證與美化',
    twitterDescription: '免費線上 JSON 格式化工具，支援即時美化、語法驗證、壓縮與錯誤修復，協助開發者快速分析 JSON 結構。',
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
                        name: 'JSON 格式化工具',
                        description: '免費線上 JSON 格式化、驗證與美化工具，支援帶註解的 JSON，提供樹狀檢視，協助開發者快速分析 JSON 結構。',
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
                            knowsAbout: ['JSON', 'JSON Schema', 'Data Formatting', 'API Development', 'Web Development'],
                            url: 'https://markdown-json-viewer.pages.dev',
                            description: 'YC.L 專注於 JSON 資料格式處理工具開發，具備豐富的 API 資料串接與前端資料解析實務經驗。',
                            sameAs: ['https://github.com/chingleel17'],
                        },
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
                    },
                    {
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: '如何使用 JSON 格式化工具？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '將 JSON 資料貼入左側輸入框，點擊「格式化」即可在右側看到美化後的結果。工具支援自動修復常見的 JSON 語法錯誤。',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: '這個工具支援帶有註解的 JSON 嗎？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '是的，本工具支援帶有 // 和 /* */ 註解的 JSON5 格式，會自動移除註解後進行解析。',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'JSON 格式化工具是免費的嗎？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '完全免費，無需帳號或訂閱，直接在瀏覽器中使用，資料不會上傳至伺服器。',
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
    <h1 class="visually-hidden">JSON 格式化工具 - 線上解析、驗證與美化</h1>
    <JsonToolPage />
    <details class="tool-info-section container-fluid mt-2 mb-2 px-3"
        style="font-size: 0.8rem; color: var(--theme-text-muted, #6c757d);">
        <summary style="font-size: 0.9rem; font-weight: 600; cursor: pointer; user-select: none;">關於 JSON 格式化工具
        </summary>
        <p>JSON 格式化工具是一款免費的線上開發者工具，可將壓縮或難以閱讀的 JSON 資料即時美化成縮排清晰的格式。支援語法高亮、錯誤驗證與自動修復，讓開發者能快速定位 JSON 語法問題。</p>
        <p>本工具支援帶有 <code>//</code> 與 <code>/* */</code> 註解的 JSON5 格式，會自動移除註解後進行標準化解析。同時提供樹狀結構檢視模式，方便瀏覽深度巢狀的 JSON
            物件與陣列。無論是 API 回應、設定檔，還是資料庫匯出，皆可直接貼入使用。所有資料均在瀏覽器本地處理，不會上傳至任何伺服器，確保資料安全與隱私。</p>
        <p><strong>主要功能：</strong>JSON 美化格式化、JSON 壓縮、語法錯誤驗證與提示、帶註解 JSON 支援、樹狀結構檢視、一鍵複製輸出結果。</p>
        <nav aria-label="相關工具">
            <span>其他工具：</span>
            <a href="/tool/markdown-tool">Markdown 即時預覽編輯器</a>、
            <a href="/tool/diff-viewer">文字差異比較工具</a>、
            <a href="/tool/password-generator">強密碼產生器</a>、
            <a href="/tool/document-viewer">線上文檔檢視器</a>、
            <a href="/tool/toon-converter">TOON 格式轉換器</a>
        </nav>
    </details>
</template>