import { Table } from '@/components/table'
import { TableActions } from './regions-table-actions'
import { IRegions } from '@/http/regions/get-regions'

interface RegionsTableProps {
  regions: IRegions
}

export async function RegionsTable({ regions }: RegionsTableProps) {
  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>Nome</Table.Cell>
            <Table.Cell>Ações</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {regions?.items.map((region) => (
            <Table.Row key={region.id}>
              <Table.Cell>{region.id}</Table.Cell>
              <Table.Cell>{region.name}</Table.Cell>
              <Table.Cell>
                <TableActions region={region} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
