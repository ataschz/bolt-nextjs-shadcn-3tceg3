import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth-token') // Ajusta según tu implementación de auth
  const path = request.nextUrl.pathname
  const userRole = request.cookies.get('user-role')?.value

  // Rutas públicas
  if (path === '/' || path === '/auth/login' || path === '/auth/register') {
    if (isAuthenticated) {
      // Si está autenticado, redirigir según rol
      return NextResponse.redirect(new URL(
        userRole === 'contractor' ? '/contractor' : '/company',
        request.url
      ))
    }
    return NextResponse.next()
  }

  // Rutas protegidas
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Validación de rutas por rol
  if (path.startsWith('/contractor') && userRole !== 'contractor') {
    return NextResponse.redirect(new URL('/company', request.url))
  }

  if (path.startsWith('/company') && userRole !== 'client') {
    return NextResponse.redirect(new URL('/contractor', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}