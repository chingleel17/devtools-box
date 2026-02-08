/**
 * 菜單項類型定義
 */
export interface MenuItem {
    id: string
    label: string
    category: string
    icon: string
    route: string
    aliases: string[]
    description: string
}

/**
 * 菜單類別類型定義
 */
export interface MenuCategory {
    id: string
    label: string
    icon?: string
}
