import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/session'
import prisma from '@/lib/prisma'
import {
  RESOURCES,
  ACTIONS,
  resolvePermissions,
  getActorPermissions,
  getDescendants,
  type Permission,
} from '@/lib/permissions'

interface Props {
  params: Promise<{ id: string }>
}

export default async function UserDetailPage({ params }: Props) {
  const { id: targetId } = await params

  const session = await getSession()
  if (!session) redirect('/login')

  const isAdmin = session.role === 'admin'

  const target = await prisma.user.findUnique({
    where: { id: targetId },
    select: { id: true, name: true, role: true, createdById: true, createdAt: true },
  })
  if (!target) notFound()

  const canManage = isAdmin || target.createdById === session.userId
  if (!canManage) redirect('/users')

  const [targetPermRows, actorPermissions] = await Promise.all([
    prisma.userPermission.findMany({ where: { userId: targetId } }),
    getActorPermissions(session),
  ])

  const targetPermissions = resolvePermissions(targetPermRows)

  async function updatePermissions(formData: FormData) {
    'use server'

    const session = await getSession()
    if (!session) return

    const target = await prisma.user.findUnique({
      where: { id: targetId },
      select: { createdById: true },
    })
    if (!target) return

    const canManage = session.role === 'admin' || target.createdById === session.userId
    if (!canManage) return

    const actorPerms = await getActorPermissions(session)

    const existing = await prisma.userPermission.findMany({
      where: { userId: targetId },
    })

    const toRevoke: Array<{ resource: string; action: string }> = []

    await prisma.$transaction(async (tx) => {
      for (const resource of RESOURCES) {
        for (const action of ACTIONS) {
          const perm: Permission = `${resource}:${action}`
          if (!actorPerms.includes(perm)) continue

          const granted = formData.get(`perm_${resource}_${action}`) === 'on'
          const existingRow = existing.find(
            (e) => e.resource === resource && e.action === action && e.site === null
          )

          if (existingRow) {
            if (existingRow.granted && !granted) toRevoke.push({ resource, action })
            await tx.userPermission.update({
              where: { id: existingRow.id },
              data: { granted, grantedById: session.userId },
            })
          } else if (granted) {
            await tx.userPermission.create({
              data: { userId: targetId, resource, action, site: null, granted: true, grantedById: session.userId },
            })
          }
        }
      }
    })

    if (toRevoke.length > 0) {
      const descendants = await getDescendants(targetId)
      if (descendants.length > 0) {
        for (const { resource, action } of toRevoke) {
          await prisma.userPermission.updateMany({
            where: { userId: { in: descendants }, resource, action, site: null, granted: true },
            data: { granted: false },
          })
        }
      }
    }

    redirect(`/users/${targetId}`)
  }

  async function deleteUser() {
    'use server'

    const session = await getSession()
    if (!session) return

    if (targetId === session.userId) return

    const target = await prisma.user.findUnique({
      where: { id: targetId },
      select: { createdById: true },
    })
    if (!target) return

    const canDelete = session.role === 'admin' || target.createdById === session.userId
    if (!canDelete) return

    await prisma.user.delete({ where: { id: targetId } })
    redirect('/users')
  }

  const isSelf = session.userId === targetId

  return (
    <>
      <header className="eco-topbar">
        <span className="eco-topbar__title">{target.name}</span>
        <div className="eco-topbar__actions">
          <a href="/users" className="eco-btn-secondary">
            <i className="ti ti-arrow-left" />
            Voltar
          </a>
        </div>
      </header>

      <div className="eco-content eco-content--stack">

        <div className="eco-form-card">
          <h2>Informações</h2>
          <div className="eco-info-grid">
            <div>
              <div className="eco-section-title eco-section-title--compact">Nome</div>
              <div>{target.name}</div>
            </div>
            <div>
              <div className="eco-section-title eco-section-title--compact">Função</div>
              <span className={`eco-badge eco-badge--${target.role}`}>
                {target.role === 'admin'
                  ? <><i className="ti ti-shield-check" /> Admin</>
                  : <><i className="ti ti-user" /> Usuário</>}
              </span>
            </div>
            <div>
              <div className="eco-section-title eco-section-title--compact">Criado em</div>
              <div className="eco-text-muted">
                {target.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        <div className="eco-form-card">
          <h2>Permissões</h2>
          <form action={updatePermissions}>
            <div className="eco-perm-grid eco-perm-grid--mb">
              {RESOURCES.map((resource) => (
                <div key={resource} className="eco-perm-card">
                  <div className="eco-perm-card__resource">{resource}</div>
                  <div className="eco-perm-card__actions">
                    {ACTIONS.map((action) => {
                      const perm: Permission = `${resource}:${action}`
                      const actorCanEdit = actorPermissions.includes(perm)
                      return (
                        <label
                          key={action}
                          className={`eco-perm-toggle${!actorCanEdit ? ' eco-perm-toggle--disabled' : ''}`}
                        >
                          <input
                            type="checkbox"
                            name={`perm_${resource}_${action}`}
                            defaultChecked={targetPermissions.includes(perm)}
                            disabled={!actorCanEdit}
                          />
                          {action === 'read' ? 'Leitura' : 'Escrita'}
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button type="submit" className="eco-btn-primary eco-btn-primary--inline">
              Salvar permissões
            </button>
          </form>
        </div>

        {!isSelf && (
          <div className="eco-form-card eco-form-card--danger">
            <h2>Zona de perigo</h2>
            <p className="eco-form-hint">
              Remover este usuário é permanente e irrecuperável.
            </p>
            <form action={deleteUser}>
              <button type="submit" className="eco-btn-danger">
                <i className="ti ti-trash" />
                Remover usuário
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
