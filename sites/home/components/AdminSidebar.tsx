'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="eco-sidebar">
      <div className="eco-sidebar__header">
        economizze
        <span className="eco-sidebar__sub">Admin</span>
      </div>

      <div className="eco-sidebar__switcher">
        <div>
          <div className="eco-sidebar__switcher-site">Perfumaria</div>
          <div className="eco-sidebar__switcher-domain">perfumaria.shop</div>
        </div>
        <i className="ti ti-chevron-down"></i>
      </div>

      <div className="eco-sidebar__group-label">Principal</div>
      <Link href="/admin" className={`eco-sidebar__item${pathname === '/admin' ? ' eco-sidebar__item--active' : ''}`}>
        <i className="ti ti-layout-dashboard"></i>
        Dashboard
      </Link>
      <Link href="/admin/produtos" className={`eco-sidebar__item${pathname === '/admin/produtos' ? ' eco-sidebar__item--active' : ''}`}>
        <i className="ti ti-package"></i>
        Produtos
      </Link>
      <Link href="/admin/categorias" className={`eco-sidebar__item${pathname === '/admin/categorias' ? ' eco-sidebar__item--active' : ''}`}>
        <i className="ti ti-category"></i>
        Categorias
      </Link>

      <div className="eco-sidebar__group-label">Sistema</div>
      <Link href="/admin/usuarios" className={`eco-sidebar__item${pathname === '/admin/usuarios' ? ' eco-sidebar__item--active' : ''}`}>
        <i className="ti ti-users"></i>
        Usuários
      </Link>
      <Link href="/admin/metricas" className={`eco-sidebar__item${pathname === '/admin/metricas' ? ' eco-sidebar__item--active' : ''}`}>
        <i className="ti ti-chart-bar"></i>
        Métricas
      </Link>
      <Link href="/admin/configuracoes" className={`eco-sidebar__item${pathname === '/admin/configuracoes' ? ' eco-sidebar__item--active' : ''}`}>
        <i className="ti ti-settings"></i>
        Configurações
      </Link>
    </aside>
  );
}
