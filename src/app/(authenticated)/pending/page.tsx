import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { PendingCustomersTable } from './pending-customers-table'
import { Suspense } from 'react'
import { TableLoading } from '@/components/loadings/table-loading'
import { PendingExpensesTable } from './pending-expenses-table'
import { ChangeTableButton } from './change-table-button'
import { getPendingCustomers } from '@/http/pending/get-pending-customers'
import { getPendingExpenses } from '@/http/pending/get-pending-expenses'
import { formatCurrency } from '@/utils/format-currency'

export interface PendingProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Pending({ searchParams }: PendingProps) {
  const { pendingCustomers } = await getPendingCustomers(searchParams)
  const { pendingExpenses } = await getPendingExpenses(searchParams)
  const filterOptions = [{ name: 'Nome', value: 'name' }]

  const isExpenseTable = searchParams.table === 'expenses'

  return (
    <>
      <Suspense fallback={<TableLoading />}>
        <PageHeader>
          <Filter options={filterOptions} />
          <div className="flex gap-3 mt-5">
            <span>
              <p className="text-sm">
                {isExpenseTable ? 'Despesas' : 'Clientes com débito'}
              </p>
              <p className="text-lg">
                {isExpenseTable
                  ? pendingExpenses.totalExpensesInDebt
                  : pendingCustomers.totalClientsInDebt}
              </p>
            </span>
            <div className="w-[1px] bg-primary" />
            <span>
              <p className="text-sm">
                {isExpenseTable ? 'Total de despesas' : 'Total a receber'}
              </p>
              <p className="text-lg">
                {isExpenseTable
                  ? formatCurrency(pendingExpenses.totalDue)
                  : formatCurrency(pendingCustomers.totalReceiver)}
              </p>
            </span>
          </div>
          <ChangeTableButton />
        </PageHeader>
        {isExpenseTable ? (
          <PendingExpensesTable pendingExpenses={pendingExpenses} />
        ) : (
          <PendingCustomersTable pendingCustomers={pendingCustomers} />
        )}
      </Suspense>
    </>
  )
}
