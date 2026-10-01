# 開發者工具箱 | DevTools Box

> 免費使用的瀏覽器開發工具集合，快速整理、轉換與檢視日常開發資料。

<p>
  <a href="https://github.com/chingleel17/devtools-box/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/chingleel17/devtools-box/ci.yml?branch=develop&amp;style=for-the-badge&amp;label=CI" alt="CI status"></a>
  <img src="https://img.shields.io/badge/version-1.0.0-2563eb?style=for-the-badge" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/platform-Web-475569?style=for-the-badge" alt="Platform Web">
  <img src="https://img.shields.io/badge/license-All%20rights%20reserved-16a34a?style=for-the-badge" alt="All rights reserved">
  <img src="https://img.shields.io/badge/stack-Nuxt%203%20%2B%20Vue%203%20%2B%20TypeScript%20%2B%20Bun-f97316?style=for-the-badge" alt="Nuxt 3, Vue 3, TypeScript, Bun">
</p>

提供 JSON、CSS、Markdown、TOON、Diff、密碼產生與 RAG Document 檢視工具，適合需要快速處理開發資料、不想另外安裝桌面工具的使用者。可直接使用線上版，也能在本機啟動開發環境。

**[立即免費使用線上版](https://markdown-json-viewer.pages.dev)**

## 功能特色

- **JSON 工具**：格式化、驗證、壓縮與修復 JSON，支援註解、JSON Schema、語法高亮及樹狀檢視。
- **CSS 工具**：格式化、美化與壓縮 CSS，提供具語法高亮的輸入與輸出編輯區。
- **Markdown 編輯器**：即時預覽 Markdown，支援 Mermaid 圖表、目錄、錨點跳轉與編輯器同步捲動。
- **TOON 轉換器**：雙向轉換 JSON 與 Token-Oriented Object Notation（TOON），顯示估算 Token 數與檔案大小差異。
- **密碼產生器**：自訂長度、字元種類、產生數量，以及純文字、Hex 或 Base64 輸出格式。
- **Diff 檢視器**：比較兩段文字，提供並排與統一檢視、語言偵測、語法高亮及同步捲動。
- **Document 檢視器**：載入 RAG Document JSON 陣列，搜尋 `pageContent`，並檢視 chunk 內容與 metadata。
- **主題與工作狀態**：提供亮色、暗色與終端機主題；部分工具輸入和偏好設定會保存在目前瀏覽器。

## 工具一覽

| 工具 | 適合用途 | 主要功能 |
| --- | --- | --- |
| JSON 工具 | 檢查與整理 JSON 資料 | 格式化、驗證、壓縮、修復、Schema、樹狀檢視 |
| CSS 工具 | 整理 CSS 樣式 | 格式化、美化、壓縮 |
| Markdown 編輯器 | 編寫技術文件 | 即時預覽、Mermaid、目錄、同步捲動 |
| TOON 轉換器 | 轉換 LLM 使用的結構化資料 | JSON 與 TOON 雙向轉換、Token 與檔案大小估算 |
| 密碼產生器 | 產生自訂格式的密碼 | 長度、字元類型、數量與輸出編碼設定 |
| Diff 檢視器 | 檢查文字或程式碼差異 | 並排／統一檢視、語法高亮、語言偵測 |
| Document 檢視器 | 檢視 RAG chunk 資料 | 載入 JSON、搜尋內容、檢視 metadata |

## 快速開始

### 使用 Bun（建議）

請先安裝 Bun，再於專案目錄執行：

```bash
bun install
bun run dev
```

開啟終端機顯示的本機網址，即可使用工具。

### 使用 npm

npm 安裝方式需使用 Node.js 22.x：

```bash
npm ci
npm run dev
```

## 資料與隱私

工具的解析、格式化、轉換與比較作業在瀏覽器端執行，專案未設定自有應用程式後端。部分工具會將輸入資料或偏好設定保存在目前瀏覽器的 `localStorage`；清除網站資料即可移除這些儲存內容。

頁面會從 jsDelivr 載入 Bootstrap、圖示與程式碼高亮樣式，並從 Google Fonts 載入字型。這些外部請求用於載入頁面資源，工具輸入不會隨這些資源請求傳送。

## 技術棧

- **前端**：Nuxt 3、Vue 3、TypeScript
- **套件管理**：建議使用 Bun（`bun.lock`），亦支援 npm（`package-lock.json`）
- **介面與編輯器**：Bootstrap 5、Bootstrap Icons、CodeMirror、highlight.js
- **內容處理**：Marked、Mermaid、Diff、`@toon-format/toon`
- **通知**：SweetAlert2

## 專案結構

```text
src/
├── components/             # 共用編輯器、按鈕、側邊欄與版面元件
├── composables/            # 本機儲存、同步捲動與搜尋等重用邏輯
├── config/                 # 工具選單設定
├── features/tools/views/   # 各工具的頁面元件
├── layouts/                # Nuxt 共用版面
├── pages/                  # Nuxt 檔案式路由
├── types/                  # TypeScript 型別
└── utils/                  # JSON、TOON 與 CSS 工具邏輯
```

## 開發與驗證

使用 Bun 建置並產生靜態網站：

```bash
bun run build
bun run preview
```

npm 亦可執行：

```bash
npm run build
npm run preview
```

目前未設定自動化測試框架。GitHub Actions 會在 `develop` 分支推送時執行 `npm ci` 與 `npm run build`，詳見 [CI 工作流程](.github/workflows/ci.yml)。

## 授權

Copyright © 2025 YC.L. All rights reserved.
