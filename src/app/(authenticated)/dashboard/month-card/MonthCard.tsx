'use client'
import { IMonthData, getMonthData } from '@/http/dashboard/get-month-data'
import { MonthCardHeader } from './month-card-header'
import { formatCurrency } from '@/utils/format-currency'
import { useEffect, useState } from 'react'
import { MonthCardProps } from '.'

export function MonthCard({ searchParams }: MonthCardProps) {
  const [monthData, setMonthData] = useState<IMonthData | null>(null)

  useEffect(() => {
    getMonthData(searchParams).then(({ data }) => {
      setMonthData(data)
    })
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 w-[500px] border border-primary rounded-md">
        <MonthCardHeader />
        <div className="flex flex-col gap-3 p-3">
          <span className="flex justify-between">
            <div>
              <p>Vendido</p>
              <strong className="text-2xl text-green-500">
                {formatCurrency(monthData?.sold.totalSold)}{' '}
              </strong>
            </div>
            <div>
              <p>Despesas</p>
              <strong className="text-2xl text-red">
                {' '}
                {formatCurrency(monthData?.expense.totalExpense)}
              </strong>
            </div>
          </span>
          <span className="flex justify-between">
            <div>
              <p>Recebido</p>
              <strong className="text-2xl text-green-500">
                {formatCurrency(monthData?.sold.totalReceived)}
              </strong>
            </div>
            <div>
              <p>Pago</p>
              <strong className="text-2xl text-red">
                {formatCurrency(monthData?.expense.totalPaid)}
              </strong>
            </div>
          </span>
          <div className="w-full h-[1px] bg-primary" />
          <span className="flex justify-between">
            <div>
              <p>Saldo do Período</p>
              <strong className="text-2xl text-primary">
                {formatCurrency(monthData?.totalPeriod)}
              </strong>
            </div>
            <div>
              <p>Despesas da empresa</p>
              <strong className="text-2xl text-primary">
                {formatCurrency(monthData?.expense.totalCompanyExpense)}
              </strong>
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}
