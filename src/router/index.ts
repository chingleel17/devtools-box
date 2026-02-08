import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 導入頁面組件
import JsonTool from '../pages/JsonTool.vue'
import MarkdownTool from '../pages/MarkdownTool.vue'
import ToonTool from '../pages/ToonTool.vue'
import PasswordGenerator from '../pages/PasswordGenerator.vue'
import DiffViewer from '../pages/DiffViewer.vue'
import DocumentViewer from '../pages/DocumentViewer.vue'

// 擴展 RouteMeta 類型
declare module 'vue-router' {
    interface RouteMeta {
        title?: string
        toolId?: string
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/tool/json-tool',
    },
    {
        path: '/tool/json-tool',
        name: 'json-tool',
        component: JsonTool,
        meta: {
            toolId: 'json-tool',
            title: 'JSON 工具',
        },
    },
    {
        path: '/tool/markdown-tool',
        name: 'markdown-tool',
        component: MarkdownTool,
        meta: {
            toolId: 'markdown-tool',
            title: 'Markdown 編輯',
        },
    },
    {
        path: '/tool/toon-converter',
        name: 'toon-converter',
        component: ToonTool,
        meta: {
            toolId: 'toon-converter',
            title: 'TOON 轉換',
        },
    },
    {
        path: '/tool/password-generator',
        name: 'password-generator',
        component: PasswordGenerator,
        meta: {
            toolId: 'password-generator',
            title: '密碼產生器',
        },
    },
    {
        path: '/tool/diff-viewer',
        name: 'diff-viewer',
        component: DiffViewer,
        meta: {
            toolId: 'diff-viewer',
            title: 'Diff 檢視',
        },
    },
    {
        path: '/tool/document-viewer',
        name: 'document-viewer',
        component: DocumentViewer,
        meta: {
            toolId: 'document-viewer',
            title: '文檔檢視',
        },
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 使用路由後置鉤子更新頁面標題
router.afterEach((to) => {
    const title = to.meta.title ? `${to.meta.title} - 開發者工具箱` : '開發者工具箱'
    document.title = title
})
