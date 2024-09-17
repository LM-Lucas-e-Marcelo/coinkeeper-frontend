import { Table } from '@/components/table'

import { formatCurrency } from '@/utils/format-currency'

import { getExpenses } from '@/http/expenses/get-expenses'
import { ManagementExpenseModal } from '@/components/modals/expenses/management-expenses-modal'
import Link from 'next/link'

interface ExpensesTableProps {
  searchParams: {
    [key: string]: string
  }
}

export async function ExpensesTable({ searchParams }: ExpensesTableProps) {
  const { expenses } = await getExpenses(searchParams)

  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell sortBy="organization_expenses.name">Nome</Table.Cell>
            <Table.Cell>Débito</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {expenses?.items.map((expense) => (
            <Table.Row key={expense.id}>
              <Table.Cell>
                <Link href={`/expenses/${expense.id}`}>{expense.name}</Link>
              </Table.Cell>
              <Table.Cell>{formatCurrency(expense.totalDebt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <ManagementExpenseModal />
    </>
  )
}
