import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Navigation bas de page mobile */}
      <main className="flex-1 pb-20 md:pb-0 md:ml-64">
        {children}
      </main>
      <Sidebar />
    </div>
  )
}
