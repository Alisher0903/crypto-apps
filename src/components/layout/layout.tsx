import { useState } from 'react'
import type { ReactNode } from 'react'
import { defaultRoute, routes, type AppRoute } from '../../router/route'
import Sidebar from './sidebar'

interface LayoutProps {
  children: (route: AppRoute) => ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [activeId, setActiveId] = useState(defaultRoute.id)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeRoute = routes.find((r) => r.id === activeId) ?? defaultRoute

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono flex">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,128,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,128,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <Sidebar
        routes={routes}
        activeId={activeId}
        onNavigate={setActiveId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Topbar */}
        <header className="h-14 border-b border-zinc-800/60 bg-[#0a0a0f]/80 backdrop-blur-sm flex items-center px-4 gap-4 sticky top-0 z-10">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-600">CryptoKit</span>
            <span className="text-zinc-700">/</span>
            <span className="text-emerald-400 font-semibold">{activeRoute.label}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-600 border border-zinc-800 rounded-md px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              Online
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div key={activeId} className="animate-fadeIn max-w-2xl mx-auto px-4 py-10">
            {/* Page header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-zinc-500 text-xs tracking-[0.3em] uppercase mb-3">
                <span className="w-6 h-px bg-zinc-700" />
                {activeRoute.description}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>{activeRoute.icon}</span>
                {activeRoute.label}
              </h1>
            </div>

            {children(activeRoute)}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
