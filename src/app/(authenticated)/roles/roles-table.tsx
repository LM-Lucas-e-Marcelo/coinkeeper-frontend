import { Table } from '@/components/table'
import { TableActions } from './roles-table-actions'
import { useRoles } from '@/hooks/use-roles'
import { DeleteRoleModal } from '@/components/modals/roles/delete-role-modal'

interface UsersTableProps {
  searchParams: {
    per?: string
    content?: string
  }
}

export async function RolesTable({ searchParams }: UsersTableProps) {
  const { roles } = await useRoles(searchParams)
  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Nome</Table.Cell>
            <Table.Cell>Ações</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {roles?.items.map((role) => (
            <Table.Row key={role.id}>
              <Table.Cell>{role.name}</Table.Cell>
              <Table.Cell>
                <TableActions role={role} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {/* <UpdateUserModal users={users} /> */}
      <DeleteRoleModal />
    </>
  )
}
