import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import prisma from '@/lib/prisma'

export default async function UsersPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const users = await prisma.user.findMany({
    where: session.role === 'admin' ? undefined : { createdById: session.userId },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, role: true, createdAt: true },
  })

  return (
    <>
      <header className="eco-topbar">
        <span className="eco-topbar__title">Usuários</span>
        <div className="eco-topbar__actions">
          <Link
            href="/users/new"
            className="eco-btn-primary"
            style={{ width: 'auto', padding: '0.5rem 1.25rem' }}
          >
            <i className="ti ti-plus" style={{ marginRight: '0.375rem' }} />
            Novo usuário
          </Link>
        </div>
      </header>

      <div className="eco-content">
        <div className="eco-table-wrap">
          <table className="eco-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th>Criado em</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="eco-empty">Nenhum usuário encontrado.</td>
                </tr>
              )}
              {users.map((u) => (
                <tr key={u.id}>
                  <td><strong>{u.name}</strong></td>
                  <td>
                    <span className={`eco-badge eco-badge--${u.role}`}>
                      {u.role === 'admin'
                        ? <><i className="ti ti-shield-check" /> Admin</>
                        : <><i className="ti ti-user" /> Usuário</>}
                    </span>
                  </td>
                  <td className="muted">
                    {u.createdAt.toLocaleDateString('pt-BR')}
                  </td>
                  <td>
                    <Link href={`/users/${u.id}`} className="eco-btn-secondary">
                      <i className="ti ti-pencil" />
                      Gerenciar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
