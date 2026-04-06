import { useState, useCallback } from 'react'
import type { Mode } from '../../components/molecules/ModeToggle'
import EncoderTemplate from '../../components/templates/EncoderTemplate'
import { accents } from '../../types/accent'
import { useProcessor } from '../../hooks/useProcessor'

const Base64Page = () => {
  const [mode, setMode] = useState<Mode>('encode')

  const processFn = useCallback(
    (input: string) => {
      if (mode === 'encode') {
        return btoa(unescape(encodeURIComponent(input)))
      } else {
        const decoded = decodeURIComponent(escape(atob(input.trim())))
        return decoded
      }
    },
    [mode],
  )

  const processor = useProcessor({ processFn })
  const accent = accents[mode === 'encode' ? 'violet' : 'amber']

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
      onSwap={processor.handleSwap}
      accent={accent}
      inputLabel={mode === 'encode' ? '// input.txt' : '// input.b64'}
      outputLabel={mode === 'encode' ? '// output.b64' : '// output.txt'}
      inputPlaceholder={
        mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string to decode...'
      }
      processLabel={mode === 'encode' ? '⟶ Encode' : '⟵ Decode'}
      showSwap={true}
      infoNote={
        mode === 'encode'
          ? 'Converts text to Base64 format. Supports UTF-8 characters including emoji and special symbols.'
          : 'Decodes Base64 string back to original text. Input must be valid Base64.'
      }
    />
  )
}

export default Base64Page
