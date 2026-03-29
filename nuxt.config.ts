export default defineNuxtConfig({
    srcDir: 'src/',
    ssr: true,
    nitro: {
        preset: "cloudflare-pages",
    },
    css: ['~/assets/styles/main.css'],
    app: {
        head: {
            htmlAttrs: {
                lang: 'zh-TW',
            },
            title: '開發者工具箱 | DevTools Box',
            meta: [
                {
                    name: 'description',
                    content: '現代化開發者工具箱 - 線上 JSON 格式化/驗證、Markdown 即時預覽、文字差異比較、密碼產生器等實用工具',
                },
                { property: 'og:site_name', content: '開發者工具箱 DevTools Box' },
                { property: 'og:type', content: 'website' },
                { property: 'og:image', content: 'https://markdown-json-viewer.pages.dev/toolbox_favicon_v4.svg' },
                { property: 'og:image:alt', content: '開發者工具箱 - 免費線上 JSON 格式化、Markdown 預覽等開發工具' },
                { property: 'og:url', content: 'https://markdown-json-viewer.pages.dev' },
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:site', content: '@devtools_box' },
                { name: 'author', content: 'YC.L' },
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
                    crossorigin: 'anonymous',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css',
                    media: '(prefers-color-scheme: light)',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css',
                    media: '(prefers-color-scheme: dark)',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: '',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
                },
                {
                    rel: 'icon',
                    type: 'image/svg+xml',
                    href: '/toolbox_favicon_v4.svg',
                },
            ],
        },
    }
})