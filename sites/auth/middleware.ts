import { jwtVerify } from 'jose'
import { NextResponse, type NextRequest } from 'next/server'
import { COOKIE, secret } from '@/lib/session-config'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicPath = pathname === '/login'
  const token = request.cookies.get(COOKIE)?.value

  if (!token) {
    if (isPublicPath) return NextResponse.next()
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(token, secret())
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/users', request.url))
    }
    return NextResponse.next()
  } catch {
    const response = isPublicPath
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete(COOKIE)
    return response
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
