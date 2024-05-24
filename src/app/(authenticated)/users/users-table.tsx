import { Table } from '@/components/table'
import { useUsers } from '@/hooks/users/useUsers'
import { FiEdit, FiTrash2 } from '@/assets/icons'
import { ButtonGroup } from '@/components/form/button-group'
import Link from 'next/link'
import { UpdateUserModal } from '@/components/modals/users/update-user-modal'

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
                {
                  <ButtonGroup>
                    <Link href={`?update_user=true&user=${user.id}`}>
                      <FiEdit size={20} className="text-orange" />
                    </Link>
                    <Link href={`?delete_user=true&user=${user.name}`}>
                      <FiTrash2 size={20} className="text-red" />
                    </Link>
                  </ButtonGroup>
                }
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <UpdateUserModal users={users} />
    </>
  )
}
