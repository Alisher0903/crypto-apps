import { useState, useCallback } from 'react'
import { alphabet } from '../utils/const'
import CipherPanel from './Cipherpanel'

const Decode = () => {
  const [inputText, setInputText] = useState('')
  const [shift, setShift] = useState(3)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const decodeText = useCallback(() => {
    if (!inputText.trim()) return

    setIsAnimating(true)
    setResult('')

    setTimeout(() => {
      const decoded = inputText
        .toLowerCase()
        .split('')
        .map((char) => {
          if (alphabet.includes(char)) {
            const idx = alphabet.indexOf(char)
            const newIdx = (((idx - shift) % 26) + 26) % 26
            return alphabet[newIdx]
          }
          return char
        })
        .join('')

      setResult(decoded)
      setIsAnimating(false)
    }, 300)
  }, [inputText, shift])

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInputText('')
    setResult('')
  }

  return (
    <CipherPanel
      mode="decode"
      inputText={inputText}
      setInputText={setInputText}
      shift={shift}
      setShift={setShift}
      result={result}
      isAnimating={isAnimating}
      copied={copied}
      onProcess={decodeText}
      onCopy={handleCopy}
      onClear={handleClear}
    />
  )
}

export default Decode
