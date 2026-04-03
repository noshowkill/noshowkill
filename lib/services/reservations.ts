import { createClient } from '@/lib/supabase/server'

export async function getTonightReservations(restaurantId: string) {
  const supabase = await createClient()
  
  const today = new Date()
  const date = today.toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('reservations')
    .select('*, clients(name, noshow_rate, risk_level)')
    .eq('restaurant_id', restaurantId)
    .gte('reserved_at', `${date}T00:00:00`)
    .lte('reserved_at', `${date}T23:59:59`)
    .order('reserved_at', { ascending: true })

  if (error) {
    console.error("Erreur lors de la récupération des réservations du soir :", error.message)
    return []
  }

  return data || []
}
