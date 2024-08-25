import { MonthCard } from './month-card'
import { TotalCard } from './total-card'

export interface DashboardProps {
  searchParams: {
    [key: string]: string
  }
}
export default function Dashboard({ searchParams }: DashboardProps) {
  return (
    <div className="flex gap-3 flex-col w-full justify-center items-center">
      <header className="mt-10 text-3xl text-primary">Dashboard</header>
      <TotalCard />
      <MonthCard searchParams={searchParams} />
    </div>
  )
}
