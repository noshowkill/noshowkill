import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // On récupère le paramètre "next" (défini dans le redirectTo du login) ou on force /dashboard par défaut
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    
    // Échange du code Google OAuth contre une session valide Supabase (cookies)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Redirection finale vers le dashboard, la session est maintenant active côté SSR
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // En cas d'erreur ou d'absence de code, on renvoie à la page de login avec l'erreur
  return NextResponse.redirect(`${origin}/login?message=Échec+de+l'authentification+Google`)
}
