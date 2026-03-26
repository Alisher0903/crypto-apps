import type { Dispatch, SetStateAction } from 'react'

interface CipherPanelProps {
  mode: 'encode' | 'decode'
  inputText: string
  setInputText: Dispatch<SetStateAction<string>>
  shift: number
  setShift: Dispatch<SetStateAction<number>>
  result: string
  isAnimating: boolean
  copied: boolean
  onProcess: () => void
  onCopy: () => void
  onClear: () => void
}

const CipherPanel = ({
  mode,
  inputText,
  setInputText,
  shift,
  setShift,
  result,
  isAnimating,
  copied,
  onProcess,
  onCopy,
  onClear,
}: CipherPanelProps) => {
  const isEncode = mode === 'encode'

  const accentClasses = {
    border: isEncode ? 'border-emerald-500/30' : 'border-cyan-500/30',
    text: isEncode ? 'text-emerald-400' : 'text-cyan-400',
    bg: isEncode ? 'bg-emerald-500' : 'bg-cyan-500',
    shadow: isEncode
      ? 'shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)]'
      : 'shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]',
    ring: isEncode ? 'focus:ring-emerald-500/30' : 'focus:ring-cyan-500/30',
    glow: isEncode ? 'bg-emerald-500/5' : 'bg-cyan-500/5',
    sliderAccent: isEncode ? 'accent-emerald-400' : 'accent-cyan-400',
  }

  return (
    <div className="space-y-4">
      {/* Input */}
      <div
        className={`rounded-xl border ${accentClasses.border} bg-zinc-900/60 backdrop-blur overflow-hidden`}
      >
        <div
          className={`flex items-center justify-between px-4 py-2 border-b ${accentClasses.border} ${accentClasses.glow}`}
        >
          <span className={`text-xs tracking-widest uppercase font-semibold ${accentClasses.text}`}>
            {isEncode ? '// input.txt' : '// cipher.txt'}
          </span>
          <span className="text-zinc-600 text-xs">{inputText.length} chars</span>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && onProcess()}
          placeholder={isEncode ? 'Enter plaintext to encode...' : 'Enter ciphertext to decode...'}
          rows={4}
          className={`w-full bg-transparent px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 resize-none outline-none focus:ring-1 ${accentClasses.ring} rounded-none font-mono leading-relaxed`}
        />
      </div>

      {/* Shift Control */}
      <div className={`rounded-xl border ${accentClasses.border} bg-zinc-900/60 backdrop-blur p-4`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs tracking-widest uppercase font-semibold ${accentClasses.text}`}>
            Shift Key
          </span>
          <div
            className={`px-3 py-1 rounded-md border ${accentClasses.border} ${accentClasses.glow} text-white text-sm font-bold tabular-nums min-w-[48px] text-center`}
          >
            {shift > 0 ? `+${shift}` : shift}
          </div>
        </div>

        <input
          type="range"
          min={1}
          max={25}
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className={`w-full h-1.5 rounded-full appearance-none cursor-pointer ${accentClasses.sliderAccent} bg-zinc-800`}
        />

        <div className="flex justify-between mt-1.5 text-zinc-700 text-xs">
          <span>1</span>
          <span className="text-zinc-600">← drag to adjust →</span>
          <span>25</span>
        </div>

        {/* Alphabet preview */}
        <div className="mt-3 pt-3 border-t border-zinc-800">
          <AlphabetPreview shift={shift} mode={mode} accentText={accentClasses.text} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onProcess}
          disabled={!inputText.trim() || isAnimating}
          className={`flex-1 py-3 rounded-xl font-bold tracking-widest uppercase text-sm ${accentClasses.bg} text-black ${accentClasses.shadow} transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none`}
        >
          {isAnimating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `${isEncode ? '⟶ Encode' : '⟵ Decode'} (Ctrl+Enter)`
          )}
        </button>

        <button
          onClick={onClear}
          className="px-4 py-3 rounded-xl border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 text-sm transition-all duration-200 active:scale-[0.98]"
          title="Clear"
        >
          ✕
        </button>
      </div>

      {/* Result */}
      {(result || isAnimating) && (
        <div
          className={`rounded-xl border ${accentClasses.border} bg-zinc-900/60 backdrop-blur overflow-hidden ${isAnimating ? 'opacity-50' : 'animate-fadeIn'}`}
        >
          <div
            className={`flex items-center justify-between px-4 py-2 border-b ${accentClasses.border} ${accentClasses.glow}`}
          >
            <span
              className={`text-xs tracking-widest uppercase font-semibold ${accentClasses.text}`}
            >
              {isEncode ? '// output.enc' : '// output.txt'}
            </span>
            <button
              onClick={onCopy}
              className={`text-xs px-2.5 py-1 rounded-md border ${accentClasses.border} ${accentClasses.text} hover:bg-zinc-800 transition-colors duration-150`}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          <div className="px-4 py-3 text-sm font-mono leading-relaxed text-zinc-200 break-all min-h-[60px]">
            {isAnimating ? (
              <span className={`${accentClasses.text} animate-pulse`}>█▌▌█▌▌█ ▌█▌█▌ ▌█...</span>
            ) : (
              <span className={accentClasses.text}>{result}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Mini alphabet shift preview
const AlphabetPreview = ({
  shift,
  mode,
  accentText,
}: {
  shift: number
  mode: 'encode' | 'decode'
  accentText: string
}) => {
  const sample = 'ABCDEFGHIJ'
  const shifted = sample
    .split('')
    .map((c) => {
      const base = 'A'.charCodeAt(0)
      const idx = c.charCodeAt(0) - base
      const newIdx = mode === 'encode' ? (idx + shift) % 26 : (idx - shift + 26) % 26
      return String.fromCharCode(base + newIdx)
    })
    .join('')

  return (
    <div className="flex items-center gap-2 text-xs overflow-hidden">
      <span className="text-zinc-600 shrink-0">{sample}</span>
      <span className="text-zinc-700">→</span>
      <span className={`${accentText} font-semibold tracking-wider shrink-0`}>{shifted}</span>
      <span className="text-zinc-700 text-[10px]">...</span>
    </div>
  )
}

export default CipherPanel
