import { Table } from '@/components/table'
import { formatCurrency } from '@/utils/format-currency'
import Link from 'next/link'
import { IPendingExpenses } from '@/http/pending/get-pending-expenses'

interface PendingExpensesTableProps {
  pendingExpenses: IPendingExpenses
}

export async function PendingExpensesTable({
  pendingExpenses,
}: PendingExpensesTableProps) {
  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell sortBy="organization_expense.name">Name</Table.Cell>
            <Table.Cell sortBy="organization_expenses.total_debt">
              Débito total
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {pendingExpenses?.expenses.map((expense) => (
            <Table.Row key={expense.id}>
              <Table.Cell>
                <Link href={`/expenses/${expense.id}`}>{expense.name}</Link>
              </Table.Cell>
              <Table.Cell>{formatCurrency(expense.totalDebt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
