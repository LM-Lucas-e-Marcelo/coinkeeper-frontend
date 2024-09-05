import { IMonthData } from '@/http/dashboard/get-month-data'
import { ITotalData } from '@/http/dashboard/get-total-data'
import { formatCurrency } from '@/utils/format-currency'

interface IMonthDataProps {
  data: IMonthData | null
  total: ITotalData
}

export function DashboardCards({ data, total }: IMonthDataProps) {
  return (
    <>
      <div className="flex gap-3 flex-wrap">
        <div className="p-5 border border-primary rounded-md flex gap-6 flex-1 justify-between">
          <span className="flex flex-col justify-between">
            <p>A Receber</p>
            <strong className="text-green-500 text-xl">
              {formatCurrency(total.totalReceive)}
            </strong>
          </span>
          <span className="flex flex-col justify-between">
            <p>A Pagar</p>
            <strong className="text-red text-xl">
              {formatCurrency(total.totalExpense)}
            </strong>
          </span>
        </div>
        <div className="p-5 border border-primary rounded-md flex gap-6 flex-1 justify-between">
          <span className="flex flex-col justify-between">
            <p>Vendido</p>
            <strong className="text-green-500 text-xl">
              {formatCurrency(data?.sold.totalSold)}
            </strong>
          </span>
          <span className="flex flex-col justify-between">
            <p>Recebido</p>
            <strong className="text-green-500 text-xl">
              {formatCurrency(data?.sold.totalReceived)}
            </strong>
          </span>
        </div>
        <div className="p-5 border border-primary rounded-md flex gap-6 flex-1 justify-between">
          <span className="flex flex-col justify-between">
            <p>Despessas</p>
            <strong className="text-red text-xl">
              {formatCurrency(data?.expense.totalExpense)}
            </strong>
          </span>
          <span className="flex flex-col justify-between">
            <p>Despesas da empresa</p>
            <strong className="text-red text-xl">
              {formatCurrency(data?.expense.totalCompanyExpense)}
            </strong>
          </span>
        </div>
        <div className="p-5 border border-primary rounded-md flex gap-6 flex-1 justify-between">
          <span className="flex flex-col justify-between">
            <p>Despesas pagas</p>
            <strong className="text-green-500 text-xl">
              {formatCurrency(data?.expense.totalPaid)}
            </strong>
          </span>
          <span className="flex flex-col justify-between">
            <p>Total de despesas</p>
            <strong className="text-red text-xl">
              {formatCurrency(data?.expense.totalExpenseWithCompany)}
            </strong>
          </span>
        </div>
      </div>
      <div className="p-5 border border-primary rounded-md flex gap-6 flex-1 justify-center items-center">
        <span>
          <p>Lucro no período</p>
          <strong className="text-primary text-xl">
            {formatCurrency(data?.totalPeriod)}
          </strong>
        </span>
      </div>
    </>
  )
}
