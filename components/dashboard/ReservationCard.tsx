'use client'

import { useState } from 'react'
import ScoreBadge from './ScoreBadge'

interface Reservation {
  id: string
  client_name: string
  client_phone?: string
  covers: number
  reserved_at: string
  source: string
  status: string
  noshow_score?: number
  score_color?: 'green' | 'orange' | 'red'
  score_factors?: Array<{
    name: string
    impact: string
    detail: string
  }>
  sms_sent: boolean
}

interface ReservationCardProps {
  reservation: Reservation
}

export default function ReservationCard({ reservation }: ReservationCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState(reservation.status)

  const time = new Date(reservation.reserved_at).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const sourceIcon: Record<string, string> = {
    thefork: '🍴',
    zenchef: '📋',
    phone: '📞',
    email: '📧',
    manual: '✏️',
  }

  const statusColor: Record<string, string> = {
    confirmed: 'text-zinc-400',
    reminded: 'text-blue-400',
    arrived: 'text-green-400',
    noshow: 'text-red-400',
    cancelled: 'text-zinc-600',
  }

  const statusLabel: Record<string, string> = {
    confirmed: 'Confirmé',
    reminded: 'Rappelé',
    arrived: 'Arrivé ✓',
    noshow: 'No-show',
    cancelled: 'Annulé',
  }

  async function markAs(newStatus: string) {
    await fetch(`/api/reservations/${reservation.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setStatus(newStatus)
  }

  return (
    <div
      className={`bg-zinc-900 rounded-2xl border transition-all ${
        reservation.score_color === 'red'
          ? 'border-red-500/40'
          : reservation.score_color === 'orange'
          ? 'border-orange-500/30'
          : 'border-zinc-800'
      }`}
    >
      {/* Ligne principale */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Score badge */}
        <ScoreBadge
          score={reservation.noshow_score}
          color={reservation.score_color}
        />

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-white truncate">{reservation.client_name}</p>
            <span className="text-xs">{sourceIcon[reservation.source] || '📝'}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-zinc-400 text-sm">{time}</p>
            <span className="text-zinc-600">·</span>
            <p className="text-zinc-400 text-sm">{reservation.covers} couv.</p>
            {reservation.sms_sent && (
              <>
                <span className="text-zinc-600">·</span>
                <p className="text-blue-400 text-xs">SMS ✓</p>
              </>
            )}
          </div>
        </div>

        {/* Statut */}
        <span className={`text-xs font-medium ${statusColor[status]}`}>
          {statusLabel[status]}
        </span>
      </div>

      {/* Détails expandables */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-zinc-800 pt-3">
          {/* Facteurs de score */}
          {reservation.score_factors && reservation.score_factors.length > 0 && (
            <div className="mb-3">
              <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">Facteurs de risque</p>
              <div className="space-y-1.5">
                {reservation.score_factors.map((factor, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-xs mt-0.5">
                      {factor.impact === 'positive' ? '🟢' : factor.impact === 'negative' ? '🔴' : '⚪'}
                    </span>
                    <div>
                      <span className="text-white text-xs font-medium">{factor.name}</span>
                      <span className="text-zinc-400 text-xs"> — {factor.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions rapides */}
          <div className="flex gap-2 mt-3">
            {status !== 'arrived' && (
              <button
                onClick={() => markAs('arrived')}
                className="flex-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl py-2 text-sm font-medium"
              >
                ✓ Arrivé
              </button>
            )}
            {status !== 'noshow' && (
              <button
                onClick={() => markAs('noshow')}
                className="flex-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl py-2 text-sm font-medium"
              >
                ✗ No-show
              </button>
            )}
            {reservation.client_phone && (
              <a
                href={`tel:${reservation.client_phone}`}
                className="bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-xl py-2 px-4 text-sm font-medium"
              >
                📞
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
