<script setup lang="ts">
const props = defineProps<{
    error: {
        statusCode: number
        statusMessage?: string
        message?: string
    }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div class="error-page">
        <div class="error-container">
            <div class="error-code-wrap">
                <span class="error-code">{{ error.statusCode }}</span>
            </div>
            <h1 class="error-title">
                {{ error.statusCode === 404 ? '找不到頁面' : '發生錯誤' }}
            </h1>
            <p class="error-message">
                {{ error.statusCode === 404
                    ? '您輸入的網址不存在，請確認後再試。'
                    : (error.statusMessage || error.message || '發生未知錯誤，請重新整理後再試。') }}
            </p>
            <button class="back-btn" @click="handleError">
                <i class="bi bi-house"></i>
                回到首頁
            </button>
        </div>
    </div>
</template>

<style>
/* 使用全域樣式，確保錯誤頁有基礎樣式 */
.error-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--theme-bg-gradient, #f5f5f5);
    font-family: 'JetBrains Mono', 'Inter', monospace, sans-serif;
    padding: 2rem;
}

.error-container {
    text-align: center;
    max-width: 480px;
}

.error-code-wrap {
    margin-bottom: 1.5rem;
}

.error-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(5rem, 20vw, 9rem);
    font-weight: 700;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 2px var(--theme-accent, #0969da);
    letter-spacing: -0.04em;
    display: block;
}

.error-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--theme-text, #24292f);
    margin: 0 0 0.75rem;
}

.error-message {
    font-size: 0.9rem;
    color: var(--theme-text-muted, #57606a);
    line-height: 1.7;
    margin: 0 0 2rem;
    font-family: 'Inter', sans-serif;
}

.back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.5rem;
    background: var(--theme-accent, #0969da);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.15s;
    text-decoration: none;
}

.back-btn:hover {
    opacity: 0.88;
    transform: translateY(-1px);
}
</style>
