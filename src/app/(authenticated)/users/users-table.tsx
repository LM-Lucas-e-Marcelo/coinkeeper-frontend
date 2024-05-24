import { Table } from '@/components/table'
import { useUsers } from '@/hooks/users/useUsers'

import { UpdateUserModal } from '@/components/modals/users/update-user-modal'
import { DeleteUserModal } from '@/components/modals/users/delete-user-modal'
import { TableActions } from './users-table-actions'

export async function UsersTable() {
  const { users } = await useUsers()

  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Nome</Table.Cell>
            <Table.Cell>Grupo</Table.Cell>
            <Table.Cell>Usuário</Table.Cell>
            <Table.Cell>Ações</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users?.items.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role.name}</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>
                <TableActions user={user} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <UpdateUserModal users={users} />
      <DeleteUserModal />
    </>
  )
}
