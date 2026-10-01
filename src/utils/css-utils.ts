type CssToken = {
    kind: 'text' | 'protected' | 'comment' | 'symbol'
    value: string
}

function readQuoted(input: string, start: number): number {
    const quote = input[start]
    let index = start + 1
    while (index < input.length) {
        if (input[index] === '\\') {
            index += 2
        } else if (input[index++] === quote) {
            break
        }
    }
    return index
}

function readGroup(input: string, start: number): number {
    const closing = input[start] === '(' ? ')' : ']'
    const stack = [closing]
    let index = start + 1
    while (index < input.length && stack.length) {
        const char = input[index]
        if (char === '\\') {
            index += 2
        } else if (char === '"' || char === "'") {
            index = readQuoted(input, index)
        } else if (char === '/' && input[index + 1] === '*') {
            const end = input.indexOf('*/', index + 2)
            index = end < 0 ? input.length : end + 2
        } else if (char === '(' || char === '[') {
            stack.push(char === '(' ? ')' : ']')
            index++
        } else if (char === stack[stack.length - 1]) {
            stack.pop()
            index++
        } else {
            index++
        }
    }
    return index
}

function tokenizeCSS(input: string): CssToken[] {
    const tokens: CssToken[] = []
    let text = ''
    const flush = (): void => {
        if (text) tokens.push({ kind: 'text', value: text })
        text = ''
    }

    for (let index = 0; index < input.length;) {
        const char = input[index]
        if (char === '\\') {
            text += input.slice(index, index + 2)
            index += 2
        } else if (char === '/' && input[index + 1] === '*') {
            flush()
            const end = input.indexOf('*/', index + 2)
            const next = end < 0 ? input.length : end + 2
            tokens.push({ kind: 'comment', value: input.slice(index, next) })
            index = next
        } else if (char === '"' || char === "'" || char === '(' || char === '[') {
            flush()
            const next = char === '(' || char === '[' ? readGroup(input, index) : readQuoted(input, index)
            tokens.push({ kind: 'protected', value: input.slice(index, next) })
            index = next
        } else if (char !== undefined && '{};:,'.includes(char)) {
            flush()
            tokens.push({ kind: 'symbol', value: char })
            index++
        } else {
            text += char
            index++
        }
    }
    flush()
    return tokens
}

function stripComments(input: string): string {
    let result = ''
    for (let index = 0; index < input.length;) {
        const char = input[index]
        if (char === '\\') {
            result += input.slice(index, index + 2)
            index += 2
        } else if (char === '"' || char === "'") {
            const next = readQuoted(input, index)
            result += input.slice(index, next)
            index = next
        } else if (char === '/' && input[index + 1] === '*') {
            const end = input.indexOf('*/', index + 2)
            result += ' '
            index = end < 0 ? input.length : end + 2
        } else {
            result += char
            index++
        }
    }
    return result
}

function joinTokens(tokens: CssToken[]): string {
    return tokens.map(token => token.kind === 'text' ? token.value.replace(/\s+/g, ' ') : token.value).join('').trim()
}

/** 將 CSS 規則與宣告整理成兩格縮排，並保留字串、括號內容及註解。 */
export function formatCSS(input: string): string {
    const lines: string[] = []
    const contentAtDepth = [false]
    const pending: CssToken[] = []
    let depth = 0
    const addLine = (value: string): void => {
        lines.push(`${'  '.repeat(depth)}${value}`)
        contentAtDepth[depth] = true
    }
    const flushStatement = (semicolon: boolean): void => {
        const statement = joinTokens(pending)
        if (statement) {
            const colon = pending.findIndex(token => token.kind === 'symbol' && token.value === ':')
            if (colon >= 0 && depth > 0) {
                const property = joinTokens(pending.slice(0, colon))
                const value = joinTokens(pending.slice(colon + 1))
                addLine(`${property}: ${value};`)
            } else {
                addLine(`${statement}${semicolon ? ';' : ''}`)
            }
        }
        pending.length = 0
    }

    for (const token of tokenizeCSS(input)) {
        if (token.kind === 'comment' && !joinTokens(pending)) {
            pending.length = 0
            addLine(token.value)
        } else if (token.kind !== 'symbol') {
            pending.push(token)
        } else if (token.value === '{') {
            const header = joinTokens(pending)
            pending.length = 0
            if (contentAtDepth[depth] && lines[lines.length - 1] !== '') lines.push('')
            addLine(`${header} {`)
            depth++
            contentAtDepth.push(false)
        } else if (token.value === '}') {
            flushStatement(false)
            if (depth > 0) {
                contentAtDepth.pop()
                depth--
            }
            addLine('}')
        } else if (token.value === ';') {
            flushStatement(true)
        } else {
            pending.push(token)
        }
    }
    flushStatement(false)
    return lines.join('\n')
}

/** 以不改動字串與括號內容的規則壓縮 CSS，並移除註解。 */
export function minifyCSS(input: string): string {
    let result = ''
    let trimNext = false
    for (const token of tokenizeCSS(input)) {
        if (token.kind === 'comment') {
            result += ' '
        } else if (token.kind === 'symbol' && '{};,'.includes(token.value)) {
            result = result.trimEnd()
            if (token.value === '}' && result.endsWith(';')) result = result.slice(0, -1)
            result += token.value
            trimNext = true
        } else if (token.kind === 'symbol') {
            result += token.value
            trimNext = true
        } else {
            const value = token.kind === 'text'
                ? token.value.replace(/\s+/g, ' ')
                : token.kind === 'protected' ? stripComments(token.value) : token.value
            result += trimNext ? value.replace(/^\s+/, '') : value
            if (value.trim()) trimNext = false
        }
    }
    return result.trim()
}
