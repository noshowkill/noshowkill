'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', icon: '🏠', label: 'Ce soir' },
  { href: '/reservations', icon: '📅', label: 'Réservations' },
  { href: '/clients', icon: '👥', label: 'Clients' },
  { href: '/analytics', icon: '📊', label: 'Stats' },
  { href: '/settings', icon: '⚙️', label: 'Réglages' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile : bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50">
        <div className="flex">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center py-3 gap-1 ${
                pathname === item.href ? 'text-white' : 'text-zinc-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop : sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 flex-col p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">NoShowKill</h2>
          <p className="text-zinc-400 text-xs mt-1">Dashboard restaurateur</p>
        </div>
        <nav className="space-y-1">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
