import { formatScore } from '@/utils/format-score'
import { formatScoreColors } from '@/utils/format-score-color'

interface CustomerScoreProps {
  customerScore?: number
}

export const CustomerScore = ({ customerScore }: CustomerScoreProps) => {
  if (!customerScore) return

  return (
    <section className="flex flex-col items-center gap-10">
      <p className="text-3xl">Score: {customerScore}</p>
      <div className="flex gap-3">
        <div className="relative flex flex-col items-end">
          <p className="text-2xl">1000 - </p>
          <p className="text-2xl bottom-[calc(75%-16px)] absolute">750 - </p>
          <p className="text-2xl bottom-[calc(50%-16px)] absolute">500 - </p>
          <p className="text-2xl bottom-[calc(25%-16px)] absolute">250 - </p>
          <p className="text-2xl bottom-[calc(0%-10px)] absolute">0 - </p>
        </div>
        <div className="h-[500px] bg-zinc-300 rounded-full overflow-hidden flex items-end relative">
          <p className="bg-zinc-50 absolute bottom-[calc(75%-2px)] w-full h-1 block" />
          <p className="bg-zinc-50 absolute bottom-[calc(50%-2px)] w-full h-1 block" />
          <p className="bg-zinc-50 absolute bottom-[calc(25%-2px)] w-full h-1 block" />
          <span
            className="w-5 transition-all delay-1000 block"
            style={{
              height: formatScore(customerScore),
              background: formatScoreColors(customerScore),
            }}
          />
        </div>
      </div>
    </section>
  )
}
