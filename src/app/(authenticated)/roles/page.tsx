import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { LuFilter } from '@/assets/icons'
import { RolesTable } from './roles-table'
import { Suspense } from 'react'
import { ModalButon } from '@/components/modal-button'
import { TableLoading } from '@/components/loadings/table-loading'
import { CreateRoleModal } from '@/components/modals/roles/create-role-modal'

export interface RolesProps {
  searchParams: {
    per?: string
    content?: string
  }
}

export default async function Roles({ searchParams }: RolesProps) {
  const filterOptions = [{ name: 'Nome', value: 'name' }]

  return (
    <>
      <PageHeader>
        <Filter options={filterOptions} />
        <ButtonGroup>
          <Button isIcon>
            <LuFilter size={20} />
          </Button>
          <ModalButon params={{ create_role: true }}>
            <Button>Cadastrar</Button>
          </ModalButon>
        </ButtonGroup>
      </PageHeader>
      <Suspense fallback={<TableLoading />}>
        <RolesTable searchParams={searchParams} />
        <CreateRoleModal />
      </Suspense>
    </>
  )
}
