import prisma from './prisma'
import type { UserPermission } from '@prisma/client'

export const RESOURCES = ['users', 'products', 'metrics'] as const
export const ACTIONS = ['read', 'write'] as const

export type Resource = (typeof RESOURCES)[number]
export type Action = (typeof ACTIONS)[number]
export type Permission = `${Resource}:${Action}`
export type Role = 'admin' | 'user'

export function resolvePermissions(
  rows: Pick<UserPermission, 'resource' | 'action' | 'site' | 'granted'>[],
  site?: string
): Permission[] {
  return rows
    .filter(
      (r) =>
        r.granted &&
        (r.site === null || r.site === site) &&
        RESOURCES.includes(r.resource as Resource) &&
        ACTIONS.includes(r.action as Action)
    )
    .map((r) => `${r.resource}:${r.action}` as Permission)
}

export function hasPermission(permissions: Permission[], resource: Resource, action: Action): boolean {
  return permissions.includes(`${resource}:${action}`)
}

export function allPermissions(): Permission[] {
  return RESOURCES.flatMap((r) => ACTIONS.map((a) => `${r}:${a}` as Permission))
}

export async function getActorPermissions(session: { userId: string; role: string }): Promise<Permission[]> {
  if (session.role === 'admin') return allPermissions()
  const rows = await prisma.userPermission.findMany({ where: { userId: session.userId } })
  return resolvePermissions(rows)
}

// Retorna todos os IDs de usuários criados por userId (diretos e transitivos)
export async function getDescendants(userId: string): Promise<string[]> {
  const result = await prisma.$queryRaw<{ id: string }[]>`
    WITH RECURSIVE descendants AS (
      SELECT id FROM users WHERE created_by = ${userId}::uuid
      UNION ALL
      SELECT u.id FROM users u INNER JOIN descendants d ON u.created_by = d.id
    )
    SELECT id FROM descendants
  `
  return result.map((r) => r.id)
}

// Revoga uma permissão e propaga a revogação para todos os descendentes
export async function revokePermissionCascade(
  userId: string,
  resource: string,
  action: string,
  site: string | null
): Promise<void> {
  const descendants = await getDescendants(userId)
  const allTargets = [userId, ...descendants]

  await prisma.userPermission.updateMany({
    where: {
      userId: { in: allTargets },
      resource,
      action,
      site: site ?? null,
      granted: true,
    },
    data: { granted: false },
  })
}

// Upsert atômico para permissões com site nullable
export async function upsertPermission(params: {
  userId: string
  resource: string
  action: string
  site: string | null
  granted: boolean
  grantedById: string
}): Promise<void> {
  const { userId, resource, action, site, granted, grantedById } = params

  let wasGranted = false

  await prisma.$transaction(async (tx) => {
    const existing = await tx.userPermission.findFirst({
      where: { userId, resource, action, site },
    })

    if (existing) {
      wasGranted = existing.granted
      await tx.userPermission.update({
        where: { id: existing.id },
        data: { granted, grantedById },
      })
    } else {
      await tx.userPermission.create({
        data: { userId, resource, action, site, granted, grantedById },
      })
    }
  })

  if (wasGranted && !granted) {
    const descendants = await getDescendants(userId)
    if (descendants.length > 0) {
      await prisma.userPermission.updateMany({
        where: { userId: { in: descendants }, resource, action, site, granted: true },
        data: { granted: false },
      })
    }
  }
}
