import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { COOKIE, secret } from './session-config'

const EXPIRES_SECONDS = 60 * 60 * 24 * 7 // 7 dias

export interface SessionPayload {
  userId: string
  role: 'admin' | 'user'
}

export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret())

  const store = await cookies()
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: EXPIRES_SECONDS,
    path: '/',
  })
}

export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const store = await cookies()
  const token = store.get(COOKIE)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, secret())
    return payload as SessionPayload
  } catch {
    return null
  }
})

export async function deleteSession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE)
}
