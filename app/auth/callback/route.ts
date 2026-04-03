import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Le flow standard redirigera nativement vers dashboard si on utilise redirect dans le login,
  // ou on l'intercepte via ce paramètre 'next'
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Pour forcer l'URL absolu vers Vercel si besoin :
      // return NextResponse.redirect(`https://noshowkill-ebon.vercel.app${next}`)
      // En local origin suffira
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?message=Could+not+authenticate+with+Google`)
}
