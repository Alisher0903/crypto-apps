interface SpinnerProps {
  light?: boolean
}

const Spinner = ({ light = false }: SpinnerProps) => (
  <span
    className={`w-4 h-4 border-2 rounded-full animate-spin inline-block
      ${light ? 'border-white/30 border-t-white' : 'border-black/30 border-t-black'}`}
  />
)

export default Spinner
