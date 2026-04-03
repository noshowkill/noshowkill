import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ReservationCard from '@/components/dashboard/ReservationCard'
import StatsBar from '@/components/dashboard/StatsBar'
import { getTonightReservations } from '@/lib/services/reservations'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!restaurant) redirect('/onboarding')

  const reservations = await getTonightReservations(restaurant.id)

  const stats = {
    total: reservations.length,
    covers: reservations.reduce((acc, r: any) => acc + r.covers, 0),
    red: reservations.filter((r: any) => r.score_color === 'red').length,
    orange: reservations.filter((r: any) => r.score_color === 'orange').length,
    green: reservations.filter((r: any) => r.score_color === 'green').length,
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="px-4 pt-6 pb-2">
        <p className="text-zinc-400 text-sm">Bonsoir 👋</p>
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        <p className="text-zinc-400 text-sm mt-1">
          {new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', day: 'numeric', month: 'long'
          })}
        </p>
      </div>

      {/* Stats bar */}
      <StatsBar stats={stats} />

      {/* Liste réservations */}
      <div className="px-4 pb-24 mt-4 space-y-3">
        {reservations.length === 0 ? (
          <EmptyState />
        ) : (
          reservations.map((reservation: any) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
            />
          ))
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">🎉</div>
      <p className="text-white font-semibold text-lg">Aucune réservation ce soir</p>
      <p className="text-zinc-400 text-sm mt-2">
        Les réservations apparaîtront automatiquement dès réception des emails.
      </p>
    </div>
  )
}
