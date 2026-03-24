import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // The code will be exchanged for a session by the middleware
    // Redirect to dashboard after successful email confirmation
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
  }

  // If no code, redirect to login
  return NextResponse.redirect(new URL('/auth/login', requestUrl.origin))
}
