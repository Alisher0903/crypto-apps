// --- Error Alert ---
interface ErrorAlertProps {
  message: string
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <div className="animate-fadeIn flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
    <span>⚠</span>
    {message}
  </div>
)

// --- Info Note ---
interface InfoNoteProps {
  message: string
  accentText?: string
}

export const InfoNote = ({ message, accentText = 'text-zinc-500' }: InfoNoteProps) => (
  <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900/30 text-xs text-zinc-500">
    <span className={`${accentText} shrink-0 mt-0.5`}>ℹ</span>
    <span>{message}</span>
  </div>
)
