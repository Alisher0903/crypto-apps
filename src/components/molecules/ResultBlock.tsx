import type { AccentConfig } from '../../types/accent'
import { CopyButton } from '../atoms/Button'

interface ResultBlockProps {
  label: string
  result: string
  isAnimating: boolean
  copied: boolean
  onCopy: () => void
  accent: AccentConfig
}

const PLACEHOLDER_ANIMATION = '█▌▌█▌▌█ ▌█▌█▌ ▌█...'

const ResultBlock = ({ label, result, isAnimating, copied, onCopy, accent }: ResultBlockProps) => {
  if (!result && !isAnimating) return null

  return (
    <div
      className={`
        rounded-xl border ${accent.border} bg-zinc-900/60 backdrop-blur overflow-hidden
        ${isAnimating ? 'opacity-50' : 'animate-fadeIn'}
      `}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 border-b ${accent.border} ${accent.bgSubtle}`}
      >
        <span className={`text-xs tracking-widest uppercase font-semibold ${accent.text}`}>
          {label}
        </span>
        <CopyButton copied={copied} onClick={onCopy} accent={accent} />
      </div>

      <div className="px-4 py-3 text-sm font-mono leading-relaxed text-zinc-200 break-all min-h-[60px]">
        {isAnimating ? (
          <span className={`${accent.text} animate-pulse`}>{PLACEHOLDER_ANIMATION}</span>
        ) : (
          <span className={accent.text}>{result}</span>
        )}
      </div>
    </div>
  )
}

export default ResultBlock
