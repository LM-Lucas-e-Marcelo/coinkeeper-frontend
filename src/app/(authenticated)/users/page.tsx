import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { LuFilter } from '@/assets/icons'
import { UsersTable } from './users-table'
import { Suspense } from 'react'
import { ModalButon } from '@/components/modal-button'
import { TableLoading } from '@/components/loadings/table-loading'

export interface UsersProps {
  searchParams: {
    per?: string
    content?: string
  }
}

export default async function Users({ searchParams }: UsersProps) {
  const filterOptions = [
    { name: 'Nome', value: 'name' },
    { name: 'Usuário', value: 'username' },
  ]

  return (
    <>
      <PageHeader>
        <Filter options={filterOptions} />
        <ButtonGroup>
          <Button isIcon>
            <LuFilter size={20} />
          </Button>
          <ModalButon params={{ management_user: true }}>
            <Button>Cadastrar</Button>
          </ModalButon>
        </ButtonGroup>
      </PageHeader>
      <Suspense fallback={<TableLoading />}>
        <UsersTable searchParams={searchParams} />
      </Suspense>
    </>
  )
}
