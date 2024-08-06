import { Table } from '@/components/table'

import { getCustomers } from '@/http/customers/get-customers'
import { formatCurrency } from '@/utils/format-currency'
import { TableActions } from './customers-table-actions'

import { CreateCustomerModal } from '@/components/modals/customers/create-customer-modal'

interface CustomersTableProps {
  searchParams: {
    per?: string
    content?: string
  }
}

export async function CustomersTable({ searchParams }: CustomersTableProps) {
  const { customers } = await getCustomers(searchParams)

  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Nome</Table.Cell>
            <Table.Cell>Débito</Table.Cell>
            <Table.Cell>Ações</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {customers?.items.map((customer) => (
            <Table.Row key={customer.id}>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell>{formatCurrency(customer.totalDebt)}</Table.Cell>
              <Table.Cell>
                <TableActions customerId={customer.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <CreateCustomerModal />
    </>
  )
}
