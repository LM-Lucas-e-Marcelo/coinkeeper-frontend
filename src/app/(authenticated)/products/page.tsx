import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { LuFilter } from '@/assets/icons'
import { ProductsTable } from './products-table'
import { Suspense } from 'react'
import { TableLoading } from '@/components/loadings/table-loading'
import { ModalButton } from '@/components/modal-button'

export interface ProductsProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Products({ searchParams }: ProductsProps) {
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
            <ModalButton params={{ management_product: true }}>
              <Button>Cadastrar</Button>
            </ModalButton>
          </ButtonGroup>
        </PageHeader>
        <ProductsTable searchParams={searchParams} />
      </Suspense>
    </>
  )
}
