<script setup lang="ts">
import DocumentViewerPage from '../../features/tools/views/DocumentViewer.vue'

const pageUrl = 'https://markdown-json-viewer.pages.dev/tool/document-viewer'

useSeoMeta({
    title: '線上文檔檢視器 - 免費支援 Markdown 等多種格式即時預覽渲染 | 開發者工具箱',
    description: '免費線上文檔檢視器，支援 Markdown、純文字等多種格式即時預覽與渲染，無需安裝任何軟體，直接在瀏覽器中快速查看文件內容，方便快捷。',
    ogTitle: '線上文檔檢視器 - 免費支援 Markdown 等多種格式即時預覽渲染',
    ogDescription: '免費線上文檔檢視器，支援 Markdown、純文字等格式即時預覽與渲染，無需安裝任何軟體，直接在瀏覽器中查看。',
    ogUrl: pageUrl,
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: '線上文檔檢視器 - 免費支援 Markdown 等多種格式即時預覽渲染',
    twitterDescription: '免費線上文檔檢視器，支援 Markdown 等多種格式即時預覽，無需安裝任何軟體。',
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
                        name: '線上文檔檢視器',
                        description: '免費線上文檔檢視器，支援 Markdown、純文字等格式即時預覽與渲染，無需安裝任何軟體。',
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
                            knowsAbout: ['Documentation', 'Markdown', 'GitHub README', 'Technical Documentation', 'Web Development'],
                            url: 'https://markdown-json-viewer.pages.dev',
                            description: 'YC.L 熱衷於技術文件的撰寫與閱讀體驗優化，開發線上文檔檢視器以提供輕量快速的文件預覽方案。',
                            sameAs: ['https://github.com/chingleel17'],
                        },
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
                    },
                    {
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: '文檔檢視器支援哪些格式？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '支援 Markdown (.md)、純文字 (.txt) 等常見文件格式，即時渲染預覽，無需額外安裝軟體。',
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
    <h1 class="visually-hidden">線上文檔檢視器 - 支援多種格式預覽</h1>
    <DocumentViewerPage />
    <details class="tool-info-section container-fluid mt-2 mb-2 px-3"
        style="font-size: 0.8rem; color: var(--theme-text-muted, #6c757d);">
        <summary style="font-size: 0.9rem; font-weight: 600; cursor: pointer; user-select: none;">關於線上文檔檢視器</summary>
        <p>線上文檔檢視器支援透過 URL 載入並預覽多種常見文件格式，無需下載或安裝任何軟體。支援 Markdown（.md）、純文字（.txt）、HTML 等格式，適合快速預覽 GitHub
            README、技術文件或部落格草稿。</p>
        <p>輸入任意公開可訪問的文件 URL，工具會自動抓取內容並在瀏覽器中渲染預覽。Markdown 文件支援完整的 GFM
            語法渲染，包含表格、程式碼高亮與任務清單。本工具特別適合需要在不同裝置上快速瀏覽文件的使用者，作為輕量級的雲端文件閱讀器。所有操作均在前端完成，保護隱私。</p>
        <p><strong>主要功能：</strong>URL 遠端文件載入、Markdown 格式渲染、HTML 預覽、純文字顯示、輕量快速、跨裝置相容。</p>
        <nav aria-label="相關工具">
            <span>其他工具：</span>
            <a href="/tool/json-tool">JSON 格式化工具</a>、
            <a href="/tool/markdown-tool">Markdown 即時預覽編輯器</a>、
            <a href="/tool/diff-viewer">文字差異比較工具</a>、
            <a href="/tool/password-generator">強密碼產生器</a>、
            <a href="/tool/toon-converter">TOON 格式轉換器</a>
        </nav>
    </details>
</template>