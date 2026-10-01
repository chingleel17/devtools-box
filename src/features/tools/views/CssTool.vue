<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref } from 'vue'
import ConvertButton from '../../../components/ConvertButton.vue'
import CopyButton from '../../../components/CopyButton.vue'
import LineNumbersEditor from '../../../components/LineNumbersEditor.vue'
import ResizableSplitPane from '../../../components/ResizableSplitPane.vue'
import ToolWrapper from '../../../components/ToolWrapper.vue'
import { useLocalStorage } from '../../../composables/useLocalStorage'
import { useOutputSelectAll } from '../../../composables/useOutputSelectAll'
import { formatCSS, minifyCSS } from '../../../utils/css-utils'

const cssInput = useLocalStorage('css-tool-input', '')
const cssOutput = ref('')
const formattedCSS = ref('')
const isMinified = ref(false)
const isAllFolded = ref(false)
const splitRatio = ref(50)
const inputEditor = ref<InstanceType<typeof LineNumbersEditor> | null>(null)
const outputEditor = ref<InstanceType<typeof LineNumbersEditor> | null>(null)
const outputWrapper = ref<HTMLElement | null>(null)
const { handleOutputKeydown } = useOutputSelectAll(outputWrapper)

function processCSS(): void {
    if (!cssInput.value.trim()) {
        Swal.fire({
            icon: 'warning',
            title: '請先輸入 CSS',
            toast: true,
            position: 'center',
            timer: 2000,
            showConfirmButton: false,
        })
        return
    }

    formattedCSS.value = formatCSS(cssInput.value)
    cssInput.value = formattedCSS.value
    cssOutput.value = formattedCSS.value
    isMinified.value = false
}

function toggleMinify(): void {
    if (!cssOutput.value) {
        Swal.fire({
            icon: 'warning',
            title: '請先格式化 CSS',
            toast: true,
            position: 'center',
            timer: 2000,
            showConfirmButton: false,
        })
        return
    }

    isMinified.value = !isMinified.value
    cssOutput.value = isMinified.value ? minifyCSS(formattedCSS.value) : formattedCSS.value
}

function toggleFoldAll(): void {
    if (isAllFolded.value) {
        inputEditor.value?.unfoldAll()
        outputEditor.value?.unfoldAll()
    } else {
        inputEditor.value?.foldAll()
        outputEditor.value?.foldAll()
    }
    isAllFolded.value = !isAllFolded.value
    Swal.fire({
        icon: 'info',
        title: isAllFolded.value ? '已收折所有區塊' : '已展開所有區塊',
        toast: true,
        position: 'center',
        timer: 1500,
        showConfirmButton: false,
    })
}

function clearCSS(): void {
    cssInput.value = ''
    cssOutput.value = ''
    formattedCSS.value = ''
    isMinified.value = false
    isAllFolded.value = false
}
</script>

<template>
    <ToolWrapper title="CSS 工具" icon="bi-filetype-css"
        description="格式化、美化與壓縮 CSS。所有操作都在瀏覽器本機進行。">
        <div class="position-relative h-100">
            <ResizableSplitPane v-model="splitRatio" :min-size="300">
                <template #first>
                    <div class="input-section d-flex flex-column h-100 pe-2">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="section-title mb-0 d-flex align-items-center">
                                <i class="bi bi-pencil-square me-2"></i>
                                輸入 CSS
                            </h6>
                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-sm btn-outline-secondary" @click="toggleFoldAll"
                                    :title="isAllFolded ? '展開所有' : '收折所有'">
                                    <i class="bi" :class="isAllFolded ? 'bi-arrows-expand' : 'bi-arrows-collapse'"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" @click="clearCSS" title="清除">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex-grow-1 min-h-0">
                            <LineNumbersEditor ref="inputEditor" v-model="cssInput" language="css"
                                placeholder="在這裡貼上 CSS..." />
                        </div>
                    </div>
                </template>

                <template #second>
                    <div class="output-section d-flex flex-column h-100 ps-2">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="section-title mb-0 d-flex align-items-center">
                                <i class="bi bi-file-code me-2"></i>
                                輸出
                            </h6>
                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-sm btn-outline-secondary" @click="toggleMinify" title="壓縮/展開">
                                    <i class="bi" :class="isMinified ? 'bi-arrows-angle-expand' : 'bi-arrows-angle-contract'"></i>
                                    {{ isMinified ? '展開' : '壓縮' }}
                                </button>
                                <CopyButton v-show="cssOutput" :text="() => cssOutput" copiedText="已複製"
                                    btnClass="btn-sm btn-outline-success" effect="firework" />
                            </div>
                        </div>
                        <div ref="outputWrapper"
                            class="modern-output-wrapper overflow-hidden flex-grow-1 min-h-0 output-container"
                            style="box-shadow: var(--shadow-sm); max-width: 100%; min-width: 0;" tabindex="0"
                            @keydown="handleOutputKeydown">
                            <LineNumbersEditor ref="outputEditor" v-model="cssOutput" language="css" :readonly="true"
                                :showLineNumbers="true" class="h-100 output-editor" />
                        </div>
                    </div>
                </template>
            </ResizableSplitPane>

            <ConvertButton class="position-absolute top-50 translate-middle" style="z-index: 100;"
                :style="{ left: `${splitRatio}%` }" @click="processCSS" title="格式化 CSS" />
        </div>
    </ToolWrapper>
</template>

<style scoped>
.input-section,
.output-section {
    min-width: 0;
    max-width: 100%;
}

.output-container {
    border: 1px solid var(--theme-border);
    border-radius: 4px;
    background: var(--theme-bg-card);
}

.output-editor {
    width: 100%;
    max-width: 100%;
}
</style>
