<script setup lang="ts">
import DiffViewerPage from '../../features/tools/views/DiffViewer.vue'

const pageUrl = 'https://markdown-json-viewer.pages.dev/tool/diff-viewer'

useSeoMeta({
    title: '文字差異比較工具 - 免費線上 Diff 高亮顯示程式碼版本差異 | 開發者工具箱',
    description: '免費線上文字差異比較工具，逐行高亮顯示新增、刪除與修改內容。快速比較程式碼、設定檔或文件版本差異，有效提升 Code Review 與合併效率。',
    ogTitle: '文字差異比較工具 - 免費線上 Diff 高亮顯示程式碼版本差異',
    ogDescription: '免費線上文字差異比較工具，逐行高亮顯示新增、刪除與修改內容。快速比較程式碼與文件版本差異，提升 Code Review 效率。',
    ogUrl: pageUrl,
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: '文字差異比較工具 - 免費線上 Diff 高亮顯示程式碼版本差異',
    twitterDescription: '免費線上文字差異比較工具，逐行高亮顯示新增、刪除與修改內容，提升 Code Review 效率。',
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
                        name: '文字差異比較工具',
                        description: '免費線上文字差異比較工具，逐行高亮顯示新增、刪除與修改內容，適合比較程式碼與文件版本差異。',
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
                            knowsAbout: ['Git', 'Code Review', 'Diff Algorithms', 'Version Control', 'Developer Tools'],
                            url: 'https://markdown-json-viewer.pages.dev',
                            description: 'YC.L 具備豐富的 Git 工作流程與 Code Review 實務經驗，專注於開發文字差異比對工具以提升開發流程效率。',
                            sameAs: ['https://github.com/chingleel17'],
                        },
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
                    },
                    {
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: '文字差異比較工具支援哪些格式？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '支援任意純文字格式，包含程式碼、設定檔、JSON、YAML、Markdown 等，以逐行方式比較並高亮顯示差異。',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: '如何使用文字差異比較工具？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '將原始文字貼入左側輸入框，修改後的文字貼入右側輸入框，工具會自動逐行高亮顯示所有差異內容。',
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
    <h1 class="visually-hidden">文字差異比較工具 - 線上 Diff 檢視器</h1>
    <DiffViewerPage />
    <details class="tool-info-section container-fluid mt-2 mb-2 px-3"
        style="font-size: 0.8rem; color: var(--theme-text-muted, #6c757d);">
        <summary style="font-size: 0.9rem; font-weight: 600; cursor: pointer; user-select: none;">關於文字差異比較工具</summary>
        <p>文字差異比較工具（Diff
            Viewer）可即時比對兩段文字或程式碼的差異，以紅色標示刪除行、綠色標示新增行。採用行級別差異演算法，支援側邊並排（Side-by-Side）與統一（Unified）兩種顯示模式，適合程式碼審查、設定檔比對、文件修訂等場景，完全在瀏覽器本地執行，無需安裝任何軟體。
        </p>
        <p><strong>主要功能：</strong>即時 Diff 比對、行級別高亮標示、並排 / 統一模式切換、支援大量文字輸入、完全瀏覽器本地運算。</p>
        <nav aria-label="相關工具">
            <span>其他工具：</span>
            <a href="/tool/json-tool">JSON 格式化工具</a>、
            <a href="/tool/markdown-tool">Markdown 即時預覽編輯器</a>、
            <a href="/tool/password-generator">強密碼產生器</a>、
            <a href="/tool/document-viewer">線上文檔檢視器</a>、
            <a href="/tool/toon-converter">TOON 格式轉換器</a>
        </nav>
    </details>
</template>