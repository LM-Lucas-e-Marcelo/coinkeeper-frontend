import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { LuFilter } from '@/assets/icons'
import { ExpensesTable } from './expenses-table'
import { Suspense } from 'react'
import { TableLoading } from '@/components/loadings/table-loading'
import { ModalButton } from '@/components/modal-button'

export interface ExpensesProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Expenses({ searchParams }: ExpensesProps) {
  const filterOptions = [{ name: 'Nome', value: 'name' }]

  return (
    <>
      <Suspense fallback={<TableLoading />}>
        <PageHeader>
          <Filter options={filterOptions} />
          <ButtonGroup>
            <Button isIcon>
              <LuFilter size={20} />
            </Button>
            <ModalButton params={{ management_expense: true }}>
              <Button>Cadastrar</Button>
            </ModalButton>
          </ButtonGroup>
        </PageHeader>
        <ExpensesTable searchParams={searchParams} />
      </Suspense>
    </>
  )
}
