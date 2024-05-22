import { NextRequest, NextResponse } from 'next/server'

const userRoutes = ['/users']
const protectedRoutes = [...userRoutes]

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.has('token')

  if (hasToken && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL('/', request.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}
