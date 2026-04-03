import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function RegisterPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams

  const signup = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return redirect('/register?message=Erreur+lors+de+l%27inscription')
    }

    return redirect('/login?message=Compte+créé+avec+succès.+Vous+pouvez+vous+connecter.')
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Rejoindre NoShowKill
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          30 jours gratuits, sans carte bancaire requise.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900 py-8 px-4 border border-zinc-800 shadow sm:rounded-2xl sm:px-10">
          <form className="space-y-6" action={signup}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                Nom du restaurant
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-xl bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Email pro
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-xl bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Mot de passe (min. 6 caractères)
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="appearance-none block w-full px-3 py-2 border border-zinc-700 rounded-xl bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            {searchParams?.message && (
              <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-300 text-sm font-medium">
                {searchParams.message}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-zinc-950 bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-zinc-900 transition-colors cursor-pointer"
              >
                Créer mon compte
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900 text-zinc-400">
                  Déjà inscrit ?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/login"
                className="w-full flex justify-center py-2.5 px-4 border border-zinc-700 rounded-xl shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-zinc-900 transition-colors"
              >
                Se connecter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
