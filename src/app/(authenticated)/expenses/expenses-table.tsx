import { Table } from '@/components/table'

import { formatCurrency } from '@/utils/format-currency'
import { TableActions } from './expenses-table-actions'

import { getExpenses } from '@/http/expenses/get-expenses'
import { ManagementExpenseModal } from '@/components/modals/expenses/management-expenses-modal'

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
            <Table.Cell>Ações</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {expenses?.items.map((expense) => (
            <Table.Row key={expense.id}>
              <Table.Cell>{expense.name}</Table.Cell>
              <Table.Cell>{formatCurrency(expense.totalDebt)}</Table.Cell>
              <Table.Cell>
                <TableActions expenseId={expense.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <ManagementExpenseModal />
    </>
  )
}
