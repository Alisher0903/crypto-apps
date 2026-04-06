import type { AccentConfig } from '../../types/accent'

interface CodeBlockProps {
  label: string
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  rows?: number
  accent: AccentConfig
}

const CodeBlock = ({
  label,
  value,
  onChange,
  onSubmit,
  placeholder = 'Enter text...',
  rows = 4,
  accent,
}: CodeBlockProps) => (
  <div
    className={`rounded-xl border ${accent.border} bg-zinc-900/60 backdrop-blur overflow-hidden`}
  >
    <div
      className={`flex items-center justify-between px-4 py-2 border-b ${accent.border} ${accent.bgSubtle}`}
    >
      <span className={`text-xs tracking-widest uppercase font-semibold ${accent.text}`}>
        {label}
      </span>
      <span className="text-zinc-600 text-xs">{value.length} chars</span>
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && onSubmit?.()}
      placeholder={placeholder}
      rows={rows}
      className={`w-full bg-transparent px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 resize-none outline-none focus:ring-1 ${accent.ring} rounded-none font-mono leading-relaxed`}
    />
  </div>
)

export default CodeBlock
