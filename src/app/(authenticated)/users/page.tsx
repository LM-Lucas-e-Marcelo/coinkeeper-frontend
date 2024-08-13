import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { LuFilter } from '@/assets/icons'
import { UsersTable } from './users-table'
import { Suspense } from 'react'
import { ModalButton } from '@/components/modal-button'
import { TableLoading } from '@/components/loadings/table-loading'

export interface UsersProps {
  searchParams: {
    [key: string]: string
  }
}

export default async function Users({ searchParams }: UsersProps) {
  const filterOptions = [
    { name: 'Nome', value: 'name' },
    { name: 'Usuário', value: 'username' },
  ]

  return (
    <>
      <Suspense fallback={<TableLoading />}>
        <PageHeader>
          <Filter options={filterOptions} />
          <ButtonGroup>
            <Button isIcon>
              <LuFilter size={20} />
            </Button>
            <ModalButton params={{ management_user: true }}>
              <Button>Cadastrar</Button>
            </ModalButton>
          </ButtonGroup>
        </PageHeader>
        <UsersTable searchParams={searchParams} />
      </Suspense>
    </>
  )
}
