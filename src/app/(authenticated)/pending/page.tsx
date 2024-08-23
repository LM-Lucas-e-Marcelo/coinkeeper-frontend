import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { PendingCustomersTable } from './pending-customers-table'
import { Suspense } from 'react'
import { TableLoading } from '@/components/loadings/table-loading'
import { PendingExpensesTable } from './pending-expenses-table'
import { ChangeTableButton } from './change-table-button'

export interface PendingProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Pending({ searchParams }: PendingProps) {
  const filterOptions = [{ name: 'Nome', value: 'name' }]

  return (
    <>
      <Suspense fallback={<TableLoading />}>
        <PageHeader>
          <Filter options={filterOptions} />
          <ChangeTableButton />
        </PageHeader>
        {searchParams.table === 'expenses' ? (
          <PendingExpensesTable searchParams={searchParams} />
        ) : (
          <PendingCustomersTable searchParams={searchParams} />
        )}
      </Suspense>
    </>
  )
}
