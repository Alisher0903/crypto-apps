export interface AccentConfig {
  border: string
  text: string
  bg: string
  bgSubtle: string
  shadow: string
  ring: string
  sliderAccent: string
}

export const accents = {
  emerald: {
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500',
    bgSubtle: 'bg-emerald-500/5',
    shadow: 'shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)]',
    ring: 'focus:ring-emerald-500/30',
    sliderAccent: 'accent-emerald-400',
  },
  cyan: {
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500',
    bgSubtle: 'bg-cyan-500/5',
    shadow: 'shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]',
    ring: 'focus:ring-cyan-500/30',
    sliderAccent: 'accent-cyan-400',
  },
  violet: {
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    bg: 'bg-violet-500',
    bgSubtle: 'bg-violet-500/5',
    shadow: 'shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]',
    ring: 'focus:ring-violet-500/30',
    sliderAccent: 'accent-violet-400',
  },
  amber: {
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    bg: 'bg-amber-500',
    bgSubtle: 'bg-amber-500/5',
    shadow: 'shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]',
    ring: 'focus:ring-amber-500/30',
    sliderAccent: 'accent-amber-400',
  },
} satisfies Record<string, AccentConfig>

export type AccentName = keyof typeof accents
