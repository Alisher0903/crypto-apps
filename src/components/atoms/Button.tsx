import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { AccentConfig } from '../../types/accent'
import Spinner from './Spinner'

// --- Primary Button ---
interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accent: AccentConfig
  loading?: boolean
  children: ReactNode
}

export const PrimaryButton = ({
  accent,
  loading = false,
  children,
  disabled,
  className = '',
  ...props
}: PrimaryButtonProps) => (
  <button
    disabled={disabled || loading}
    className={`
      flex-1 py-3 rounded-xl font-bold tracking-widest uppercase text-sm
      ${accent.bg} text-black
      ${accent.shadow}
      transition-all duration-200 active:scale-[0.98]
      disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
      ${className}
    `}
    {...props}
  >
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <Spinner />
        Processing...
      </span>
    ) : (
      children
    )}
  </button>
)

// --- Ghost Button ---
interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: AccentConfig
  children: ReactNode
}

export const GhostButton = ({ accent, children, className = '', ...props }: GhostButtonProps) => (
  <button
    className={`
      px-4 py-3 rounded-xl border text-sm transition-all duration-200 active:scale-[0.98]
      ${
        accent
          ? `${accent.border} ${accent.text} hover:${accent.bgSubtle}`
          : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
      }
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
)

// --- Copy Button ---
interface CopyButtonProps {
  copied: boolean
  onClick: () => void
  accent: AccentConfig
}

export const CopyButton = ({ copied, onClick, accent }: CopyButtonProps) => (
  <button
    onClick={onClick}
    className={`text-xs px-2.5 py-1 rounded-md border ${accent.border} ${accent.text} hover:bg-zinc-800 transition-colors duration-150`}
  >
    {copied ? '✓ Copied' : 'Copy'}
  </button>
)
