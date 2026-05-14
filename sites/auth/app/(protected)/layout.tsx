import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import prisma from '@/lib/prisma'
import Sidebar from '@/components/Sidebar'
import '@/app/auth.css'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true },
  })
  if (!user) redirect('/login')

  return (
    <div className="eco-admin">
      <Sidebar userName={user.name} userEmail={user.email} />
      <div className="eco-main">{children}</div>
    </div>
  )
}
