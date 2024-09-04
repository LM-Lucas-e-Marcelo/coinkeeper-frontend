import { getRegions } from '@/http/regions/get-regions'
import { DashboardFilters } from './dashboard-filters'
import { getCompanies } from '@/http/companies/get-companies'
import { DashboardCards } from './dashboard-cards'
import { DashboardChart } from './dashboard-chart'
import { getMonthData } from '@/http/dashboard/get-month-data'
import { getTotalData } from '@/http/dashboard/get-total-data'

interface DashboardProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const { regions } = await getRegions()
  const { companies } = await getCompanies()
  const { data } = await getMonthData({ searchParams })
  const { total } = await getTotalData({ searchParams })

  return (
    <div className="flex flex-col gap-3">
      <DashboardFilters regions={regions} companies={companies} />
      <DashboardCards data={data} total={total} />
      <DashboardChart days={data?.sold.totalReceivedDays} />
    </div>
  )
}
