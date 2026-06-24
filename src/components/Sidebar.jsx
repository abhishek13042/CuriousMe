import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'
import {
  Brain, Compass, Menu, X, ChevronRight, Trophy
} from 'lucide-react'

const NAV = [
  {
    group: 'Learning',
    items: [
      { to: '/batch',   label: 'AI Batch',  icon: Brain },
      { to: '/mybatch', label: 'My Batch',  icon: Trophy },
      { to: '/explorer', label: 'Explorer', icon: Compass },
    ]
  }
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-[#E5E0D8]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1A1A2E] rounded-xl 
            flex items-center justify-center">
            <Brain size={16} className="text-[#E07B39]"/>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1A1A2E] 
              font-['Inter']">
              CuriousMe
            </p>
            <p className="text-[9px] text-[#9A9590] 
              font-['Space_Mono'] uppercase tracking-widest">
              Knowledge OS
            </p>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 p-3 overflow-y-auto 
        space-y-4" style={{ scrollbarWidth: 'none' }}>
        {NAV.map(group => (
          <div key={group.group}>
            <p className="text-[8px] font-bold text-[#9A9590]
              font-['Space_Mono'] uppercase tracking-widest
              px-3 mb-1">
              {group.group}
            </p>
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                  'text-sm font-["Inter"] transition-all mb-0.5',
                  isActive
                    ? 'bg-[#1A1A2E] text-white font-bold'
                    : 'text-[#9A9590] hover:text-[#1A1A2E]',
                  'hover:bg-[#1A1A2E]/5'
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={15} className={clsx(
                      isActive ? 'text-[#E07B39]' : ''
                    )}/>
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <ChevronRight size={12} 
                        className="text-white/40"/>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#E5E0D8]">
        <p className="text-[8px] text-[#9A9590] font-['Space_Mono']
          uppercase tracking-widest text-center">
          Abhishek · IIIT Nagpur · 2026
        </p>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 shrink-0 
        bg-white border-r border-[#E5E0D8] h-screen 
        sticky top-0 flex-col">
        <SidebarContent/>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50
        bg-white border-b border-[#E5E0D8] px-4 py-3
        flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#1A1A2E] rounded-lg 
            flex items-center justify-center">
            <Brain size={13} className="text-[#E07B39]"/>
          </div>
          <p className="text-sm font-bold text-[#1A1A2E] 
            font-['Inter']">
            CuriousMe
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="w-8 h-8 flex items-center justify-center
            rounded-lg bg-[#F5F4F0]"
        >
          <Menu size={16} className="text-[#1A1A2E]"/>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20 
            backdrop-blur-sm"
            onClick={() => setOpen(false)}/>
          <div className="absolute left-0 top-0 bottom-0 
            w-64 bg-white shadow-xl">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center
                  rounded-lg bg-[#F5F4F0]"
              >
                <X size={16} className="text-[#1A1A2E]"/>
              </button>
            </div>
            <SidebarContent/>
          </div>
        </div>
      )}
    </>
  )
}
