import { getRegions } from '@/http/regions/get-regions'
import { MonthCard } from './month-card/MonthCard'
import { TotalCard } from './total-card'
import { DashboardFilters } from './dashboard-filters'
import { getCompanies } from '@/http/companies/get-companies'

interface DashboardProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const { regions } = await getRegions()
  const { companies } = await getCompanies()
  return (
    <div className="flex gap-3 flex-col w-full mt-10">
      <DashboardFilters regions={regions} companies={companies} />
      <div className="flex flex-col gap-3 w-full items-center">
        <TotalCard />
        <MonthCard searchParams={searchParams} />
      </div>
    </div>
  )
}
