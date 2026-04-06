import type { AccentConfig } from '../../types/accent'
import { PrimaryButton, GhostButton } from '../atoms/Button'

interface ActionBarProps {
  onProcess: () => void
  onClear: () => void
  onSwap?: () => void
  isAnimating: boolean
  disabled: boolean
  processLabel: string
  accent: AccentConfig
  showSwap?: boolean
}

const ActionBar = ({
  onProcess,
  onClear,
  onSwap,
  isAnimating,
  disabled,
  processLabel,
  accent,
  showSwap = false,
}: ActionBarProps) => (
  <div className="flex gap-3">
    <PrimaryButton accent={accent} loading={isAnimating} disabled={disabled} onClick={onProcess}>
      {processLabel} (Ctrl+Enter)
    </PrimaryButton>

    {showSwap && onSwap && (
      <GhostButton accent={accent} onClick={onSwap} title="Use result as input">
        ⇄
      </GhostButton>
    )}

    <GhostButton onClick={onClear} title="Clear">
      ✕
    </GhostButton>
  </div>
)

export default ActionBar
