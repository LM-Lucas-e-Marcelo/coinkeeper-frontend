import { Table } from '@/components/Table'
import { api } from '@/services/api'
import { IUsers } from '@/types/users'

async function getUsers(): Promise<IUsers> {
  const response = await api('/users/search')

  const users = await response.json()

  return users
}

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
