<script setup lang="ts">
import DocumentViewerPage from '../../features/tools/views/DocumentViewer.vue'

const pageUrl = 'https://markdown-json-viewer.pages.dev/tool/document-viewer'

useSeoMeta({
    title: '線上文檔檢視器 - 免費瀏覽器端 RAG Document Chunks JSON 資料集檢視與搜尋工具 | 開發者工具箱',
    description: '免費線上文檔檢視器，專為載入並檢視 RAG Document Chunks JSON 資料集而設計，支援 pageContent 搜尋與 metadata 瀏覽，無需安裝任何軟體，直接在瀏覽器中快速查看。',
    ogTitle: '線上文檔檢視器 - 免費 RAG Document Chunks JSON 資料集檢視工具',
    ogDescription: '免費線上文檔檢視器，載入並搜尋 RAG Document Chunks JSON 資料集，支援 pageContent 搜尋與 metadata 瀏覽。',
    ogUrl: pageUrl,
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: '線上文檔檢視器 - 免費 RAG Document Chunks JSON 資料集檢視工具',
    twitterDescription: '免費線上文檔檢視器，載入並搜尋 RAG Document Chunks JSON 資料集，支援 pageContent 搜尋與 metadata 瀏覽。',
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
                        description: '免費線上文檔檢視器，專為載入並檢視 RAG Document Chunks JSON 資料集而設計，支援 pageContent 搜尋與 metadata 瀏覽，無需安裝任何軟體。',
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
                            knowsAbout: ['RAG', 'Document Chunks', 'JSON', 'LLM', 'Web Development'],
                            url: 'https://markdown-json-viewer.pages.dev',
                            description: 'YC.L 開發線上文檔檢視器，提供 RAG Document Chunks JSON 資料集的瀏覽器端快速檢視與搜尋方案。',
                            sameAs: ['https://github.com/chingleel17'],
                        },
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
                    },
                    {
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: '文檔檢視器支援哪些資料格式？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '本工具專為載入 RAG Document Chunks JSON 資料集設計，支援包含 pageContent 與 metadata 欄位的 JSON 格式，可在瀏覽器中直接搜尋與瀏覽各 chunk 的內容與元資料。',
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
    <h1 class="visually-hidden">線上文檔檢視器 - RAG Document Chunks JSON 資料集檢視工具</h1>
    <DocumentViewerPage />
    <details class="tool-info-section container-fluid mt-2 mb-2 px-3"
        style="font-size: 0.8rem; color: var(--theme-text-muted, #6c757d);">
        <summary style="font-size: 0.9rem; font-weight: 600; cursor: pointer; user-select: none;">關於線上文檔檢視器</summary>
        <p>線上文檔檢視器專為載入並檢視 RAG（Retrieval-Augmented Generation）Document Chunks JSON 資料集而設計，無需下載或安裝任何軟體，直接在瀏覽器中快速查看各 chunk 的 pageContent 與 metadata 資訊。</p>
        <p>使用者可載入包含 pageContent 與 metadata 欄位的 JSON 格式資料集，工具提供關鍵字搜尋功能以快速定位特定 chunk，並支援逐一選取查看詳細內容。所有操作均在前端完成，資料不會傳送至任何伺服器，保護資料隱私。</p>
        <p><strong>主要功能：</strong>RAG Document Chunks JSON 載入、pageContent 關鍵字搜尋、metadata 瀏覽、chunk 選取與詳細檢視、完全瀏覽器本地運算。</p>
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