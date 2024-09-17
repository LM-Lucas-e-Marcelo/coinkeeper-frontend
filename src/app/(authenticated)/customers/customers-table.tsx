import { Table } from '@/components/table'

import { getCustomers } from '@/http/customers/get-customers'
import { formatCurrency } from '@/utils/format-currency'

import { ManagementCustomerModal } from '@/components/modals/customers/management-customer-modal'
import { getRegions } from '@/http/regions/get-regions'
import Link from 'next/link'

interface CustomersTableProps {
  searchParams: {
    [key: string]: string
  }
}

export async function CustomersTable({ searchParams }: CustomersTableProps) {
  const { customers } = await getCustomers(searchParams)
  const { regions } = await getRegions()

  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell sortBy="customers.name">Nome</Table.Cell>
            <Table.Cell>Débito</Table.Cell>
            <Table.Cell>Score</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {customers?.items.map((customer) => (
            <Table.Row key={customer.id}>
              <Table.Cell>
                <Link href={`/customers/${customer.id}`}>{customer.name}</Link>
              </Table.Cell>
              <Table.Cell>{formatCurrency(customer.totalDebt)}</Table.Cell>
              <Table.Cell>{customer.score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <ManagementCustomerModal regions={regions} />
    </>
  )
}
