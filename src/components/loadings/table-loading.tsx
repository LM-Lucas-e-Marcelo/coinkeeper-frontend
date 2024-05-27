import { Table } from '../table'

const numberOfRows = 20

const rows = Array.from({ length: numberOfRows })

export const TableLoading = () => {
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
        {rows.map((_, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-300 w-[90%] animate-pulse" />
            </Table.Cell>
            <Table.Cell>
              <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-300 w-[80%] animate-pulse" />
            </Table.Cell>
            <Table.Cell>
              <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-300 w-[90%] animate-pulse" />
            </Table.Cell>
            <Table.Cell>
              <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-300 w-[60%] animate-pulse" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
