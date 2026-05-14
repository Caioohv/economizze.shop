'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions'
import '@/app/auth.css'

interface SidebarProps {
  userName: string
  userEmail: string
}

export default function Sidebar({ userName, userEmail }: SidebarProps) {
  const pathname = usePathname()

  function active(path: string) {
    return pathname === path || pathname.startsWith(path + '/')
      ? 'eco-sidebar__link eco-sidebar__link--active'
      : 'eco-sidebar__link'
  }

  return (
    <aside className="eco-sidebar">
      <div className="eco-sidebar__brand">
        <div className="eco-sidebar__logo">
          economiz<em>ze</em>
        </div>
        <div className="eco-sidebar__label">Autenticação</div>
      </div>

      <nav className="eco-sidebar__nav">
        <div className="eco-sidebar__group-title">Sistema</div>
        <Link href="/users" className={active('/users')}>
          <i className="ti ti-users" />
          Usuários
        </Link>
      </nav>

      <div className="eco-sidebar__footer">
        <div className="eco-sidebar__user" title={userEmail}>
          {userName || userEmail}
        </div>
        <form action={logout}>
          <button type="submit" className="eco-btn-secondary" style={{ width: '100%' }}>
            <i className="ti ti-logout" />
            Sair
          </button>
        </form>
      </div>
    </aside>
  )
}
