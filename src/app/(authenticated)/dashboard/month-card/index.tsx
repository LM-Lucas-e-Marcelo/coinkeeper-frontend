import { getMonthData } from '@/http/dashboard/get-month-data'
import { MonthCardHeader } from './month-card-header'
import { DashboardProps } from '../page'
import { formatCurrency } from '@/utils/format-currency'

export async function MonthCard({ searchParams }: DashboardProps) {
  const { data } = await getMonthData({ date: new Date(searchParams?.date) })
  return (
    <div className="flex flex-col gap-3 w-[500px] border border-primary rounded-md">
      <MonthCardHeader />
      <div className="flex flex-col gap-3 p-3">
        <span className="flex justify-between">
          <div>
            <p>Vendido</p>
            <strong className="text-2xl text-green-500">
              {formatCurrency(data?.sold.totalSold)}{' '}
            </strong>
          </div>
          <div>
            <p>Despesas</p>
            <strong className="text-2xl text-red">
              {' '}
              {formatCurrency(data?.expense.totalExpense)}
            </strong>
          </div>
        </span>
        <span className="flex justify-between">
          <div>
            <p>Recebido</p>
            <strong className="text-2xl text-green-500">
              {formatCurrency(data?.sold.totalReceived)}
            </strong>
          </div>
          <div>
            <p>Pago</p>
            <strong className="text-2xl text-red">
              {formatCurrency(data?.expense.totalPaid)}
            </strong>
          </div>
        </span>
        <div className="w-full h-[1px] bg-primary" />
        <span className="flex justify-between">
          <div>
            <p>Saldo do Período</p>
            <strong className="text-2xl text-primary">100,00</strong>
          </div>
          <div>
            <p>Despesas da empresa</p>
            <strong className="text-2xl text-primary">
              {formatCurrency(data?.expense.companyExpenses)}
            </strong>
          </div>
        </span>
      </div>
    </div>
  )
}
