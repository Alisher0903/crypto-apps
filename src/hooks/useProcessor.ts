import { useState, useCallback } from 'react'
import { useCopy } from './useCopy'

interface UseProcessorOptions {
  processFn: (input: string) => string
  delay?: number
}

export const useProcessor = ({ processFn, delay = 300 }: UseProcessorOptions) => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const { copied, copy } = useCopy()

  const process = useCallback(() => {
    if (!input.trim()) return
    setError('')
    setIsAnimating(true)
    setResult('')

    setTimeout(() => {
      try {
        const output = processFn(input)
        setResult(output)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred.')
      }
      setIsAnimating(false)
    }, delay)
  }, [input, processFn, delay])

  const handleCopy = useCallback(() => copy(result), [copy, result])

  const handleClear = useCallback(() => {
    setInput('')
    setResult('')
    setError('')
  }, [])

  const handleSwap = useCallback(() => {
    if (!result) return
    setInput(result)
    setResult('')
    setError('')
  }, [result])

  return {
    input,
    setInput,
    result,
    error,
    isAnimating,
    copied,
    process,
    handleCopy,
    handleClear,
    handleSwap,
  }
}
