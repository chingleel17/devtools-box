# AGENTS.md — Developer Tools Box

Code intelligence file for agentic coding assistants. Provides project conventions, build setup, and code style guidelines.

---

## 📋 Project Overview

**Name**: markdown-json-viewer-vite
**Type**: Nuxt 3 + TypeScript Frontend Application (SSG)
**Package Manager**: npm
**Node Version**: 22.x
**Build Tool**: Nuxt 3 (Vite + Nitro)

**Purpose**: Modern developer tools including JSON formatter, Markdown viewer, and document viewer with theme switching.

---

## 🛠️ Build & Development Commands

### Setup

```bash
npm install                 # Install dependencies
```

### Development

```bash
npm run dev               # Start Nuxt dev server (http://localhost:3000)
```

### Production

```bash
npm run build             # Generate static site with Nuxt SSG → .output/public
npm run preview           # Preview production build locally
npm run deploy            # npm ci && npm run build (CI command)
```

### Single File Testing

No test runner configured. Project uses direct browser testing during development.
Verify changes with: `npm run dev` and manual browser inspection.

### Type Checking

```bash
npx nuxi typecheck        # Nuxt TypeScript type checking
```

---

## 📁 Project Structure

```
nuxt.config.ts             # Nuxt config (SSG, head, prerender)
src/
├── app.vue                 # Nuxt app entry point
├── assets/
│   └── styles/
│       └── main.css        # Global styles
├── components/             # Shared Vue components
│   ├── TerminalSidebar.vue
│   ├── TerminalMenuList.vue
│   ├── TerminalSearch.vue
│   └── ThemeSwitcher.vue
├── pages/                  # Nuxt file-based routes
│   └── tool/
├── features/
│   └── tools/
│       └── views/          # Reusable page view components
├── layouts/                # Nuxt layouts
│   └── default.vue
├── composables/            # Vue 3 composables
├── config/                 # Configuration files
├── utils/                  # Shared utilities (json-utils, toon-converter)
├── legacy/                 # Legacy non-Nuxt scripts (reference only)
└── types/                  # TypeScript type definitions
```

---

## 📐 Code Style Guidelines

### TypeScript & JavaScript

**Imports**:

- Use ES modules: `import ... from '...'`
- Organize by: external libs → vue/composables → local utils → styles
- Example:
  ```typescript
  import { ref } from "vue";
  import { useTerminalMode } from "~/composables/useTerminalMode";
  import { removeComments } from "~/utils/json-utils";
  import "~/assets/styles/main.css";
  ```

**Type Definitions**:

- Define interfaces/types at file top, above implementations
- Use TypeScript for all `.ts` files; JSDoc for comments on complex logic
- Always specify types (no `any` unless unavoidable, document with comment)
- Example:
  ```typescript
  interface MenuItem {
    id: string;
    label: string;
    category: string;
    icon: string;
    route: string;
    aliases: string[];
    description: string;
  }
  ```

**Function Style**:

- Use arrow functions in modern contexts (composables, event handlers)
- Use named functions for utility functions
- Always specify return type explicitly
- Example:
  ```typescript
  export function removeComments(jsonString: string): string { ... }
  function updateThemeIcon(theme: string): void { ... }
  ```

**Naming Conventions**:

- `camelCase` for variables, functions, properties
- `PascalCase` for interfaces, types, components
- Use descriptive names; avoid abbreviations unless standard
- Boolean properties: prefix with `is`, `has`, `can`, `should`

**Error Handling**:

- Try/catch blocks for JSON parsing and user input
- Display user-friendly error messages (no raw stack traces)
- Log errors to console for debugging; use `error.message` for user display
- Example:
  ```typescript
  try {
    currentJSON = JSON.parse(jsonInput.value);
    jsonStatus.textContent = "✓ 有效";
  } catch (e: any) {
    jsonStatus.textContent = "✗ 無效";
    jsonError.textContent = `錯誤: ${e.message}`;
  }
  ```

**Comments**:

- Use JSDoc for public functions (especially utilities)
- Use inline comments for complex logic (Chinese or English acceptable)
- Preserve original line numbers in processing (important for error reporting)

### Vue Components

**Script Setup**:

- Use `<script setup lang="ts">` syntax (Vue 3 Composition API)
- Prefer composables for reusable logic
- Explicit type annotations on all props/emits
- Example:
  ```vue
  <script setup lang="ts">
  import { ref, computed } from "vue";
  const isCollapsed = ref(false);
  </script>
  ```

**Templates**:

- Use semantic HTML when possible
- Use Bootstrap 5 utility classes for styling
- Use `:class` binding with objects for conditional classes
- Example:
  ```html
  <div class="app-main" :class="{ 'sidebar-collapsed': isCollapsed }"></div>
  ```

**Styling**:

- Use `<style scoped>` to prevent style leakage
- CSS custom properties for themes: `var(--theme-bg-gradient)`, etc.
- Responsive breakpoints: use Bootstrap media queries
- Support light/dark/terminal themes via `data-theme` attribute

### Formatting

**Indentation**: 2 spaces (no tabs)
**Line Length**: No hard limit, but keep readable (aim for ~100 chars where sensible)
**Semicolons**: Optional (project uses mix; maintain consistency in file)
**Quotes**: Single quotes for strings (`'...'`)

---

## 🎨 Theme System

**Theme Attribute**: `html[data-theme]`
**Supported Themes**: `light`, `dark`, `terminal`
**Storage**: `localStorage.getItem('theme')`
**Logic**: `src/components/ThemeSwitcher.vue` and `src/composables/useTerminalMode.ts`
**CSS Variables**: Use `var(--theme-*)` for dynamic theming

---

## 🔄 CI/CD Pipeline

**GitHub Actions** (`.github/workflows/ci.yml`):

1. **Trigger**: Push to `develop` branch
2. **Build Job**: Checkout → Node 22 setup → npm ci → npm run build
3. **Auto-Merge Job**: If build succeeds, auto-merge `develop` → `master`

Deployment to Cloudflare Pages: Deploy `.output/public` (Nuxt SSG output)

---

## ⚠️ Important Notes

- **No Testing Framework**: No jest/vitest configured; manual testing via dev server
- **No Linting**: No ESLint/Prettier enforced (maintain style consistency manually)
- **Comments in JSON**: Project handles comments in JSON (see `removeComments()` in json-utils.ts)
- **Language**: UI supports Chinese; code comments can be Chinese or English
- **Type Safety**: Run `npx nuxi typecheck` before committing; fix all type errors

---

## 🚀 Before Committing

1. Run `npm run build` and ensure no TypeScript errors
2. Test in dev mode: `npm run dev` → verify all features work
3. Check theme switching works (light → dark → terminal → light)
4. Verify no console errors in browser DevTools
5. Ensure imports are organized correctly
