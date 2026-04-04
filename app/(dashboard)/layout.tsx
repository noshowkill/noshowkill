import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Commentaire temporaire : La connexion à Supabase a été désactivée
  // pour permettre une preview statique du dashboard sans erreurs de DB.
  
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Navigation bas de page mobile */}
      <main className="flex-1 pb-20 md:pb-0 md:ml-64">
        {children}
      </main>
      <Sidebar />
    </div>
  )
}
