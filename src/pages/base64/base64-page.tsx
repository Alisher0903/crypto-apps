import { useState, useCallback } from 'react'

type Mode = 'encode' | 'decode'

const Base64Page = () => {
  const [mode, setMode] = useState<Mode>('encode')

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex mb-6 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/40 p-1 gap-1">
        {(['encode', 'decode'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2.5 text-sm font-semibold tracking-widest uppercase rounded-md transition-all duration-300
              ${
                mode === m
                  ? 'bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
          >
            {m === 'encode' ? '⟶  Encode' : '⟵  Decode'}
          </button>
        ))}
      </div>

      <div key={mode} className="animate-fadeIn">
        <Base64Panel mode={mode} />
      </div>
    </div>
  )
}

const Base64Panel = ({ mode }: { mode: Mode }) => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const isEncode = mode === 'encode'

  const process = useCallback(() => {
    if (!input.trim()) return
    setError('')
    setIsAnimating(true)
    setResult('')

    setTimeout(() => {
      try {
        if (isEncode) {
          const encoded = btoa(unescape(encodeURIComponent(input)))
          setResult(encoded)
        } else {
          const decoded = decodeURIComponent(escape(atob(input.trim())))
          setResult(decoded)
        }
      } catch {
        setError('Invalid Base64 string. Please check your input.')
      }
      setIsAnimating(false)
    }, 300)
  }, [input, isEncode])

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setResult('')
    setError('')
  }

  const handleSwap = () => {
    if (!result) return
    setInput(result)
    setResult('')
    setError('')
  }

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="rounded-xl border border-violet-500/30 bg-zinc-900/60 backdrop-blur overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-violet-500/30 bg-violet-500/5">
          <span className="text-xs tracking-widest uppercase font-semibold text-violet-400">
            {isEncode ? '// input.txt' : '// input.b64'}
          </span>
          <span className="text-zinc-600 text-xs">{input.length} chars</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError('')
          }}
          onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && process()}
          placeholder={isEncode ? 'Enter text to encode...' : 'Paste Base64 string to decode...'}
          rows={4}
          className="w-full bg-transparent px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 resize-none outline-none focus:ring-1 focus:ring-violet-500/30 font-mono leading-relaxed"
        />
      </div>

      {/* Info block */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900/30 text-xs text-zinc-500">
        <span className="text-violet-400 shrink-0 mt-0.5">ℹ</span>
        <span>
          {isEncode
            ? 'Converts text to Base64 format. Supports UTF-8 characters including emoji and special symbols.'
            : 'Decodes Base64 string back to original text. Input must be valid Base64.'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={process}
          disabled={!input.trim() || isAnimating}
          className="flex-1 py-3 rounded-xl font-bold tracking-widest uppercase text-sm bg-violet-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isAnimating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `${isEncode ? '⟶ Encode' : '⟵ Decode'} (Ctrl+Enter)`
          )}
        </button>

        {result && (
          <button
            onClick={handleSwap}
            title="Use result as input"
            className="px-4 py-3 rounded-xl border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 text-sm transition-all duration-200 active:scale-[0.98]"
          >
            ⇄
          </button>
        )}

        <button
          onClick={handleClear}
          className="px-4 py-3 rounded-xl border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 text-sm transition-all duration-200 active:scale-[0.98]"
        >
          ✕
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="animate-fadeIn flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          <span>⚠</span>
          {error}
        </div>
      )}

      {/* Result */}
      {(result || isAnimating) && (
        <div
          className={`rounded-xl border border-violet-500/30 bg-zinc-900/60 backdrop-blur overflow-hidden ${isAnimating ? 'opacity-50' : 'animate-fadeIn'}`}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-violet-500/30 bg-violet-500/5">
            <span className="text-xs tracking-widest uppercase font-semibold text-violet-400">
              {isEncode ? '// output.b64' : '// output.txt'}
            </span>
            <button
              onClick={handleCopy}
              className="text-xs px-2.5 py-1 rounded-md border border-violet-500/30 text-violet-400 hover:bg-zinc-800 transition-colors duration-150"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div className="px-4 py-3 text-sm font-mono leading-relaxed text-zinc-200 break-all min-h-[60px]">
            {isAnimating ? (
              <span className="text-violet-400 animate-pulse">█▌▌█▌▌█ ▌█▌█▌ ▌█...</span>
            ) : (
              <span className="text-violet-400">{result}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Base64Page
