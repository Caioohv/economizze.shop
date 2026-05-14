import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { RESOURCES, ACTIONS, getActorPermissions, type Permission, type Role } from '@/lib/permissions'

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function NewUserPage({ searchParams }: Props) {
  const session = await getSession()
  if (!session) redirect('/login')

  const { error } = await searchParams
  const isAdmin = session.role === 'admin'
  const myPermissions = await getActorPermissions(session)

  async function createUser(formData: FormData) {
    'use server'

    const session = await getSession()
    if (!session) return

    const isAdmin = session.role === 'admin'
    const name     = (formData.get('name') as string).trim()
    const email    = (formData.get('email') as string).trim().toLowerCase()
    const password = formData.get('password') as string
    const role     = (isAdmin ? formData.get('role') : 'user') as Role

    const hashed = await hashPassword(password)

    let created: { id: string }
    let emailTaken = false

    try {
      created = await prisma.user.create({
        data: { name, email, password: hashed, role, createdById: session.userId },
        select: { id: true },
      })
    } catch (err: unknown) {
      const isUniqueViolation =
        typeof err === 'object' && err !== null &&
        'code' in err && (err as { code: string }).code === 'P2002'
      if (isUniqueViolation) {
        emailTaken = true
      } else {
        throw err
      }
    }

    if (emailTaken) {
      redirect('/users/new?error=email_taken')
    }

    const actorPerms = await getActorPermissions(session)

    const toCreate = RESOURCES.flatMap((resource) =>
      ACTIONS.filter((action) => {
        const perm: Permission = `${resource}:${action}`
        return (
          formData.get(`perm_${resource}_${action}`) === 'on' &&
          actorPerms.includes(perm)
        )
      }).map((action) => ({
        userId: created!.id,
        resource,
        action,
        site: null,
        granted: true,
        grantedById: session.userId,
      }))
    )

    if (toCreate.length > 0) {
      await prisma.userPermission.createMany({ data: toCreate })
    }

    redirect('/users')
  }

  return (
    <>
      <header className="eco-topbar">
        <span className="eco-topbar__title">Novo usuário</span>
      </header>

      <div className="eco-content">
        <div className="eco-form-card">
          <h2>Dados do usuário</h2>
          {error === 'email_taken' && (
            <div className="eco-error">Este e-mail já está cadastrado.</div>
          )}
          <form action={createUser}>
            <div className="eco-form-row">
              <div className="eco-field">
                <label htmlFor="name">Nome completo</label>
                <input id="name" name="name" type="text" placeholder="João Silva" required />
              </div>
              <div className="eco-field">
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" placeholder="joao@exemplo.com" required />
              </div>
              <div className="eco-field">
                <label htmlFor="password">Senha inicial</label>
                <input id="password" name="password" type="password" placeholder="Mínimo 6 caracteres" minLength={6} required />
              </div>
              {isAdmin && (
                <div className="eco-field">
                  <label htmlFor="role">Função</label>
                  <select id="role" name="role" className="eco-select" defaultValue="user">
                    <option value="user">Usuário</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}
            </div>

            {myPermissions.length > 0 && (
              <>
                <p className="eco-section-title">Permissões</p>
                <p className="eco-form-hint">
                  Conceda apenas as permissões que você mesmo possui.
                </p>
                <div className="eco-perm-grid eco-perm-grid--mb">
                  {RESOURCES.map((resource) => (
                    <div key={resource} className="eco-perm-card">
                      <div className="eco-perm-card__resource">{resource}</div>
                      <div className="eco-perm-card__actions">
                        {ACTIONS.map((action) => {
                          const available = myPermissions.includes(`${resource}:${action}` as Permission)
                          return (
                            <label
                              key={action}
                              className={`eco-perm-toggle${!available ? ' eco-perm-toggle--disabled' : ''}`}
                            >
                              <input
                                type="checkbox"
                                name={`perm_${resource}_${action}`}
                                disabled={!available}
                              />
                              {action === 'read' ? 'Leitura' : 'Escrita'}
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="eco-btn-row">
              <button type="submit" className="eco-btn-primary eco-btn-primary--inline">
                Criar usuário
              </button>
              <a href="/users" className="eco-btn-secondary">Cancelar</a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
