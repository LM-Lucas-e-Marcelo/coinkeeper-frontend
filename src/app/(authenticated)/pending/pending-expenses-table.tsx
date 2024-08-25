import { Table } from '@/components/table'
import { formatCurrency } from '@/utils/format-currency'
import { FiArrowRight } from '@/assets/icons'
import Link from 'next/link'
import { getPendingExpenses } from '@/http/pending/get-pending-expenses'

interface PendingExpensesTableProps {
  searchParams: {
    [key: string]: string
  }
}

export async function PendingExpensesTable({
  searchParams,
}: PendingExpensesTableProps) {
  const { pendingExpenses } = await getPendingExpenses(searchParams)

  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell sortBy="organization_expense.name">Name</Table.Cell>
            <Table.Cell sortBy="organization_expenses.total_debt">
              Débito total
            </Table.Cell>
            <Table.Cell>Ações</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {pendingExpenses?.expenses.map((expense) => (
            <Table.Row key={expense.id}>
              <Table.Cell>{expense.name}</Table.Cell>
              <Table.Cell>{formatCurrency(expense.totalDebt)}</Table.Cell>
              <Table.Cell>
                <Link
                  href={`/expenses/${expense.id}`}
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
