import { useState } from 'react'
import Encode from '../../components/encode'
import Decode from '../../components/decode'

type Mode = 'encode' | 'decode'

const CaesarPage = () => {
  const [mode, setMode] = useState<Mode>('encode')

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex mb-6 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/40 p-1 gap-1">
        {(['encode', 'decode'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2.5 text-sm font-semibold tracking-widest uppercase rounded-md transition-all duration-300
              ${
                mode === m
                  ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
          >
            {m === 'encode' ? '⟶  Encode' : '⟵  Decode'}
          </button>
        ))}
      </div>

      <div key={mode} className="animate-fadeIn">
        {mode === 'encode' ? <Encode /> : <Decode />}
      </div>
    </div>
  )
}

export default CaesarPage
