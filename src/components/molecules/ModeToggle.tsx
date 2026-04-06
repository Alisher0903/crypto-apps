import type { AccentConfig } from '../../types/accent'

export type Mode = 'encode' | 'decode'

interface ModeToggleProps {
  mode: Mode
  onChange: (mode: Mode) => void
  accent: AccentConfig
}

const MODES: { value: Mode; label: string }[] = [
  { value: 'encode', label: '⟶  Encode' },
  { value: 'decode', label: '⟵  Decode' },
]

const ModeToggle = ({ mode, onChange, accent }: ModeToggleProps) => (
  <div className="flex mb-6 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/40 p-1 gap-1">
    {MODES.map(({ value, label }) => (
      <button
        key={value}
        onClick={() => onChange(value)}
        className={`
          flex-1 py-2.5 text-sm font-semibold tracking-widest uppercase rounded-md
          transition-all duration-300
          ${
            mode === value
              ? `${accent.bg} text-black ${accent.shadow}`
              : 'text-zinc-500 hover:text-zinc-300'
          }
        `}
      >
        {label}
      </button>
    ))}
  </div>
)

export default ModeToggle
