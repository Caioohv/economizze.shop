import bcrypt from 'bcryptjs'
import prisma from './prisma'
import type { User } from '@prisma/client'

export type { User }

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } })
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } })
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}
