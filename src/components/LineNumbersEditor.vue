<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { Codemirror } from "vue-codemirror"
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { lineNumbers } from '@codemirror/view'
import { foldGutter, foldKeymap, foldAll, unfoldAll } from '@codemirror/language'
import { keymap } from '@codemirror/view'
import { Compartment } from '@codemirror/state'

const props = withDefaults(defineProps<{
  modelValue: string,
  placeholder?: string,
  readonly?: boolean,
  autofocus?: boolean,
  showLineNumbers?: boolean,
  enableFolding?: boolean,
}>(), {
  placeholder: '請輸入 JSON...',
  readonly: false,
  autofocus: false,
  showLineNumbers: true,
  enableFolding: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'input', value: string): void,
  (e: 'focus'): void,
  (e: 'blur'): void,
  (e: 'scroll', event: Event): void,
}>()

// theme 動態決定
const theme = ref<'light' | 'dark' | 'terminal'>('light')
const editorRef = ref()
const cmView = ref<any>(null)
const value = ref(props.modelValue)
const themeCompartment = new Compartment()

function getThemeFromDom(): 'light' | 'dark' | 'terminal' {
  const fromAttr = document.documentElement.getAttribute('data-theme')
  if (fromAttr === 'dark' || fromAttr === 'terminal') return fromAttr
  return 'light'
}

// 獲取主題配置
function getThemeExtension() {
  if (theme.value === 'dark') return oneDark
  if (theme.value === 'terminal') {
    return EditorView.theme({
      '&.cm-editor': {
        background: '#0d1117',
        color: '#00ff41',
      },
      '.cm-content': {
        color: '#00ff41',
      },
      '.cm-line': {
        color: '#00ff41',
      },
      '.cm-gutters': {
        background: '#0a0e14',
        color: '#008f11',
        border: 'none'
      },
      '.cm-activeLine': {
        background: '#161b22'
      },
      '.cm-activeLineGutter': {
        background: '#161b22'
      },
      '.cm-cursor': {
        borderLeftColor: '#00ff41'
      },
      '.cm-selectionBackground': {
        background: '#003b00'
      }
    }, { dark: true })
  }
  return []
}

// theme 監聽 <html data-theme>
function syncTheme() {
  theme.value = getThemeFromDom()
}

const obs = new MutationObserver(syncTheme)

onMounted(() => {
  initExtensions()
  syncTheme()
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})

onBeforeUnmount(() => obs.disconnect())

// 使用 shallowRef 存儲 extensions，確保不會因響應式而重新創建
const extensions = shallowRef<any[]>([])

// 初始化 extensions
function initExtensions() {
  const ext = [
    json(),
    EditorView.lineWrapping,
    themeCompartment.of(getThemeExtension()),
    EditorView.updateListener.of((update: any) => {
      if (update.docChanged) {
        const newValue = update.state.doc.toString()
        emit('update:modelValue', newValue)
        emit('input', newValue)
      }
      if (update.focusChanged) {
        if (update.view.hasFocus) emit('focus')
        else emit('blur')
      }
    }),
  ]

  // 根據 props 添加行號和折疊功能
  if (props.showLineNumbers) {
    ext.push(lineNumbers())
  }

  if (props.enableFolding) {
    // ext.push(foldGutter())
    // ext.push(keymap.of(foldKeymap))
  }

  extensions.value = ext
}

watch(() => props.modelValue, v => {
  if (v !== value.value) value.value = v
})

watch(value, (val) => {
  if (val !== props.modelValue) emit('update:modelValue', val)
})

// 處理編輯器就緒事件
function handleReady(payload: any) {
  cmView.value = payload.view
}

// 更新主題
function updateTheme() {
  if (cmView.value) {
    cmView.value.dispatch({
      effects: themeCompartment.reconfigure(getThemeExtension())
    })
  }
}

// 監聽主題變化
watch(theme, () => {
  updateTheme()
})

// 暴露方法給父元件
defineExpose({
  focus: () => cmView.value?.focus(),
  getValue: () => value.value,
  setValue: (newValue: string) => { value.value = newValue },
  foldAll: () => {
    if (cmView.value) {
      foldAll(cmView.value)
      return true
    }
    return false
  },
  unfoldAll: () => {
    if (cmView.value) {
      unfoldAll(cmView.value)
      return true
    }
    return false
  }
})
</script>

<template>
  <div class="cm-wrapper">
    <Codemirror ref="editorRef" v-model="value" :placeholder="placeholder" :autofocus="autofocus" :disabled="readonly"
      :style="{ height: '100%', width: '100%' }" :extensions="extensions" @ready="handleReady" />
  </div>
</template>

<style scoped>
.cm-wrapper {
  height: 100%;
  width: 100%;
  min-width: 0;
  min-height: 0;
  border: 1px solid var(--theme-border);
  background: var(--theme-bg-card);
  font-size: 14px;
  line-height: 1.6;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

:deep(.cm-editor) {
  height: 100% !important;
  min-height: 0;
  background: transparent;
  font-family: 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 14px;
}

:deep(.cm-content) {
  white-space: pre-wrap !important;
  word-break: break-all !important;
  padding: 12px 16px;
}

:deep(.cm-gutters) {
  border-right: 1px solid var(--theme-border);
  background: var(--theme-bg-solid, #f8f9fa);
  font-family: 'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
}

:deep(.cm-lineNumbers) {
  color: var(--theme-text-muted, #6c757d);
}

:deep(.cm-activeLine) {
  background: var(--theme-active-bg, rgba(0, 0, 0, 0.05)) !important;
}

:deep(.cm-activeLineGutter) {
  background: var(--theme-active-bg, rgba(0, 0, 0, 0.05)) !important;
}

:deep(.cm-placeholder) {
  color: var(--theme-text-muted, #6c757d);
  opacity: 0.7;
}

/* JSON 語法高亮樣式 */
:deep(.ͼ1) {
  color: var(--theme-text, #212529);
}

:deep(.ͼ2) {
  color: #005cc5;
}

/* property name */
:deep(.ͼ3) {
  color: #032f62;
}

/* string */
:deep(.ͼ4) {
  color: #005cc5;
}

/* number */
:deep(.ͼ5) {
  color: #d73a49;
}

/* bool/null */
:deep(.ͼ6) {
  color: #6f42c1;
}

/* brackets */

/* Dark theme 語法高亮 */
[data-theme="dark"] :deep(.ͼ1) {
  color: #e6edf3;
}

[data-theme="dark"] :deep(.ͼ2) {
  color: #7ee787;
}

[data-theme="dark"] :deep(.ͼ3) {
  color: #a5d6ff;
}

[data-theme="dark"] :deep(.ͼ4) {
  color: #79c0ff;
}

[data-theme="dark"] :deep(.ͼ5) {
  color: #ff7b72;
}

[data-theme="dark"] :deep(.ͼ6) {
  color: #d2a8ff;
}

/* Terminal theme 語法高亮 */
[data-theme="terminal"] :deep(.ͼ1) {
  color: #00ff41;
}

[data-theme="terminal"] :deep(.ͼ2) {
  color: #00ff41;
}

[data-theme="terminal"] :deep(.ͼ3) {
  color: #00cc33;
}

[data-theme="terminal"] :deep(.ͼ4) {
  color: #00ff41;
}

[data-theme="terminal"] :deep(.ͼ5) {
  color: #00ff41;
}

[data-theme="terminal"] :deep(.ͼ6) {
  color: #00aa22;
}
</style>
