<script setup lang="ts">
import PasswordGeneratorPage from '../../features/tools/views/PasswordGenerator.vue'

const pageUrl = 'https://markdown-json-viewer.pages.dev/tool/password-generator'

useSeoMeta({
    title: '強密碼產生器 - 免費線上隨機安全密碼生成，可自訂長度與規則 | 開發者工具箱',
    description: '免費線上強密碼產生器，可自訂密碼長度、大小寫字母、數字與特殊符號組合，一鍵生成高強度隨機密碼，有效提升帳號安全性，防範暴力破解攻擊。',
    ogTitle: '強密碼產生器 - 免費線上隨機安全密碼生成，可自訂長度與規則',
    ogDescription: '免費線上強密碼產生器，自訂密碼長度與字元組合，一鍵生成高強度隨機密碼，提升帳號安全性。',
    ogUrl: pageUrl,
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: '強密碼產生器 - 免費線上隨機安全密碼生成，可自訂長度與規則',
    twitterDescription: '免費線上強密碼產生器，自訂密碼長度與字元組合，一鍵生成高強度隨機密碼，提升帳號安全性。',
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
                        name: '強密碼產生器',
                        description: '免費線上強密碼產生器，自訂密碼長度、包含大小寫字母、數字與特殊符號，一鍵生成高強度隨機密碼。',
                        url: pageUrl,
                        applicationCategory: 'SecurityApplication',
                        operatingSystem: 'All',
                        isAccessibleForFree: true,
                        inLanguage: 'zh-TW',
                        datePublished: '2024-01-01',
                        dateModified: '2025-03-29',
                        author: {
                            '@type': 'Person',
                            name: 'YC.L',
                            jobTitle: 'Full Stack Developer',
                            knowsAbout: ['Cybersecurity', 'Password Security', 'Web Crypto API', 'OWASP', 'Cryptography'],
                            url: 'https://markdown-json-viewer.pages.dev',
                            description: 'YC.L 關注 Web 應用安全實踐，熟悉 Web Crypto API 與密碼學安全隨機數生成原理，致力於推廣正確的密碼安全觀念。',
                            sameAs: ['https://github.com/chingleel17'],
                        },
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
                    },
                    {
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: '產生的密碼安全嗎？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '在支援 Web Crypto API 的現代瀏覽器中，本工具會使用瀏覽器內建的 Crypto API 產生加密強度的隨機數，且密碼僅在本地端生成，不會傳送至伺服器。但在少數不支援 Web Crypto API 的舊版瀏覽器中，將改用一般隨機數產生方式，其隨機性與安全性較低，不建議用於重要帳號與敏感服務的密碼。',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: '建議密碼長度為多少？',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '建議至少 16 字元，並包含大小寫字母、數字及特殊符號，可大幅提升密碼強度，防止暴力破解。',
                                },
                            },
                        ],
                    },
                    {
                        '@type': 'Organization',
                        name: '開發者工具箱',
                        url: 'https://markdown-json-viewer.pages.dev',
                        description: '提供開發者日常使用的免費線上工具集，包含 JSON 格式化、Markdown 編輯、密碼產生等工具。',
                        founder: { '@type': 'Person', name: 'YC.L' },
                    },
                ],
            }),
        },
    ],
})
</script>

<template>
    <h1 class="visually-hidden">強密碼產生器 - 線上隨機密碼生成工具</h1>
    <PasswordGeneratorPage />
    <details class="tool-info-section container-fluid mt-2 mb-2 px-3"
        style="font-size: 0.8rem; color: var(--theme-text-muted, #6c757d);">
        <summary style="font-size: 0.9rem; font-weight: 600; cursor: pointer; user-select: none;">關於強密碼產生器</summary>
        <p>強密碼產生器在支援的瀏覽器環境中，優先使用 Web Crypto API 提供的密碼學安全隨機演算法產生高強度密碼，可自訂密碼長度、字符集（大小寫字母、數字、特殊符號），提升每次產生密碼的隨機性與複雜度，有效降低遭受暴力破解與字典攻擊的風險；在不支援 Web Crypto API 的環境下，則會改用一般隨機演算法，安全性較低，僅建議用於風險較低的情境。</p>
        <p>本工具完全在瀏覽器端執行，所有密碼均在本地生成，不會傳送至任何伺服器，保護使用者隱私。支援一次產生多組密碼供選擇，並提供密碼強度即時評估。生成的密碼可一鍵複製，方便用於帳號註冊、資料庫密碼、API
            金鑰等各種需要強密碼的場景。建議搭配密碼管理器使用以安全儲存。</p>
        <p><strong>主要功能：</strong>密碼學安全隨機生成、可調整密碼長度與字符集、密碼強度評估、批量生成多組密碼、一鍵複製、完全瀏覽器本地運算。</p>
        <nav aria-label="相關工具">
            <span>其他工具：</span>
            <a href="/tool/json-tool">JSON 格式化工具</a>、
            <a href="/tool/markdown-tool">Markdown 即時預覽編輯器</a>、
            <a href="/tool/diff-viewer">文字差異比較工具</a>、
            <a href="/tool/document-viewer">線上文檔檢視器</a>、
            <a href="/tool/toon-converter">TOON 格式轉換器</a>
        </nav>
    </details>
</template>