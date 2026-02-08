import type { MenuItem, MenuCategory } from '../types/menu'

/**
 * 菜單類別定義
 */
export const menuCategories: MenuCategory[] = [
    {
        id: 'text-tools',
        label: '文本工具',
        icon: 'bi-file-text',
    },
    {
        id: 'converters',
        label: '轉換器',
        icon: 'bi-arrow-left-right',
    },
    {
        id: 'generators',
        label: '生成器',
        icon: 'bi-sparkles',
    },
    {
        id: 'viewers',
        label: '檢視工具',
        icon: 'bi-eye',
    },
]

/**
 * 菜單項定義
 * 支持搜尋、別名、描述
 */
export const menuItems: MenuItem[] = [
    {
        id: 'json-tool',
        label: 'JSON 工具',
        category: 'text-tools',
        icon: 'bi-braces',
        route: '/tool/json-tool',
        aliases: ['json', 'parse', '格式化', 'format', 'validate', 'schema'],
        description: '快速解析、格式化、驗證 JSON 資料',
    },
    {
        id: 'markdown-tool',
        label: 'Markdown 編輯',
        category: 'text-tools',
        icon: 'bi-markdown',
        route: '/tool/markdown-tool',
        aliases: ['md', 'markdown', '編輯', 'preview', '預覽'],
        description: '編輯並即時預覽 Markdown 文件',
    },
    {
        id: 'toon-converter',
        label: 'TOON 轉換',
        category: 'converters',
        icon: 'bi-arrow-left-right',
        route: '/tool/toon-converter',
        aliases: ['toon', '轉換', 'convert'],
        description: 'TOON 格式轉換工具',
    },
    {
        id: 'password-generator',
        label: '密碼產生器',
        category: 'generators',
        icon: 'bi-shield-lock',
        route: '/tool/password-generator',
        aliases: ['pwd', 'password', '密碼', '產生', 'generate'],
        description: '生成強而有力的隨機密碼',
    },
    {
        id: 'diff-viewer',
        label: 'Diff 檢視',
        category: 'viewers',
        icon: 'bi-file-diff',
        route: '/tool/diff-viewer',
        aliases: ['diff', '對比', 'compare', '比較'],
        description: '比較兩個文本的差異',
    },
    {
        id: 'document-viewer',
        label: '文檔檢視',
        category: 'viewers',
        icon: 'bi-file-text',
        route: '/tool/document-viewer',
        aliases: ['doc', 'document', 'viewer', '文檔'],
        description: '查看和預覽各種文檔格式',
    },
]

/**
 * 根據 ID 獲取菜單項
 */
export function getMenuItemById(id: string): MenuItem | undefined {
    return menuItems.find((item) => item.id === id)
}

/**
 * 根據類別 ID 獲取菜單項
 */
export function getMenuItemsByCategory(categoryId: string): MenuItem[] {
    return menuItems.filter((item) => item.category === categoryId)
}

/**
 * 搜尋菜單項
 * 支持名稱、別名、描述模糊搜尋
 */
export function searchMenuItems(query: string): MenuItem[] {
    const lowercaseQuery = query.toLowerCase().trim()
    if (!lowercaseQuery) return menuItems

    return menuItems.filter((item) => {
        // 檢查菜單名稱
        if (item.label.toLowerCase().includes(lowercaseQuery)) return true

        // 檢查別名
        if (item.aliases.some((alias) => alias.toLowerCase().includes(lowercaseQuery))) return true

        // 檢查描述
        if (item.description.toLowerCase().includes(lowercaseQuery)) return true

        return false
    })
}
