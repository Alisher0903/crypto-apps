import { useState } from 'react'
import Encode from '../components/encode'
import Decode from '../components/decode'

type Mode = 'encode' | 'decode'

const CipherPage = () => {
  const [mode, setMode] = useState<Mode>('encode')

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,128,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Glow orb */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-emerald-400/60 text-xs tracking-[0.3em] uppercase mb-3">
            <span className="w-8 h-px bg-emerald-400/40" />
            Cryptography Tool
            <span className="w-8 h-px bg-emerald-400/40" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Caesar <span className="text-emerald-400">Cipher</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500">Classic substitution cipher with shift key</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex mb-8 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/40 backdrop-blur-sm p-1 gap-1">
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

        {/* Panel */}
        <div key={mode} className="animate-fadeIn">
          {mode === 'encode' ? <Encode /> : <Decode />}
        </div>

        <p className="text-center text-zinc-700 text-xs mt-8 tracking-widest">
          ROT-N · CAESAR · SHIFT CIPHER
        </p>
      </div>
    </div>
  )
}

export default CipherPage
