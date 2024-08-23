import { Table } from '@/components/table'
import { formatCurrency } from '@/utils/format-currency'
import { getPendingCustomers } from '@/http/pending/get-pending-customers'
import { FiArrowRight } from '@/assets/icons'
import Link from 'next/link'

interface PendingCustomersTableProps {
  searchParams: {
    [key: string]: string
  }
}

export async function PendingCustomersTable({
  searchParams,
}: PendingCustomersTableProps) {
  const { pendingCustomers } = await getPendingCustomers(searchParams)

  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell sortBy="customers.name">Name</Table.Cell>
            <Table.Cell sortBy="customers.total_debt">Débito total</Table.Cell>
            <Table.Cell>Ações</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {pendingCustomers?.items.customers.map((customer) => (
            <Table.Row key={customer.id}>
              <Table.Cell>{customer.id}</Table.Cell>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell>{formatCurrency(customer.totalDebt)}</Table.Cell>
              <Table.Cell>
                <Link
                  href={`/customers/${customer.id}`}
                  className="w-[50%] flex justify-center"
                >
                  <FiArrowRight size={20} className="text-primary" />
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
