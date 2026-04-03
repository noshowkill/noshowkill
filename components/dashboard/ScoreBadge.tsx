interface ScoreBadgeProps {
  score?: number
  color?: 'green' | 'orange' | 'red'
}

export default function ScoreBadge({ score, color }: ScoreBadgeProps) {
  if (score === undefined || !color) {
    return (
      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    )
  }

  const styles = {
    green: 'bg-green-500/20 text-green-400 border-green-500/40',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    red: 'bg-red-500/20 text-red-400 border-red-500/40',
  }

  return (
    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${styles[color]}`}>
      <span className="text-lg font-bold">{score}</span>
    </div>
  )
}
