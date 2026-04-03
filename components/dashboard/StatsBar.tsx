interface StatsBarProps {
  stats: {
    total: number
    covers: number
    red: number
    orange: number
    green: number
  }
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="mx-4 mt-4 bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-zinc-400 text-xs mt-0.5">réservations</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.covers}</p>
          <p className="text-zinc-400 text-xs mt-0.5">couverts</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.orange + stats.red}</p>
          <p className="text-zinc-400 text-xs mt-0.5">à risque</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-1 items-center">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-semibold text-white">{stats.green}</span>
            <span className="w-2 h-2 rounded-full bg-orange-500 ml-1"></span>
            <span className="text-sm font-semibold text-white">{stats.orange}</span>
            <span className="w-2 h-2 rounded-full bg-red-500 ml-1"></span>
            <span className="text-sm font-semibold text-white">{stats.red}</span>
          </div>
          <p className="text-zinc-400 text-xs mt-0.5">scores</p>
        </div>
      </div>
    </div>
  )
}
