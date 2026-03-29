<script setup lang="ts">
import MarkdownToolPage from '../../features/tools/views/MarkdownTool.vue'

const pageUrl = 'https://markdown-json-viewer.pages.dev/tool/markdown-tool'

useSeoMeta({
    title: 'Markdown 即時預覽編輯器 - 免費線上所見即所得，支援語法高亮與目錄 | 開發者工具箱',
    description: '免費線上 Markdown 即時預覽編輯器，支援語法高亮、自動目錄導覽、一鍵複製 HTML，以及同步滾動功能。適合撰寫技術文件、README 與部落格文章。',
    ogTitle: 'Markdown 即時預覽編輯器 - 免費線上所見即所得，支援語法高亮與目錄',
    ogDescription: '免費線上 Markdown 編輯器，支援即時預覽、語法高亮、目錄導覽與一鍵複製 HTML。適合撰寫技術文件與部落格文章。',
    ogUrl: pageUrl,
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'Markdown 即時預覽編輯器 - 免費線上所見即所得，支援語法高亮',
    twitterDescription: '免費線上 Markdown 編輯器，支援即時預覽、語法高亮、目錄導覽與一鍵複製 HTML。',
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
                        name: 'Markdown 即時預覽編輯器',
                        description: '免費線上 Markdown 即時預覽編輯器，支援語法高亮、自動目錄、一鍵複製 HTML 與同步滾動。',
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
                            knowsAbout: ['Markdown', 'CommonMark', 'GitHub Flavored Markdown', 'Technical Writing', 'Documentation'],
                            url: 'https://markdown-json-viewer.pages.dev',
                            description: 'YC.L 長期使用 Markdown 撰寫技術文件與開源專案 README，熟悉 CommonMark 與 GFM 規範及各種渲染工具。',
                            sameAs: ['https://github.com/chingleel17'],
                        },
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
                    },
                    {
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'Markdown 編輯器支援哪些語法？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '支援標準 CommonMark 語法，包含標題、粗體/斜體、清單、表格、程式碼區塊、連結與圖片等完整 Markdown 語法。',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: '如何匯出 HTML 格式？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '點擊工具列的「複製 HTML」按鈕，即可將渲染後的 HTML 複製到剪貼板，方便直接使用。',
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
    <h1 class="visually-hidden">Markdown 即時預覽編輯器 - 線上所見即所得</h1>
    <MarkdownToolPage />
    <details class="tool-info-section container-fluid mt-2 mb-2 px-3"
        style="font-size: 0.8rem; color: var(--theme-text-muted, #6c757d);">
        <summary style="font-size: 0.9rem; font-weight: 600; cursor: pointer; user-select: none;">關於 Markdown 即時預覽編輯器
        </summary>
        <p>Markdown 即時預覽編輯器提供左右分割的所見即所得編輯體驗，左側輸入 Markdown 語法，右側即時渲染 HTML 預覽。支援標準 CommonMark
            語法，包含標題、粗體、斜體、清單、表格、程式碼區塊、連結與圖片等所有常用語法。</p>
        <p>本工具內建語法高亮，程式碼區塊支援超過 190 種程式語言的顏色標示。支援 GitHub Flavored
            Markdown（GFM）擴充，包含刪除線、任務清單與表格對齊。編輯器提供行號顯示、自動同步捲動功能，讓使用者能夠輕鬆對比原始碼與預覽結果。適合撰寫技術文件、README、部落格文章與筆記。</p>
        <p><strong>主要功能：</strong>即時 Markdown 渲染、程式碼語法高亮、GFM 擴充支援、行號顯示、同步捲動、目錄（TOC）自動生成、匯出 HTML。</p>
        <nav aria-label="相關工具">
            <span>其他工具：</span>
            <a href="/tool/json-tool">JSON 格式化工具</a>、
            <a href="/tool/diff-viewer">文字差異比較工具</a>、
            <a href="/tool/password-generator">強密碼產生器</a>、
            <a href="/tool/document-viewer">線上文檔檢視器</a>、
            <a href="/tool/toon-converter">TOON 格式轉換器</a>
        </nav>
    </details>
</template>