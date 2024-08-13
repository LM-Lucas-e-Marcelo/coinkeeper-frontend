import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { LuFilter } from '@/assets/icons'
import { CustomersTable } from './customers-table'
import { Suspense } from 'react'
import { TableLoading } from '@/components/loadings/table-loading'
import { ModalButton } from '@/components/modal-button'

export interface CustomersProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Customers({ searchParams }: CustomersProps) {
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
            <ModalButton params={{ management_customer: true }}>
              <Button>Cadastrar</Button>
            </ModalButton>
          </ButtonGroup>
        </PageHeader>
        <CustomersTable searchParams={searchParams} />
      </Suspense>
    </>
  )
}
