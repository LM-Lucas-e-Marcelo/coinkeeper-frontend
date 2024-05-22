import { Button } from '@/components/Form/Button'
import { ButtonGroup } from '@/components/Form/ButtonGroup'
import { Filter } from '@/components/Form/Filter'
import { PageHeader } from '@/components/PageHeader'
import { LuFilter } from '@/assets/icons'
import { UsersTable } from './table'

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
