import type { ReactNode } from 'react'
import type { AccentConfig } from '../../types/accent'
import type { Mode } from '../molecules/ModeToggle'
import ModeToggle from '../molecules/ModeToggle'
import CodeBlock from '../molecules/CodeBlock'
import ResultBlock from '../molecules/ResultBlock'
import ActionBar from '../molecules/ActionBar'
import { ErrorAlert, InfoNote } from '../atoms/Alert'

interface EncoderTemplateProps {
  // State
  mode: Mode
  onModeChange: (mode: Mode) => void
  input: string
  onInputChange: (value: string) => void
  result: string
  error?: string
  isAnimating: boolean
  copied: boolean

  // Actions
  onProcess: () => void
  onCopy: () => void
  onClear: () => void
  onSwap?: () => void

  // Config
  accent: AccentConfig
  inputLabel: string
  outputLabel: string
  inputPlaceholder?: string
  processLabel: string
  showSwap?: boolean
  infoNote?: string

  // Optional extra controls (e.g. shift slider for Caesar)
  controls?: ReactNode
}

const EncoderTemplate = ({
  mode,
  onModeChange,
  input,
  onInputChange,
  result,
  error,
  isAnimating,
  copied,
  onProcess,
  onCopy,
  onClear,
  onSwap,
  accent,
  inputLabel,
  outputLabel,
  inputPlaceholder,
  processLabel,
  showSwap = false,
  infoNote,
  controls,
}: EncoderTemplateProps) => (
  <div>
    <ModeToggle mode={mode} onChange={onModeChange} accent={accent} />

    <div key={mode} className="animate-fadeIn space-y-4">
      <CodeBlock
        label={inputLabel}
        value={input}
        onChange={onInputChange}
        onSubmit={onProcess}
        placeholder={inputPlaceholder}
        accent={accent}
      />

      {controls}

      {infoNote && <InfoNote message={infoNote} accentText={accent.text} />}

      <ActionBar
        onProcess={onProcess}
        onClear={onClear}
        onSwap={onSwap}
        isAnimating={isAnimating}
        disabled={!input.trim()}
        processLabel={processLabel}
        accent={accent}
        showSwap={showSwap && !!result}
      />

      {error && <ErrorAlert message={error} />}

      <ResultBlock
        label={outputLabel}
        result={result}
        isAnimating={isAnimating}
        copied={copied}
        onCopy={onCopy}
        accent={accent}
      />
    </div>
  </div>
)

export default EncoderTemplate
