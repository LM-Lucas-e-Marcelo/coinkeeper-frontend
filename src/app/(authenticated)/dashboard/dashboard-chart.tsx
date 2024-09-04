'use client'
import { IDay } from '@/http/dashboard/get-month-data'
import { formatCurrency } from '@/utils/format-currency'

import { generateLabel } from '@/utils/generate-graph-label'
import Chart from 'react-apexcharts'

interface DashboardChartProps {
  days?: IDay[]
}

export function DashboardChart({ days }: DashboardChartProps) {
  if (!days) return

  const { categories, seriesData } = days?.reduce<{
    seriesData: number[]
    categories: string[]
  }>(
    (acc, { day, value }) => {
      acc.seriesData.push(value)
      acc.categories.push(day.split('-').reverse().join('/'))
      return acc
    },
    { seriesData: [], categories: [] },
  )

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      formatter: (val: number) => {
        return formatCurrency(val)
      },
    },
    tooltip: {
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
      }: {
        series: Array<number[]>
        seriesIndex: number
        dataPointIndex: number
      }) => {
        return generateLabel(
          formatCurrency(series[seriesIndex][dataPointIndex]),
        )
      },
    },
  }
  const series = [
    {
      name: 'Recebido',
      data: seriesData,
    },
  ]

  return (
    <div>
      <Chart
        options={options as never}
        series={series}
        type="bar"
        width="100%"
        height={600}
      />
    </div>
  )
}
