'use server'

import { getUserByEmail, verifyPassword } from '@/lib/auth'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function login(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const email = (formData.get('email') as string).trim().toLowerCase()
  const password = formData.get('password') as string

  const user = await getUserByEmail(email)
  if (!user || !(await verifyPassword(password, user.password))) {
    return 'E-mail ou senha inválidos.'
  }

  await createSession({ userId: user.id, role: user.role })
  redirect('/users')
}
