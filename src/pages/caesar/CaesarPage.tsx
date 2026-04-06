import { useState, useCallback } from 'react'
import type { Mode } from '../../components/molecules/ModeToggle'
import EncoderTemplate from '../../components/templates/EncoderTemplate'
import { accents } from '../../types/accent'
import { useProcessor } from '../../hooks/useProcessor'
import { alphabet } from '../../utils/const'

// --- Shift Slider (Caesar-specific control) ---
interface ShiftControlProps {
  shift: number
  onChange: (n: number) => void
  mode: Mode
}

const ShiftControl = ({ shift, onChange, mode }: ShiftControlProps) => {
  const accent = accents[mode === 'encode' ? 'emerald' : 'cyan']

  const preview = 'ABCDEFGHIJ'
    .split('')
    .map((c) => {
      const base = 'A'.charCodeAt(0)
      const idx = c.charCodeAt(0) - base
      const newIdx = mode === 'encode' ? (idx + shift) % 26 : (idx - shift + 26) % 26
      return String.fromCharCode(base + newIdx)
    })
    .join('')

  return (
    <div className={`rounded-xl border ${accent.border} bg-zinc-900/60 backdrop-blur p-4`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs tracking-widest uppercase font-semibold ${accent.text}`}>
          Shift Key
        </span>
        <div
          className={`px-3 py-1 rounded-md border ${accent.border} ${accent.bgSubtle} text-white text-sm font-bold tabular-nums min-w-[48px] text-center`}
        >
          {shift > 0 ? `+${shift}` : shift}
        </div>
      </div>

      <input
        type="range"
        min={1}
        max={25}
        value={shift}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-1.5 rounded-full appearance-none cursor-pointer ${accent.sliderAccent} bg-zinc-800`}
      />

      <div className="flex justify-between mt-1.5 text-zinc-700 text-xs">
        <span>1</span>
        <span className="text-zinc-600">← drag to adjust →</span>
        <span>25</span>
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center gap-2 text-xs overflow-hidden">
        <span className="text-zinc-600 shrink-0">ABCDEFGHIJ</span>
        <span className="text-zinc-700">→</span>
        <span className={`${accent.text} font-semibold tracking-wider shrink-0`}>{preview}</span>
        <span className="text-zinc-700 text-[10px]">...</span>
      </div>
    </div>
  )
}

// --- Caesar Page ---
const CaesarPage = () => {
  const [mode, setMode] = useState<Mode>('encode')
  const [shift, setShift] = useState(3)

  const processFn = useCallback(
    (input: string) =>
      input
        .toLowerCase()
        .split('')
        .map((char) => {
          if (!alphabet.includes(char)) return char
          const idx = alphabet.indexOf(char)
          const newIdx =
            mode === 'encode' ? (((idx + shift) % 26) + 26) % 26 : (((idx - shift) % 26) + 26) % 26
          return alphabet[newIdx]
        })
        .join(''),
    [mode, shift],
  )

  const processor = useProcessor({ processFn })
  const accent = accents[mode === 'encode' ? 'emerald' : 'cyan']

  return (
    <EncoderTemplate
      mode={mode}
      onModeChange={(m) => {
        setMode(m)
        processor.handleClear()
      }}
      input={processor.input}
      onInputChange={processor.setInput}
      result={processor.result}
      error={processor.error}
      isAnimating={processor.isAnimating}
      copied={processor.copied}
      onProcess={processor.process}
      onCopy={processor.handleCopy}
      onClear={processor.handleClear}
      accent={accent}
      inputLabel={mode === 'encode' ? '// input.txt' : '// cipher.txt'}
      outputLabel={mode === 'encode' ? '// output.enc' : '// output.txt'}
      inputPlaceholder={
        mode === 'encode' ? 'Enter plaintext to encode...' : 'Enter ciphertext to decode...'
      }
      processLabel={mode === 'encode' ? '⟶ Encode' : '⟵ Decode'}
      controls={<ShiftControl shift={shift} onChange={setShift} mode={mode} />}
    />
  )
}

export default CaesarPage
