import type { AppRoute } from '../../router/route'

interface SidebarProps {
  routes: AppRoute[]
  activeId: string
  onNavigate: (id: string) => void
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ routes, activeId, onNavigate, isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-30 flex flex-col
          bg-[#0d0d12] border-r border-zinc-800/60
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-zinc-800/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-base">
              🔒
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-tight font-mono">CryptoKit</p>
              <p className="text-zinc-600 text-[10px] tracking-widest uppercase">Encoding Tools</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="text-zinc-700 text-[10px] tracking-widest uppercase px-2 mb-2 font-mono">
            Algorithms
          </p>
          {routes.map((route) => {
            const isActive = route.id === activeId
            return (
              <button
                key={route.id}
                onClick={() => {
                  onNavigate(route.id)
                  onClose()
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                  transition-all duration-200 group
                  ${
                    isActive
                      ? 'bg-emerald-500/10 border border-emerald-500/20'
                      : 'hover:bg-zinc-800/50 border border-transparent'
                  }
                `}
              >
                <span className="text-lg w-7 text-center shrink-0">{route.icon}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold font-mono truncate ${isActive ? 'text-emerald-400' : 'text-zinc-300 group-hover:text-white'}`}
                  >
                    {route.label}
                  </p>
                  <p className="text-[10px] text-zinc-600 truncate mt-0.5">{route.description}</p>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                )}
                {route.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono shrink-0">
                    {route.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-zinc-800/60">
          <p className="text-zinc-700 text-[10px] font-mono">v1.0.0 · CryptoKit</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
