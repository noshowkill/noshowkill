import { PartyPopper } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="px-6 pt-10 pb-6">
        <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm mb-1 uppercase tracking-wider">
          {new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', day: 'numeric', month: 'long'
          })}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Bonsoir 👋 Bienvenue sur NoShow<span className="text-green-500">Kill</span>
        </h1>
      </div>

      {/* Stats bar (mock UI) */}
      <div className="mx-6 mb-8 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="grid grid-cols-4 gap-4 text-center divide-x divide-zinc-100 dark:divide-zinc-800">
          <div>
            <p className="text-3xl font-bold">0</p>
            <p className="text-zinc-500 text-xs mt-1 font-medium">RÉSERVATIONS</p>
          </div>
          <div>
            <p className="text-3xl font-bold">0</p>
            <p className="text-zinc-500 text-xs mt-1 font-medium">COUVERTS</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-500">0</p>
            <p className="text-zinc-500 text-xs mt-1 font-medium">À RISQUE</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex gap-2 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span className="text-sm font-semibold">0</span>
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 ml-1"></span>
              <span className="text-sm font-semibold">0</span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 ml-1"></span>
              <span className="text-sm font-semibold">0</span>
            </div>
            <p className="text-zinc-500 text-xs mt-1 font-medium">SCORES</p>
          </div>
        </div>
      </div>

      {/* Liste réservations (Empty State) */}
      <div className="flex-1 flex flex-col items-center justify-center pb-24 text-center px-4">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
          <PartyPopper className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Aucune réservation ce soir</h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
          Profitez du calme du service ! Dès réception de vos e-mails de réservation, l'IA analysera et synchronisera automatiquement chaque client ici.
        </p>
      </div>
    </div>
  )
}
