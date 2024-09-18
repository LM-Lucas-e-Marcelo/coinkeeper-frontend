'use client'
import { formatScore } from '@/utils/format-score'
import { formatScoreColors } from '@/utils/format-score-color'
import Chart from 'react-apexcharts'
interface CustomerScoreProps {
  customerScore?: number
}

export const CustomerScore = ({ customerScore }: CustomerScoreProps) => {
  if (!customerScore) return

  const options = {
    fill: {
      colors: [formatScoreColors(customerScore)],
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        track: {
          margin: -5,
        },
      },
    },
  }

  return (
    <div className="flex items-center justify-start">
      <Chart
        options={options as never}
        series={[formatScore(customerScore)]}
        type="radialBar"
        width="130px"
        height="130px"
      />
      <div className="flex flex-col items-center ml-[-10px] mt-[-5px]">
        <span className="text-primary text-2xl">Score</span>
        <span className="text-xl">{customerScore}</span>
      </div>
    </div>
  )
}
