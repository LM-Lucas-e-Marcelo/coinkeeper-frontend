import { tv } from 'tailwind-variants'
import { TransactionCard } from './transaction-card'
import { ExpenseDetailsPageProps } from './page'
import { getExpenseById } from '@/http/expenses/get-expense-by-id'
import { ManagementExpenseTransactionModal } from '@/components/modals/expenses/management-expense-transactions-modal'
import { ManagementExpenseModal } from '@/components/modals/expenses/management-expenses-modal'
import { DeleteExpenseTransactionModal } from '@/components/modals/expenses/delete-expense-transaction-modal'

const expenseTransactions = tv({
  slots: {
    container: 'w-full flex gap-4',
    section:
      'w-full flex flex-col gap-4 overflow-auto max-h-[80vh] px-4 relative',
    headerTitle: 'sticky top-0 bg-white w-full py-2',
  },
})

const { container, section, headerTitle } = expenseTransactions()

export async function ExpenseTransactions({ params }: ExpenseDetailsPageProps) {
  const { expenseById } = await getExpenseById({ expenseId: params.id })

  return (
    <div className={container()}>
      <section className={section()}>
        <strong className={headerTitle()}>{expenseById.name}</strong>
        {expenseById?.transactions?.map((transaction) => {
          return (
            <TransactionCard key={transaction.id} transaction={transaction} />
          )
        })}
      </section>

      <ManagementExpenseTransactionModal
        id={params.id}
        transactions={expenseById.transactions}
      />
      <DeleteExpenseTransactionModal />
      <ManagementExpenseModal expense={expenseById} />
    </div>
  )
}
