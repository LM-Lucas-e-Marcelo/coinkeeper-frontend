import { Table } from '@/components/table'
import { getUsers } from '@/hooks/useUsers'

export async function UsersTable() {
  const users = await getUsers()
  return (
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
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
