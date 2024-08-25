import { getTotalData } from '@/http/dashboard/get-total-data'
import { formatCurrency } from '@/utils/format-currency'

export async function TotalCard() {
  const { data } = await getTotalData()
  return (
    <div className="w-[500px] flex justify-between px-5 py-2 border border-primary rounded-md">
      <span>
        <p>A Receber</p>
        <strong className="text-2xl text-green-500">
          {formatCurrency(data.totalReceive)}
        </strong>
      </span>
      <span>
        <p>A Pagar</p>
        <strong className="text-2xl text-red">
          {formatCurrency(data.totalExpense)}
        </strong>
      </span>
    </div>
  )
}
