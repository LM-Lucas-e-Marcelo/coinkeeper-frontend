import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { LuFilter } from '@/assets/icons'
import { UsersTable } from './users-table'

export default function Users() {
  return (
    <>
      <PageHeader>
        <Filter />
        <ButtonGroup>
          <Button isIcon>
            <LuFilter size={20} />
          </Button>
          <Button>Cadastrar</Button>
        </ButtonGroup>
      </PageHeader>
      <UsersTable />
    </>
  )
}
